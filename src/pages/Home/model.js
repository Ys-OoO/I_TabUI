export default {
  namespace: 'home',
  state: {
    //对应添加收藏网站Item 对应的Modal
    editVisible: false,
    currentItem: null
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