/*eslint-disable */

Date.prototype.Format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
};

function _isExisted(originStr, str) {
  if (str === undefined) {
    return false;
  }
  return originStr.indexOf(str) !== -1;
}

String.prototype.contains = function(str) {
  return _isExisted(this, str);
};

/**
 * 替换字符串中的字符
 * @param {String} replaceStr 要替换的字符串
 * @param {String} replacedStr 替换后的字符串
 * @return {String}
 */
String.prototype.replaceAll = function(replaceStr, replacedStr) {
  return this.replace(new RegExp(replaceStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replacedStr); // eslint-disable-line
};

// 只替换前后空格
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, '');
};

// 替换所有空格
String.prototype.trimAll = function() {
  return this.replace(/\s+/g, '');
};

Array.prototype.contains = function(str) {
  return _isExisted(this, str);
};
