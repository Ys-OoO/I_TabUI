import { history } from "@umijs/max";
import _ from 'lodash';

/** 
* @description null undefine '' [] {} 都返回true
* @param  value
* @return {boolean} 
*/
export const isBlank = (value) => {
  if (typeof value === 'number') {
    return Number.isNaN(value);
  }
  return !value
}

/** 
* @description null undefine '' Nan都返回true
* @param  value
* @return {boolean} 
*/
export function isRelNull(value) {
  return value === null || value === undefined || String(value).trim() === '' || Number.isNaN(value);
}

/** 
* 使用umi提供的history以及lodash的debounce 防抖路由跳转，
* @param  path 跳转的路径
* @param  duration 防抖时间间隔
* @return {function} 防抖路由跳转函数 
*/
export const debouncePush = (path, duration) => {
  return _.debounce(() => {
    history.push(path);
  }, duration);
}

/**
 * @param {*} value 转换的字符串
 * @param {*} errorValue 转换异常时返回的数据
 */
export const JSONParse = (value, errorValue = {}, noConsole) => {
  if (errorValue === false) {
    return errorValue;
  }
  if (typeof value !== 'string') return value || errorValue;
  if (isRelNull(value)) return errorValue;
  let jsonData = errorValue;
  try {
    jsonData = JSON.parse(value);
  } catch (e) {
    if (!noConsole) window.console.warn(`JSON 转换异常 请查看配置JSON格式[${value}]${e}`);
    jsonData = errorValue;
  }
  return jsonData;
};

/**
 * 为document(<html></html>)设置style变量
 * @param {*} cssVar 
 * @param {*} value 
 */
export const setCssVar = (cssVar, value) => {
  document.documentElement.style.setProperty(cssVar, value);
};