import { getStorage } from '../../utils/localStorageUtils';


export default {
  namespace: 'todo',
  state: {
    todoList: [],
  },
  effects: {
    *change({ config }, { put }) {
      yield put({
        type: 'save',
        config
      });
    },
    *refreshLocalTodoList({ config }, { put }) {
      const todoList = getStorage('todolist', 'array')

      yield put({
        type: 'save',
        config: { todoList }
      })
    }
  },
  reducers: {
    save(state, { config }) {
      return { ...state, ...config };
    },
  }
};