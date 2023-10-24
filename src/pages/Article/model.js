export default {
   namespace: 'article',
   state: {
      articleList: [],
      article: {},
   },
   effects: {
      *refreshArticleList({ config }, { put }) {
         const { articleList } = config;
         yield put({
            type: 'save',
            config: { articleList },
         })
      },
      *refreshArticle({ config }, { put }) {
         const { article } = config;
         yield put({
            type: 'save',
            config: { article },
         })
      },
      *deleteArticle({ config }, { put, select }) {
         const { articleId } = config;
         const { articleList } = yield select((_) => _.article);
         const data = articleList.filter((article) => (article.articleId !== articleId))
         yield put({
            type: 'save',
            config: { articleList: data }
         })
      }
   },
   reducers: {
      save(state, { config }) {
         return { ...state, ...config };
      },
   }
}