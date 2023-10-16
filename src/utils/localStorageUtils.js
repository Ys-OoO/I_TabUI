import { JSONParse } from './common';
/**
 * 获取缓存
 * @param catchKey 缓存key
 * @param valueType 缓存值类型
 * @returns {string|number|boolean|object|array}
 */
export const getStorage = (catchKey, valueType) => {
  const value = localStorage.getItem(catchKey);
  if (['object', 'array'].indexOf(valueType) >= 0) {
    const ret = JSONParse(value, valueType === 'object' ? {} : []);
    return ret;
  }
  if (valueType === 'boolean') {
    return Boolean(value);
  }
  if (valueType === 'number') {
    return Number(value);
  }
  return value;
};

export const setStorage = (catchKey, value, valueType) => {
  switch (valueType) {
    case 'object':
    case 'array':
      localStorage.setItem(catchKey, JSON.stringify(value));
      break;
    default:
      localStorage.setItem(catchKey, String(value));
  }
};