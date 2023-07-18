const util = {};

/**
 * 保留小数
 * @param digital 截取的数字
 * @param pos 保留几位小数
 */
util.test_changeTwoDecimal = function(digital, pos) {
  if (digital === '' || digital === undefined) {
    console.warn('function:changeTwoDecimal->parameter error');
    return digital;
  }
  digital = digital.toString();
  var digitalArray = digital.split('.');
  if (digitalArray.length < 2 || pos === '' || pos === undefined) {
    return digital;
  } else {
    var decimal = '.';
    var i;
    for (i = 0; i < digitalArray[1].length; i++) {
      if (i === pos) {
        break;
      }
      decimal += digitalArray[1][i];
    }
    return digitalArray[0] + decimal;
  }
};
