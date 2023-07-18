class Util {
  of(obj, field) {
    if (obj == null) {
      return '';
    }

    return obj[field];
  }
  arrayToMap(arr) {
    if (arr == null) {
      return {};
    }
    const m = {};
    arr.from(item => {
      m[item] = true;
    });
    return m;
  }
  /**
   * 判断值是否为空，支持空数组判断
   * @param {String|Object|Array} obj 要判断是否为空的值
   * @param {Boolean} allowEmptyString true允许空字符串
   * @update 2021-09-28
   * @return {any}
   */
  isEmpty(obj, allowEmptyString) {
    return (
      obj === null ||
      obj === undefined ||
      (!allowEmptyString ? obj === '' : false) ||
      (this.isArrayType(obj) && obj.length === 0)
    );
  }
  /**
   * 保留小数
   * @param digital 截取的数字
   * @param pos 保留几位小数
   */
  changeTwoDecimal(digital, pos) {
    if (digital === '' || digital === undefined) {
      console.warn('function:changeTwoDecimal->parameter error');
      return digital;
    }
    digital = digital.toString();
    const digitalArray = digital.split('.');
    if (digitalArray.length < 2 || pos === '' || pos === undefined) {
      return digital;
    } else {
      let decimal = '.';
      let i;
      for (i = 0; i < digitalArray[1].length; i++) {
        if (i === pos) {
          break;
        }
        decimal += digitalArray[1][i];
      }
      return digitalArray[0] + decimal;
    }
  }
  // 获取API ip地址
  getAPIAddress() {
    if (process.env && 'process.env.API_BASE') {
      return 'process.env.API_BASE';
    }
    return `${location.protocol}//${location.host.split(':')[0]}:8008/api/v1`;
  }
  // 获取socket地址
  getSocketAddress() {
    if (process.env && 'process.env.WS_ENDPOINT') {
      return 'process.env.WS_ENDPOINT';
    }
    return `ws://${location.host.split(':')[0] + ':8006'}`;
  }
  // 深复制， TODO：优化
  deepClone(data) {
    if (!data) {
      return data;
    } else {
      return JSON.parse(JSON.stringify(data));
    }
  }

  /**
   * 判断是否是数组类型
   * @param o
   * @return {Boolean}
   */
  isArrayType(o) {
    return !!o && Object.prototype.toString.call(o) === '[object Array]';
  }

  /**
   * 判断是否是对象类型
   * @param o
   * @return {Boolean}
   */
  isObjectType(o) {
    return !!o && Object.prototype.toString.call(o) === '[object Object]';
  }

  /**
   * 过滤对象中的空值
   * @param obj
   * @param exceptEmptyString
   * @return {Object}
   */
  filterBlankKeysOfObject(obj: any, exceptEmptyString?: string) {
    const propNames = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < propNames.length; i++) {
      const propName = propNames[i];
      if (obj[propName] === null || obj[propName] === undefined || (!exceptEmptyString && obj[propName] === '')) {
        delete obj[propName];
      }
    }
    return obj;
  }
  /**
   * 数组求和
   * @param arr
   * @param initValue
   * @returns
   */
  sum(arr: number[] = [], initValue = 0) {
    return arr.reduce((prev, curr) => {
      return prev + curr;
    }, initValue);
  }
}

export default new Util();
