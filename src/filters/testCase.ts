import i18n from '@/i18n';
const $t = i18n.global.t;
/*eslint-enable */
type TStatus = {
  key: number;
  value: string;
};
const dict = {
  auditStatus: [] as Array<TStatus>,
  auditStatus_sample: [] as Array<TStatus>,
  userStatus: [] as Array<TStatus>,
  map: {},
};
dict.auditStatus = [
  { key: 0, value: $t('status.testing') },
  { key: 1, value: $t('status.testing') },
  { key: 2, value: $t('status.pending_review') },
  { key: 3, value: $t('status.rejected1') },
  { key: 4, value: $t('status.completed') },
];
dict.auditStatus_sample = [
  { key: 0, value: '' },
  { key: 1, value: $t('status.testing') },
  { key: 2, value: '' },
  { key: 3, value: '' },
  { key: 4, value: $t('status.completed') },
];

dict.userStatus = [
  { key: 0, value: $t('status.offline') },
  { key: 1, value: $t('status.offline') },
  { key: 2, value: $t('status.online') },
];

const map = () => {
  dict.map = {};
  Object.keys(dict).forEach(function (key, index) {
    const property = dict[key];

    if (property instanceof Array) {
      dict.map[key] = {};

      for (let i = 0; i < property.length; i++) {
        const item = property[i];
        dict.map[key][item.key] = item.value;
      }
    }
  });
};

map();

/**
 * 字典翻译
 * @param value
 * @param dictType
 * @returns
 */
export const dictTranslate = (value: string, dictType: string): string => {
  const dictMap = dict.map[dictType];
  if (dictMap) {
    if (dictMap[value]) {
      return dictMap[value];
    } else {
      return value;
    }
  }
  return value;
};
/**
 * 通过
 * @param testCases
 * @returns
 */
export const passed = (testCases: Array<any>): number => {
  let i = 0;
  testCases.forEach(f => {
    if (f.execResult.type === 'success') {
      i++;
    }
  });
  return i;
};
/**
 *
 * @param testCases
 * @returns
 */
export const unPassed = (testCases: Array<any>): number => {
  let i = 0;
  testCases.forEach(f => {
    if (f.execResult.type === 'error') {
      i++;
    }
  });
  return i;
};
/**
 *
 * @param str
 * @returns
 */
export const iate = (str: number): string => {
  return (Math.round(str * 10000) / 100).toFixed(2) + '%';
};

/**
 *
 * @param project
 * @returns
 */
export const versionStatus = (project): string => {
  let status = '';
  if (project.versions === undefined) {
    return $t('status.to_be_distributed');
  }

  project.versions.forEach(version => {
    if (project.latestVersionId === version.id) {
      if (version.assignee.length > 0) {
        status = $t('status.testing');
      } else {
        status = $t('status.to_be_distributed');
      }
    }
  });
  if (project.auditStatus === 4) {
    status = $t('status.completed');
  }
  return status;
};

export const except = (testCases: Array<any>): number => {
  // let i = 0
  // for (let f in testcases) {
  //   if (!f.pass) {
  //     i++
  //   }
  // }
  return 0;
};

/**
 * 返回值不包含预期值，预期值已经写在页面上
 * @param param
 * @param ca
 * @returns
 */
export const outputComparator = (param, ca): string => {
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
};

/**
 * string to int
 * @param {String} str
 */
export const parseStringToInt = (str: string): number => {
  return parseInt(str);
};
