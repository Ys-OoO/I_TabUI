
export default {
  namespace: 'home',
  state: {
    //对应添加收藏网站Item 对应的Modal
    editVisible: false,
    currentItem: null,
    //对应收藏夹管理抽屉
    folderManage: false,
  },
  effects: {
    *change({ config }, { put }) {
      yield put({
        type: 'save',
        config
      });
    },
  },
  reducers: {
    save(state, { config }) {
      return { ...state, ...config };
    },
  }
};