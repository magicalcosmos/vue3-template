import { Log } from '@/utils';
import i18n from '@/i18n';
/*eslint-enable */
export function formatTime(time, option) {
  Log.info(time, option);
  // if (option) {
  //   return '';
  // }
  // const d = +new Date(time);
  // const now = Date.now();
  // const diff = (now - d) / 1000;

  // if (diff < 30) {
  //   return i18n.global.t('time.just');
  // } else if (diff < 3600) {
  //   // less 1 hour
  //   return Math.ceil(diff / 60) + i18n.global.t('time.min_ago');
  // } else if (diff < 3600 * 24) {
  //   return Math.ceil(diff / 3600) + i18n.global.t('time.hour_ago');
  // } else if (diff < 3600 * 24 * 2) {
  //   return i18n.global.t('time.one_day_ago');
  // }
  // return d.Format('yyyy-MM-dd hh:mm');
}

const dict: {
  [key: string]: any;
} = {
  auditStatus: [] as Array<TKV>,
  auditStatus_sample: [] as Array<TKV>,
  userStatus: [] as Array<TKV>,
  map: {} as TObject,
};

dict.auditStatus = [
  { key: 0, value: i18n.global.t('status.testing') },
  { key: 1, value: i18n.global.t('status.testing') },
  { key: 2, value: i18n.global.t('status.pending_review') },
  { key: 3, value: i18n.global.t('status.rejected1') },
  { key: 4, value: i18n.global.t('status.completed') },
];
dict.auditStatus_sample = [
  { key: 0, value: '' },
  { key: 1, value: i18n.global.t('status.testing') },
  { key: 2, value: '' },
  { key: 3, value: '' },
  { key: 4, value: i18n.global.t('status.completed') },
];

dict.userStatus = [
  { key: 0, value: i18n.global.t('status.offline') },
  { key: 1, value: i18n.global.t('status.offline') },
  { key: 2, value: i18n.global.t('status.online') },
];

function map() {
  dict.map = {};
  Object.keys(dict).forEach(key => {
    const property = dict[key];

    if (property instanceof Array) {
      dict.map[key] = {};

      for (let i = 0; i < property.length; i++) {
        const item = property[i];
        dict.map[key][item.key] = item.value;
      }
    }
  });
}

map();

export function dictTranslate(value, dictType) {
  const dictMap = dict.map[dictType];
  if (dictMap) {
    if (dictMap[value]) {
      return dictMap[value];
    } else {
      return value;
    }
  }
  return value;
}

export function passed(testcases) {
  let i = 0;
  testcases.forEach(f => {
    if (f.execResult.type === 'success') {
      i++;
    }
  });
  return i;
}

export function unPassed(testcases) {
  let i = 0;
  testcases.forEach(f => {
    if (f.execResult.type === 'error') {
      i++;
    }
  });
  return i;
}

export function iate(str) {
  return (Math.round(str * 10000) / 100).toFixed(2) + '%';
}

export function versioinStatus(project) {
  let status = '';
  if (project.versions === undefined) {
    return i18n.global.t('status.to_be_distributed');
  }

  project.versions.forEach(version => {
    if (project.latestVersionId === version.id) {
      if (version.assignee.length > 0) {
        status = i18n.global.t('status.testing');
      } else {
        status = i18n.global.t('status.to_be_distributed');
      }
    }
  });
  if (project.auditStatus === 4) {
    status = i18n.global.t('status.completed');
  }
  return status;
}

export function except() {
  // let i = 0
  // for (let f in testcases) {
  //   if (!f.pass) {
  //     i++
  //   }
  // }
  return 0;
}

//返回值不包含预期值，预期值已经写在页面上
export function outputComparator(param, ca) {
  const expectedValue = param.valueMap ? param.valueMap[ca.id] || '' : '';
  const realValue =
    !param.realValueMap || !param.realValueMap[ca.id] ? param.readonlyValueMap[ca.id] : param.realValueMap[ca.id];
  // let realValue = param.realValueMap ? param.realValueMap[ca.id] || '' : ''

  if (!ca.execResult || ca.execResult.type !== 'success') {
    return '';
  }

  if (expectedValue === '') {
    return '';
  } else {
    if (expectedValue === realValue) {
      return ' == ' + realValue;
    } else if (realValue) {
      return ' != ' + realValue;
    }
  }
}

/**
 * string to int
 * @param {String} str
 */
export function parseStringToInt(str) {
  return parseInt(str);
}
