import { history } from "@umijs/max";

// null undefine '' [] {} 都返回true
export const isBlank = (value) => {
  if (typeof value === 'number') {
    return Number.isNaN(value);
  }
}

export const debouncePush = (path, duration) => {
  return _.debounce(() => {
    history.push(path);
  }, duration);
}