import { common } from '@/utils';
export * from './filter.common';

/**
 * 统计时间
 * @param time The time to count.
 * @returns
 */
export function countTime(time) {
  return common.countTime(time);
}

/**
 * format date
 * @param {String} timestamp
 * @param {String} formatStr
 */
export function formatTimestamp(timestamp, formatStr) {
  return common.formatTimestamp(timestamp, formatStr);
}

/**
 * Parse a time into a formatted date using the specified format pattern.
 * @param {String/Date} time The time to format.
 * @param {String} cFormat Any valid date format string. Defaults to: '{y}-{M}-{d} {h}:{m}:{s}'
 * @returns The formated date string
 */
export function parseTime(time, cFormat?: string) {
  return common.parseTime(time, cFormat);
}

/**
 * 数字固定位数
 * @param {Number} digital 数字
 * @param {Number} count 保留位数, 如果有count强制保留两位数，返回的是字符串，否则是number类型
 */
export function numberToFixed(digital: number, count?: number) {
  return common.numberToFixed(digital, count);
}
/**
 * 数字固定位数带有单位
 * @param {Number} digital 数字
 * @param {Number} count 保留位数, 如果有count强制保留两位数，返回的是字符串，否则是number类型
 * @param {String} unit 单位 可自定义
 */
export function numberToFixedWithSign(digital: number, count?: number, unit?: string) {
  return common.numberToFixedWithSign(digital, count, unit);
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 * @returns
 */
export function numberFormatter(num, digits) {
  return common.numberFormatter(num, digits);
}
/**
 * Html to text
 * @param val
 * @returns
 */
export function html2Text(val) {
  return common.html2Text(val);
}
/**
 * 对1000以上的数值使用逗号分隔
 * 1000 => "1,000"
 * 10000 => "10,000"
 * 100000 => "100,000"
 * @param {number} num
 * @returns
 */
export function toThousandslsFilter(num) {
  return common.toThousandslsFilter(num);
}
/**
 * 从对象中取值，当key为a.b.c格式时
 * @date 2021-09-17
 * @param {any} obj 要取值的对象
 * @param {string} path 取值路径，格式如a.b.c
 * @param {string} separate 分隔符
 * @return {any}
 */
export function parsePath(obj, path) {
  return common.parsePath(obj, path);
}
