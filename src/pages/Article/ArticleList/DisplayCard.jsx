import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Link, useDispatch } from '@umijs/max';
import { Button, Drawer, Image, Popconfirm, Space, message } from 'antd';
import MarkdownIt from 'markdown-it';
import { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import style from './style.less';
const DisplayCard = ({ article }) => {
  const { articleId } = article;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const deleteArticle = () => {
    //发请求
    dispatch({
      type: 'article/deleteArticle',
      config: { articleId: articleId },
    });
  };
  const confirm = () => {
    message.success('删除成功');
    deleteArticle();
  };
  const cancel = () => {
    message.error('取消成功');
  };
  const getArticleMsg = () => {
    //根据id发请求获得文章数据
    const articleMsg = {
      articleId,
      articleType: '后端',
      articleMdContent: '# react',
      articleDescribe: '前后台',
    };
    dispatch({
      type: 'article/refreshArticle',
      config: { article: articleMsg },
    });
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        className={style.card}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ margin: '0px', marginRight: '0px' }}
        onClick={showDrawer}
      >
        <div className={style.cardTop}></div>
        <div
          style={{ textAlign: 'center', paddingTop: '10px', cursor: 'pointer' }}
        >
          <Image
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            width={80}
            height={70}
            style={{ borderRadius: '15px' }}
          />
        </div>
        <span className={style.articleTitle}>{article.articleTitle}</span>
        <p className={style.describe}>{article.articleDescription}</p>
        {isHovered && (
          <Space className={style.buttonContainer} size="middle">
            <Link to={`/addArticle/type=1`}>
              <Button
                shape="circle"
                icon={<EditFilled />}
                onClick={getArticleMsg}
              />
            </Link>
            <Popconfirm
              title="删除文章"
              description="确定要删除这篇文章么?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                shape="circle"
                icon={<DeleteFilled />}
                danger
                type="primary"
              ></Button>
            </Popconfirm>
          </Space>
        )}
      </div>
      <Drawer
        title={article.articleTitle}
        placement="right"
        onClose={onClose}
        open={open}
        width={530}
      >
        <MdEditor
          value=""
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          view={{ menu: false, html: true, md: false }}
        />
      </Drawer>
    </div>
  );
};
export default DisplayCard;
