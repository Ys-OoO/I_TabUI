import { getStorage, setStorage } from '../../utils/localStorageUtils';


export default {
  namespace: 'todo',
  state: {
    todoList: [],
    order: 0,
    visible: false
  },
  effects: {
    *change({ config }, { put }) {
      yield put({
        type: 'save',
        config
      });
    },
    *refresh({ config }, { put }) {
      const todoList = getStorage('todolist', 'array');
      const order = getStorage('order', 'number');
      yield put({
        type: 'save',
        config: { todoList, order }
      })
    },
    *saveLocalTodoList({ config }, { put }) {
      const { todoList } = config;
      setStorage('todolist', todoList, 'array');
      yield put({
        type: 'save',
        config: { todoList }
      })
    },
    *saveLocalOrder({ config }, { put }) {
      const { order } = config;
      setStorage('order', order);
      yield put({
        type: 'save',
        config: { order }
      })
    }
  },
  reducers: {
    save(state, { config }) {
      return { ...state, ...config };
    },
  }
};