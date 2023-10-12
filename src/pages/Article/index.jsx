import {Card ,Select,Layout} from 'antd';
import { useState } from 'react';
import styles from './styles.less';
import ArticleList from './ArticleList';
import { useParams } from "@umijs/max";
import { Outlet} from '@umijs/max';
import { history } from 'umi';
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,

} from '@ant-design/icons';
import { Button, Menu,Modal } from 'antd';
import AddArticle from './AddArticle/index';
const {Sider, Content } = Layout;
const getItem=(label, key, icon, children, type)=> {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const Article=()=> {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const items = [
    getItem('前端', '1', <PieChartOutlined />),
    getItem('后端', '2', <DesktopOutlined />),
    getItem('最近打开', '3', <ContainerOutlined />),
  ];
  const changeToList=(e)=>{
     const {key} = e.key;
     //发请求
  };
  // const toAddArticle=()=>{
  //     console.log(history.action)
  //     history.push('/home/addArticle');
  // };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Card className={styles.headerCard}>
        <div className={styles.headerBox}>
        <p style={{marginBottom:'0px',padding:'10px',minWidth:'50px'}}>OntoWeb文章</p>
        <Select placeholder='搜索文章' style={{marginTop:'5px',minWidth:'500px',paddingLeft:'92px'}}></Select>
        </div>
      </Card>
      <Layout style={styles.content}>
           <Sider
             style={{
             width: 200,
            }}
            >
           <Card className={styles.headerCard}><Button className={styles.noteButton} onClick={showModal}>新建文章</Button></Card>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['最近打开']}
            mode="inline"
            theme="light"
            items={items}
            onClick={(e)=>changeToList(e)}
          />
           </Sider>
           <Content> 
             <ArticleList></ArticleList>
            </Content>
      </Layout>
       <AddArticle open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       </AddArticle>
    </div>
    
  )
}
export default Article;