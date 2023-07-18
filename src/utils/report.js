import _ from 'lodash';
import TCU from './testCaseForReport';
import i18n from '../i18n';

const Util = {};
const nameKey = '@name';
const valueKey = '@value';
const typeKey = '@type';
const lengthKey = '@length';
const indexKey = '@index';

// const labels = {
//   global: '全局变量',
//   params: '形参',
//   stubs: '桩函数',
//   malloc: '指针目标',
//   '%': '返回值'
// }

const labels = {
  global: i18n.t('testcase.global'),
  params: i18n.t('testcase.params'),
  stubs: i18n.t('testcase.stubs'),
  malloc: i18n.t('testcase.malloc'),
  '%': i18n.t('testcase.return_value')
};

function formatChildren(context, target, tc, path, category, serial) {
  const params = path === '' ? tc : _.get(tc, path);
  if (!params) {
    return serial;
  }

  let counter = serial;

  if (path === 'stubs') {
    if (!params) {
      return serial;
    }
    _.each(params, (value, key) => {
      /* prettier-ignore */
      const param = { index: counter++, category: category, name: key, _value: value, _path: 'stubCall.' + key, stubCall: true };
      Util.formatParam(context, target, param, {});
    });
    return counter;
  }

  if (_.isObject(params)) {
    // global._name = '全局变量'
    _.each(params, (value, key) => {
      key !== valueKey && Util.formatParam(
        context,
        target,
        {
          index: counter++,
          category: category,
          // type: value ? value[typeKey] : '',
          name: key,
          _path: path + '.' + key,
          _value: value
        },
        {}
      );
    });
    return counter;
  }
  console.error('params is not object', params);
  return counter;
}

Util.formatParam = function(context, target, param, parent) {
  if (!param) {
    return;
  }
  const value = param._value;
  if (!value) {
    return;
  }
  param._name = param.name;
  param.name = (parent._name === '' || !parent._name) ? param._name : parent._name + '.' + param._name;
  param.type = value[typeKey];
  const separator = param.isArrItem ? '' : '.';
  param.path = parent.path ? parent.path + separator + param._name : param._name;
  param.tags = _.cloneDeep(parent.tags);

  let length = value[lengthKey];
  const realValue = value[valueKey];
  let cachedParam;
  if (!context[param._path]) {
    context[param._path] = param;
    cachedParam = param;
  } else {
    cachedParam = context[param._path];
    if (!cachedParam.values) {
      cachedParam.values = [realValue];
    } else {
      cachedParam.values.push(realValue);
    }
    cachedParam._value = '[' + _.join(cachedParam.values, ',') + ']';
  }

  // param._type = value[typeKey]
  // param._value = value[valueKey]

  //数组
  if (length && length > 0) {
    target.push(cachedParam);
    // if(!realValue){
    //   return
    // }
    if (!realValue) {
      return;
    }
    length = realValue.length;
    for (let i = 0; i < length; i++) {
      const arrItem = realValue[i];
      if (!arrItem) {
        continue;
      }
      const index = arrItem[indexKey] || i;
      const name = '[' + index + ']';
      Util.formatParam(
        context,
        target,
        {
          isArrItem: true,
          name: name,
          _path: param._path + '.' + name,
          _value: realValue[i]
        },
        cachedParam
      );
    }
    return;
  }

  if (cachedParam.stubCall) {
    //todo process return value
    target.push(cachedParam);
    _.each(value, stubCall => {
      if (stubCall.params) {
        _.each(stubCall.params, stubCallParam => {
          const name = stubCallParam[nameKey];
          Util.formatParam(
            context,
            target,
            {
              name: name,
              _path: param._path + '.' + name,
              _value: stubCallParam
            },
            cachedParam
          );
        });
      }
    });
    return;
  }

  if (_.isObject(realValue)) {
    target.push(cachedParam);
    //数组指针
    if (realValue[lengthKey]) {
      length = realValue[lengthKey];
      const arr = realValue[valueKey];
      for (let i = 0; i < length; i++) {
        const name = '[' + (i + 1) + ']';
        Util.formatParam(
          context,
          target,
          {
            name: name,
            _path: param._path + '.' + name,
            _value: arr[i]
          },
          cachedParam
        );
      }
      return;
    }
    _.each(realValue, (value, key) => {
      Util.formatParam(
        context,
        target,
        {
          name: key,
          _path: param._path + '.' + key,
          _value: value
        },
        cachedParam
      );
    });
  } else {
    cachedParam.value = realValue;
    cachedParam.native = true;
    target.push(cachedParam);
  }
};

/**
 * @param report
 * @returns {*}
 */
Util.formatCaseParams = function(report) {
  if (!report.files) {
    return;
  }

  report.result = {
    success: 0,
    mismatch: 0,
    error: 0,
    notCompared: 0
  };
  _.each(report.files, file => {
    if (!file.funcs || file.funcs.length === 0) {
      return;
    }

    _.each(file.funcs, func => {
      if (!func.testCases || func.testCases.length === 0) {
        return;
      }

      func.executeResults = TCU.executeResults(func.testCases);
      //todo count by type
      _.each(func.executeResults.summary, (value, key) => {
        report.result[key] += func.executeResults.summary[key] || 0;
      });

      func.testCases = _.sortBy(func.testCases, 'id');
      _.each(func.testCases, ca => {
        ca._inputs = [];
        ca._outputs = [];

        const rvca = _.cloneDeep(ca);
        rvca.params.output = rvca.output;
        const context = {};
        const realValueContext = {};
        // if(ca.funcId === '1138388489197326336') {
        formatCase(context, ca);
        formatCase(realValueContext, rvca);
        // }

        _.each(realValueContext, (value, key) => {
          if (value.native) {
            if (!context[key]) {
              console.error('invalid output params, not fount in output', key);
              return;
            }
            const param = context[key];
            param.realValue = value.value;
          }
        });

        if (rvca.executeResult !== 'error') {
          _.each(ca._outputs, output => {
            if (!output.realValue) {
              output.realValue = output.value;
            }
          });
        }
      });
    });
  });
};

function formatCase(context, ca) {
  let serial = 1;
  if (!ca.params) {
    return;
  }
  // /* prettier-ignore */
  serial = formatChildren(
    context,
    ca._inputs,
    ca.params,
    'variables.global',
    i18n.t('testcase.global'),
    serial
  );
  /* prettier-ignore */
  serial = formatChildren(context, ca._inputs, ca.params, 'variables.params', i18n.t('testcase.params'), serial);
  // serial = formatChildren(context, ca._inputs, ca.params, 'variables.params', 'params', serial)
  /* prettier-ignore */
  serial = formatChildren(context, ca._inputs, ca.params, 'stubs', i18n.t('testcase.stubs'), serial);
  /* prettier-ignore */
  // if(ca.funcId === '1138388489197326336') {
  serial = formatChildren(context, ca._inputs, ca.params, 'malloc', i18n.t('testcase.malloc'), serial);
  // }
  // serial = formatChildren(context, ca._inputs, ca.params, 'malloc', '指针目标', serial)
  serial = 1;
  const retValue = _.get(ca.params, 'output.%');
  if (retValue) {
    Util.formatParam(
      context,
      ca._outputs,
      {
        index: serial++,
        category: i18n.t('testcase.return_value'),
        name: '%',
        _path: 'output.%',
        _value: retValue
      },
      {}
    );
  }
  /* prettier-ignore */
  // serial = formatChildren(context, tc.output, tc.params, 'output.%', '返回值', serial)
  /* prettier-ignore */
  serial = formatChildren(context, ca._outputs, ca.params, 'output.global', i18n.t('testcase.global'), serial);
  /* prettier-ignore */
  serial = formatChildren(context, ca._outputs, ca.params, 'output.params', i18n.t('testcase.params'), serial);
  /* prettier-ignore */
  formatChildren(context, ca._outputs, ca.params, 'output.malloc', i18n.t('testcase.malloc'), serial);
}

export default Util;
