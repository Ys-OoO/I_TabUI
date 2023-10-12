import MdEditor from 'for-editor';
import {Modal } from 'antd';
import React, { useState } from "react";
const AddArticle = ({open,onOk,onCancel})=>{
   // 工具栏菜单
   const toolbar = {
    h1: true, // h1
    h2: true, // h2
    h3: true, // h3
    h4: true, // h4
    img: true, // 图片
    link: true, // 链接
    code: true, // 代码块
    preview: true, // 预览
    expand: true, // 全屏
    /* v0.0.9 */
    undo: true, // 撤销
    redo: true, // 重做
    save: true, // 保存
    /* v0.2.3 */
    subfield: true, // 单双栏模式
  };
  // 保存Markdown文本内容
  const [mdContent, setMdContent] = useState('')

  // 上传图片
  function uploadImg (file) {
    console.log('file', file);
  };
  // 输入内容改变
  function handleEditorChange (value) {
    console.log('handleChange', value);
    setMdContent(value)
  }
  // 保存输入内容
  function handleEditorSave (value) {
    console.log('handleEditorSave', value);
  }
   return (
   
    <Modal open={open} onOk={onOk} onCancel={onCancel}>
      <MdEditor placeholder="请输入Markdown文本" height={600} lineNum={false}
      toolbar={toolbar} value={mdContent} onChange={handleEditorChange} onSave={handleEditorSave} addImg={uploadImg} />
    </Modal>
   );
}
export default AddArticle;