import MyCard from './MyCard';
import {Card,Space,Spin} from 'antd';
import style from './style.less';
const ArticleList = ({articleList})=>{
  return (
    <div>
      {articleList?  <Card style={{height:'68vh',margin:'10px'}}>
       <div className={style.listBox}>
        <Space wrap={true}>
         {articleList&&articleList.map((article)=>{
              return(
                 <MyCard key={article.articleId} article={article} />
              )
         })}
        </Space>
       </div>
    </Card>:<Card style={{margin:'10px',height:'68vh',position:'relative'}}> 
              <Spin  tip="加载中..." size="large" style={{position:'relative',top:'100px'}}>&nbsp;
              </Spin>
            </Card>}
    </div>
   
      
  )
}
export default ArticleList;