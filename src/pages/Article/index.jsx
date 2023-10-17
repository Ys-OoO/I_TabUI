import {Card ,Input,Layout,Button, Form,Select,Menu,Row,Col} from 'antd';
import styles from './styles.less';
import ArticleList from './ArticleList';
import React, { useState,useEffect } from "react";
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
  DatabaseFilled,
  ContainerFilled
} from '@ant-design/icons';
import { Link } from '@umijs/max';
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
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [articleList,setArticleList] = useState(null);
  const items = [
    getItem('前端', '1', <PieChartOutlined />),
    getItem('后端', '2', <DesktopOutlined />),
    getItem('最近打开', '3', <ContainerOutlined />),
  ];
  const changeToList=(e)=>{
     const {key} = e;
     //发请求
     const data =[
      {
        articleId:1,
        articleTypeL:'前端',
        articleTitle:'js箭头函数介绍',
        articleDescription:'箭头函数this指向问题',

      },
      {
        articleId:2,
        articleTypeL:'前端',
        articleTitle:'js箭头函数介绍',
        articleDescription:'箭头函数this指向问题',
        
      },
      {
        articleId:3,
        articleTypeL:'前端',
        articleTitle:'js箭头函数介绍',
        articleDescription:'箭头函数this指向问题',
        
      },
      {
        articleId:4,
        articleType:'前端',
        articleTitle:'js箭头函数介绍',
        articleDescription:'箭头函数this指向问题',
      },
      {
        articleId:5,
        articleType:'前端',
        articleTitle:'js箭头函数介绍',
        articleDescription:'箭头函数this指向问题',
      },
     ];
     setArticleList(data);
  };
  const onFinish = (values) => {
    console.log('Finish:', values);
  };
  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);
  return (
    <div className={styles.mainBox}>
        <Card className={styles.headerBox}>
          <Row>
              <p style={{marginBottom:'0px',fontSize:'20px'}}>OntoWeb文章</p>
            <Col xs={{ span: 1, offset: 0 }} lg={{ span: 4, offset: 1 }}>
            <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} style={{minWidth:'600px'}}>
                  <Form.Item
                    name="articleType"
                    rules={[
                      {
                        required: true,
                        message: '请选择文章类别！',
                      },
                    ]}
                  >
                    <Select 
                      placeholder="文章类别" 
                      allowClear
                      style={{minWidth:'120px'}}
                      // suffixIcon={<DatabaseFilled className="site-form-item-icon" />}
                    >
                      <Select.Option value="type1">前端</Select.Option>
                      <Select.Option value="type2">后端</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: '请输入文章标题!',
                      },
                    ]}
                  >
                    <Input
                      prefix={<ContainerFilled className="site-form-item-icon" />}
                      type="text"
                      placeholder="文章标题"
                    />
                  </Form.Item>
                  <Form.Item shouldUpdate>
                    {() => (
                        <div>
                          <Button
                            type="text"
                            icon={< PieChartOutlined/>}
                            htmlType="submit"
                            style={{marginRight:'20px'}}
                            disabled={
                            !clientReady ||
                            !form.isFieldsTouched(true) ||
                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
                          }
                          >
                          搜索
                        </Button>
                        <Button
                          type="dashed"
                          htmlType="reset"
                          icon={< PieChartOutlined/>}
                        >
                          重置
                        </Button>
                        </div>
                    )}
                  </Form.Item>
                  </Form>
            </Col>
               
          </Row>
          
         </Card>
      <Layout style={{height:'80%',width:'100%'}}>
           <Sider
             style={{
             width: 200,
             backgroundColor:'white',
            }}
            >
           <Card className={styles.headerCard}>
             <Button className={styles.noteButton}>
             <Link to={`/addArticle/articleId=${null}`} target='_blank'>新建文章</Link>
             </Button>
           </Card>
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
             <ArticleList articleList={articleList}></ArticleList>
            </Content>
      </Layout>
    </div>
    
  )
}
export default Article;