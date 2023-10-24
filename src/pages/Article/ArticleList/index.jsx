import { Card, Space, Spin } from 'antd';
import DisplayCard from './DisplayCard';
const ArticleList = ({ articleList }) => {
  return (
    <div>
      {articleList.length > 0 ? (
        <Card style={{ margin: '10px' }}>
          <div>
            <Space wrap={true} style={{ paddingLeft: '17px' }}>
              {articleList &&
                articleList.map((article) => {
                  return (
                    <DisplayCard key={article.articleId} article={article} />
                  );
                })}
            </Space>
          </div>
        </Card>
      ) : (
        <Card style={{ margin: '10px', height: '68vh', position: 'relative' }}>
          <Spin
            tip="加载中..."
            size="large"
            style={{ position: 'absolute', top: '100px' }}
          >
            &nbsp;
          </Spin>
        </Card>
      )}
    </div>
  );
};
export default ArticleList;
