import _ from 'lodash';
import i18n from '../i18n';

const Util = {};
const nameKey = '@name';
const valueKey = '@value';
const typeKey = '@type';
const lengthKey = '@length';
const indexKey = '@index';

const typeArray = 'array';
const typeNative = 'native';
const typeObject = 'object';
const typeStructure = 'structure';

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

/**
 * 单个节点合并
 * @param context
 * @param node
 * @param prefix
 * @param caseId
 * @returns {*}
 */
Util.mergeItem = function(context, node, prefix, caseId) {
  //set item path
  const path =
    prefix === '' || prefix == null ? node.name : prefix + '.' + node.name;

  let cachedNode = context.nodes[path];
  
  if (!cachedNode) {
    // if not cached in item map
    cachedNode = node;
    cachedNode.path = path;
    context.nodes[path] = cachedNode;
    const parent = context.nodes[prefix];
    if (parent) {
      //append into parent's children if has parent
      if (!parent.children) {
        parent.children = [];
      }
      if (cachedNode.index) {
        parent.children[cachedNode.index] = cachedNode;
      } else {
        parent.children.push(cachedNode);
      }
    }
    context.params[path] = node.value;
    if (prefix === '') {
      context.ca[node.name] = node.value;
    } else {
      const parentCaseItem = context.params[prefix];
      if (!parentCaseItem[valueKey]) {
        parentCaseItem[valueKey] = [];
      }
      if (parent._type === typeStructure) {
        parentCaseItem[node.name] = node.value;
      } else if (parent._type === typeObject) {
        parentCaseItem[valueKey][node.name] = node.value;
      } else if (parent._type === typeArray) {
        parentCaseItem[valueKey][node.index] = node.value;
      }
    }
  }

  if (!cachedNode.tags) {
    cachedNode.tags = {};
  }

  if (!context.params[path]) {
    context.params[path] = node.value;
  }
  const param = context.params[path];
  const parent = context.nodes[prefix];
  if (parent && parent.ofStub) {
    cachedNode.ofStub = true;
  }

  if (parent && parent.tags) {
    if (!cachedNode.tags) {
      cachedNode.tags = {};
    }
    _.each(parent.tags, (value, key) => {
      cachedNode.tags[key] = value;
    });
  }
  if (prefix === '') {
    cachedNode.tags[node.name] = true;
  }

  cachedNode.label = cachedNode.label || labels[cachedNode.name] || cachedNode.name;
  if (cachedNode[typeKey]) {
    cachedNode.retType = cachedNode[typeKey];
  } else if (cachedNode.value && cachedNode.value[typeKey]) {
    cachedNode.retType = cachedNode.value[typeKey];
  }

  if (node._type === typeNative) {
    mergeNativeItem(cachedNode, node, param, caseId);
    return;
  }

  if (!node.value) {
    console.warn('item has no value ', node);
    // mergeNativeItem(cachedNode, node, param, caseId)
    return node;
  }
  if (node.name === 'output') {
  }
  if (parent && parent.name === 'stubs') {
    //stub结构不同，单独处理，详细结构见接口文档
    cachedNode.tags.ofStub = true;
    if (!context.ca.repeats) {
      context.ca.repeats = {};
    }
    if (!context.ca.repeats[caseId]) {
      context.ca.repeats[caseId] = {};
    }
    context.ca.repeats[caseId][node.name] = node.value.length;
    //stub value is array
    _.each(node.value, function(stubCall) {
      let stubCallLabel = '';
      if (stubCall['%']) {
        // let ret = stubCall['%']
        // Util.mergeItem(context, ret, cachedNode.path, caseId)
        Util.mergeItem(
          context,
          {
            name: '%',
            value: stubCall['%'],
            label: 'return'
          },
          cachedNode.path,
          caseId
        );
        cachedNode.retType = stubCall['%'][typeKey] || '';
      }
      stubCallLabel = node.name + '()';
      if (stubCall['params']) {
        for (let i = 0; i < stubCall['params'].length; i++) {
          if (!i) {
            continue;
          }
          const stubParam = stubCall['params'][i];
          Util.mergeItem(
            context,
            { name: stubParam[nameKey], value: stubParam },
            cachedNode.path,
            caseId
          );
        }
      }
      cachedNode.label = stubCallLabel;
    });
    delete cachedNode.value;
    return cachedNode;
  }

  const val = node.value[valueKey];
  const type = node.value[typeKey];
  const length = node.value[lengthKey];

  //数组
  if (length) {
    cachedNode._type = typeArray;
    if (!cachedNode.children) {
      cachedNode.children = [];
    }
    if (val && !_.isArray(val)) {
      console.error(
        'param has @length field, but @value is not array',
        JSON.stringify(val)
      );
    }
    if (!val) {
      return;
    }
    for (let i = 0; i < val.length; i++) {
      let index = i;
      let childVal = val[i];
      if (childVal === undefined || childVal === null) {
        //comment this to show all array items
        continue;
      }
      if (childVal && childVal[indexKey]) {
        index = parseInt(childVal[indexKey]);
      }
      const child = {
        name: '[' + index + ']',
        index: index,
        label: cachedNode.name + '[' + index + ']'
      };

      if (!_.isObject(childVal) && !_.isArray(childVal)) {
        childVal = {};
        // childVal[typeKey] = 'unused'
        child._type = typeNative;
        child.wrapped = true;
        childVal[valueKey] = val[i];
      }
      childVal[indexKey] = '' + index;
      child.value = childVal;
      Util.mergeItem(context, child, cachedNode.path, caseId);
    }
    for (let i = 0; i < val.length; i++) {
      if (val[i] && i !== parseInt(val[i][indexKey])) {
        val[i] = null;
      }
    }
    return cachedNode;
  }

  //数组指针
  if (type) {
    //value is a param
    if (_.isPlainObject(val)) {
      //类型判断有待更新，控安或许会更新接口，用更明确的方式标识类型
      if (val[lengthKey]) {
        cachedNode._type = typeArray;
        const realVal = val[valueKey];
        if (realVal) {
          if (!_.isArray(realVal)) {
            console.error(
              'param has @length field, but @value is not array',
              JSON.stringify(realVal)
            );
          }
          for (let i = 0; i < realVal.length; i++) {
            let childVal = realVal[i];
            const child = {
              name: '[' + (i + 1) + ']',
              label: '[' + i + ']'
            };
            if (!_.isObject(childVal) && !_.isArray(childVal)) {
              childVal = {};
              // arrItem[typeKey] = 'unused'
              child._type = typeNative;
              child.wrapped = true;
              childVal[valueKey] = val[i];
            }
            child.value = childVal;
            // arrItem.name = '[' + i + ']'
            Util.mergeItem(context, child, cachedNode.path, caseId);
          }
        }
      } else {
        cachedNode._type = typeObject;
        _.forEach(val, function(childValue, childName) {
          const child = { name: childName, value: childValue };
          Util.mergeItem(context, child, cachedNode.path, caseId);
        });
      }
    } else {
      mergeNativeItem(cachedNode, node, param, caseId);
    }
  } else {
    if (node._type === typeNative) {
      mergeNativeItem(cachedNode, node, param, caseId);
    } else {
      cachedNode._type = typeStructure;
      _.forEach(node.value, function(childValue, childName) {
        Util.mergeItem(
          context,
          {
            name: childName,
            value: childValue
          },
          cachedNode.path,
          caseId
        );
      });
    }
  }
  delete cachedNode.value;
  return cachedNode;
};

function mergeNativeItem(cachedNode, node, param, caseId) {
  cachedNode._type = typeNative;
  cachedNode.native = true;
  param.native = true;
  if (node.wrapped) {
    param.wrapped = true;
  }
  if (!param.valueMap) {
    param.valueMap = {};
    param.readonlyValueMap = {};
  }
  cachedNode.valueMap = param.valueMap;
  cachedNode.readonlyValueMap = param.readonlyValueMap;
  let value;
  if (cachedNode.tags.ofStub) {
    if (!cachedNode.repeats) {
      cachedNode.repeats = {};
    }
    if (!cachedNode.repeats[caseId]) {
      cachedNode.repeats[caseId] = [];
    }
    cachedNode.repeats[caseId].push(node.value[valueKey]);
    if (cachedNode.repeats[caseId].length > 1) {
      value = '[' + _.join(cachedNode.repeats[caseId], ',') + ']';
    } else {
      value = _.join(cachedNode.repeats[caseId], ',');
    }

    // caseItem.repeats = targetItem.repeats.length
    param['merged'] = true;
  } else {
    if (node.value) {
      value = node.value[valueKey];
    } else {
      value = node.value;
    }
  }
  param.valueMap[caseId] = value;
  param.readonlyValueMap[caseId] = value;
}
/**
 * 合并test case，得出参数树
 * @param cases
 * @returns {{tree: *[], ca: (context.ca|{})}}
 */
Util.mergeCases = function(cases) {
  // 
  const context = {
    nodes: {}, //merged item, including values field, used when tree rendering
    ca: {}, //global merged ca, including values field, used for value binding when editing
    params: {}, //params
    repeats: {} //stub repeats
  };

  const execResults = {
    summary: {},
    details: {}
  };
  _.forEach(cases, function(ca) {
    // _.forOwn(ca.params, function(value, key) {
    //   Util.mergeItem(context, { name: key, value: value }, '', ca.id)
    // })
    mergeCase(context, ca);
    execResults.details[ca.id] = ca.executeResult;
  });

  const tree = [
    {
      label: i18n.t('testcase.input'),
      name: 'input',
      path: 'input',
      children: [
        context.nodes['variables.global'] || {
          name: 'global',
          path: 'input.global',
          label: labels.global
        },
        context.nodes['variables.params'] || {
          name: 'params',
          path: 'input.params',
          label: labels.params
        },
        context.nodes['stubs'] || {
          name: 'stubs',
          path: 'input.stubs',
          label: labels.stubs
        },
        context.nodes['malloc'] || {
          name: 'malloc',
          path: 'input.malloc',
          label: labels.malloc
        }
      ]
    },
    {
      label: i18n.t('testcase.output'),
      name: 'output',
      path: 'output',
      children: [
        context.nodes['output.%'] || {
          name: '%',
          path: 'output.%',
          label: labels['%']
        },
        context.nodes['output.global'] || {
          name: 'global',
          path: 'output.global',
          label: labels.global
        },
        context.nodes['output.malloc'] || {
          name: 'malloc',
          path: 'output.malloc',
          label: labels.malloc
        }
      ]
    },
    {
      label: i18n.t('testcase.test_value'),
      name: 're',
      path: 're',
      // valueMap:
      valueMap: execResults
    }
  ];

  //valueMap: execResults(context.params, cases)
  return { tree: tree, ca: context.ca };
};

function mergeCase(context, _case) {
  _.forOwn(_case.params, function(value, key) {
    Util.mergeItem(context, { name: key, value: value }, '', _case.id);
  });

  const outputContext = {
    nodes: {}, //merged item, including values field, used when tree rendering
    ca: {}, //global merged ca, including values field, used for value binding when editing
    params: {}, //params
    repeats: {} //stub repeats
  };

  _.forOwn({ output: _case.output || { params: {}}}, function(value, key) {
    Util.mergeItem(outputContext, { name: key, value: value }, '', _case.id);
  });

  if (outputContext.params) {
    _.each(outputContext.params, (param, path) => {
      if (param.native) {
        if (!context.nodes[path]) {
          console.error(
            'mismatch output param not found in case output param',
            path
          );
          return;
        }

        context.params[path].realValueMap = _.merge(context.params[path].realValueMap, param.valueMap);
        context.nodes[path].realValueMap = _.merge(context.nodes[path].realValueMap, param.valueMap);
      }
    });
  }
  if (_case.execResult && _case.execResult['type'] === 'error') {
    _case.executeResult = 'error';
    return;
  }
  if (
    !_case.execResult ||
    !_case.execResult['type'] ||
    _case.execResult['type'] === ''
  ) {
    _case.executeResult = 'notCompared';
    return;
  }
  _case.executeResult = 'success';
  const keys = _.keys(context.params);
  let hasOutput = false;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const param = context.params[key];
    if (param && param.valueMap && _.startsWith(key, 'output')) {
      hasOutput = true;
      const expectedValue = param.valueMap ? param.valueMap[_case.id] : '';
      const realValue =
        !param.realValueMap || !param.realValueMap[_case.id]
          ? param.readonlyValueMap[_case.id]
          : param.realValueMap[_case.id];
      if (!expectedValue) {
        _case.executeResult = 'notCompared';
        continue;
      }

      if (expectedValue !== realValue) {
        _case.executeResult = 'mismatch';
        return;
      }
    }
  }
  if (!hasOutput) {
    _case.executeResult = 'notCompared';
  }
}
Util.executeResults = function(cases) {
  const context = {
    nodes: {}, //merged item, including values field, used when tree rendering
    ca: {}, //global merged ca, including values field, used for value binding when editing
    params: {}, //params
    repeats: {} //stub repeats
  };
  _.each(cases, (_case) => {
    mergeCase(context, _case);
  });

  const execResults = {
    summary: {},
    details: {}
  };
  _.each(cases, function(_case) {
    execResults.details[_case.id] = _case.executeResult;
    if (!execResults.summary[_case.executeResult]) {
      execResults.summary[_case.executeResult] = 1;
    } else {
      execResults.summary[_case.executeResult] += 1;
    }
  });

  return execResults;
};

Util.extractCases = function(mergedCase, originalCases) {
  const cases = [];
  _.each(originalCases, ca => {
    const realCase = _.cloneDeep(mergedCase);
    delete realCase.repeats;
    cases.push({ id: ca.id, isNew: ca.isNew, params: realCase });
    _.each(realCase, (paramValue, paramName) => {
      extractValue(mergedCase.repeats, paramValue, paramName, ca.id);
    });
  });

  return cases;
};

function extractValue(repeats, paramValue, paramName, caseId, index) {
  if (paramName === 'stubs') {
    _.each(paramValue, (stubValueArr, stubName) => {
      const items = [];
      if (stubValueArr.length <= 0) {
        return;
      }
      if (repeats[caseId] === undefined) {
        return;
      }
      const repeat = repeats[caseId][stubName];
      const structure = stubValueArr[0];
      for (let i = 0; i < repeat; i++) {
        const subItem = _.cloneDeep(structure);
        extractValue(repeats, subItem, '', caseId, i);
        items.push(subItem);
      }
      paramValue[stubName] = items;
    });
  } else {
    if (paramValue.valueMap) {
      let value = paramValue.valueMap[caseId];
      const merged = paramValue.merged;
      if (merged) {
        value = _.trimEnd(_.trimStart(value, '['), ']');
        const values = _.split(value, ',');
        value = values[index];
      }
      paramValue[valueKey] = value;
      delete paramValue.valueMap;
      delete paramValue.readonlyValueMap;
      delete paramValue.native;
      delete paramValue.merged;
    } else {
      if (_.isArray(paramValue)) {
        extractArray(paramValue, repeats, caseId);
      } else if (paramValue[lengthKey] || _.isArray(paramValue[valueKey])) {
        extractArray(paramValue[valueKey], repeats, caseId);
      } else if (_.isPlainObject(paramValue)) {
        _.each(paramValue, (subItemValue, subItemName) => {
          extractValue(repeats, subItemValue, subItemName, caseId, index);
        });
      }
    }
  }
}

function extractArray(arr, repeats, caseId) {
  if (!arr) {
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      continue;
    }
    if (arr[i].wrapped) {
      arr[i] = arr[i].valueMap[caseId] || '';
    } else {
      extractValue(repeats, arr[i], '', caseId, i);
    }
  }
}

export default Util;
