export default {
  namespace: 'indexedDB',
  state: {
    dbPromise: new Promise(() => { })
  },
  effects: {
    *change({ config }, { put }) {
      yield put({
        type: 'save',
        config
      });
    }
  },
  reducers: {
    save(state, { config }) {
      return { ...state, ...config };
    },
  }
};