import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import React, { useEffect, useState } from 'react';
import styles from '../styles.less';
import style from './style.less'
import {Button, Form, Input,Card,Tooltip} from 'antd';
import {
  SafetyCertificateFilled
} from '@ant-design/icons';
// 导入编辑器的样式，不导入会出现毫无样式情况
import 'react-markdown-editor-lite/lib/index.css';
import { useLocation} from '@umijs/max';
const AddArticle = ()=>{
      const location = useLocation();
      const parts = location.pathname.split('=');
      let  articleId =parts[parts.length - 1];
      const [form] = Form.useForm();
      const [formData,setFormData] =useState(null);

      // 数据保存
      const [mdContent, setMdContent] = useState("");
      // markdown-it 利用设置参数，具体查询markdown-it官网
      const mdParser = new MarkdownIt({
        html: true,
        linkify: false,
        typographer: true
          }).enable('image');
      // 检测markdown数据变化
      function handleEditorChange({html, text}) {
        setMdContent(text)
        console.log('handleEditorChange', html, text);
      };
      const onFinish = () => {
        const formList = form.getFieldsValue();
        const list ={...formList, mdContent};
        //发请求（分为编辑文章接口和新增文章接口）
      };
      return (
          <div className={styles.mainBox}>
             <Card>
             <div className={style.MdHeaderBox}>
                <span style={{fontSize:'25px',color:'black'}}>{articleId!=='null'?'编辑':'新建'}文章</span>
               
                <Tooltip title="保存文章">
                <Button icon={<SafetyCertificateFilled style={{ fontSize: '24px' }}/> } shape='circle' type='primary' size='large' onClick={onFinish}></Button>
                </Tooltip>
              </div>
               <Form
                  style={{
                    maxWidth: 600,
                  }}
                  onFinish={onFinish}
                  autoComplete="off"
                  disabled={articleId!=='null'?true:false}
                  form={form}
                >
                  <Form.Item
                    label="标题"
                    name="articleTitle"
                    rules={[
                      {
                        required: true,
                        message: '请输入文章标题',
                      },
                    ]}
                   
                  >
                    <Input/>
                  </Form.Item>
              
                  <Form.Item
                    label="&nbsp;&nbsp;描述"
                    name="articleDescription"
                  >
                    <Input.TextArea allowClear autoSize={{minRows:2}}/>
                  </Form.Item>
                 </Form>
                 <MdEditor
                    value={mdContent}
                    onChange={handleEditorChange}
                    renderHTML={text => mdParser.render(text)}
                    style={
                      {height: 400}
                    }
                    onImageUpload={
                      async (file) => {
                        const formData = new FormData()
                        formData.append('files', file)
                        // 自行图片上传功能，利用form文件表单
                        return await postUrl(formData).then(
                          (res => {
                            if (res.code === 200) {
                              return res.data
                            } else {
                              message.error("图片过大，请上传小于1mb的图片")
                            }
                          })
                        )
                      }
                    }
                   >
                </MdEditor>
             </Card>
            
          </div>
        )
}
export default AddArticle;