export default class Comparator {
  /**
   * 比较两个数组是否相等
   * @date 2021-12-02
   * @param Array<any> a
   * @param Array<any> b
   * @return boolean
   */
  static compareArray(a: Array<any>, b: Array<any>): boolean {
    if (a.length !== b.length) {
      return false;
    }
    const length = a.length;
    for (let i = 0; i < length; i++) {
      if (!Comparator.compare(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  /**
   * 比较两个对象是否相等
   * @date 2021-12-02
   * @param {Object} a
   * @param {Object} b
   * @return boolean
   */
  static compareObject(a: any, b: any): boolean {
    const keya = Object.keys(a);
    const keyb = Object.keys(b);

    if (keya.length !== keyb.length) {
      return false;
    }

    return keya.every(key => {
      if (!Comparator.compare(a[key], b[key])) {
        return false;
      }
      return true;
    });
  }

  /**
   * 比较是否相等
   * @date 2021-12-02
   * @param any a
   * @param any b
   * @return boolean 相等返回true，否则返回false
   */
  static compare(a: any, b: any): boolean {
    if (a === b) {
      return true;
    }

    if (typeof a !== typeof b || a === null || b === null) {
      return false;
    }

    if (Array.isArray(a)) {
      if (!Array.isArray(b)) {
        return false;
      }
      return Comparator.compareArray(a, b);
    }

    if (typeof a === 'object') {
      return Comparator.compareObject(a, b);
    }

    return false;
  }
}
