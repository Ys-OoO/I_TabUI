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
