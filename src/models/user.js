export default {
  namespace: 'user',
  state: {
    currentUser: { name: 'guest' },
    userOptions: {},
  },
  effects: {
    *change({ payload }, { put }) {
      yield put({
        type: 'save',
        payload
      });
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  }
};