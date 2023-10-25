import { getStorage, setStorage } from '../../utils/localStorageUtils';


export default {
  namespace: 'todo',
  state: {
    todoGroup: { todo: [], doing: [], done: [] },
    visible: false
  },
  effects: {
    *change({ config }, { put }) {
      yield put({
        type: 'save',
        config
      });
    },
    *refresh(_, { put }) {
      const todoGroup = getStorage('todoGroup', 'object');
      yield put({
        type: 'save',
        config: { todoGroup }
      })
    },
    *saveLocalTodos({ config }, { put, select }) {
      const { todoGroup } = yield select((state) => state.todo);
      const { todoGroup: groupTemp } = config;
      setStorage('todoGroup', { ...todoGroup, ...groupTemp }, 'object');
      yield put({
        type: 'save',
        config: { todoGroup: { ...todoGroup, ...groupTemp } }
      })
    },
  },
  reducers: {
    save(state, { config }) {
      return { ...state, ...config };
    },
  }
};