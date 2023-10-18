import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { Button, Image, Space } from 'antd';
import { useState } from 'react';
import style from './style.less';
const DisplayCard = ({ article }) => {
  const { articleId } = article;
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={style.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ margin: '0px', marginRight: '0px' }}
    >
      <div className={style.cardTop}></div>
      <div className={style.imgContainer}>
        <Image
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          width={70}
          style={{ borderRadius: '15px' }}
        />
      </div>
      <span className={style.articleTitle}>{article.articleTitle}</span>
      <p className={style.describe}>{article.articleDescription}</p>
      {isHovered && (
        <Space className={style.buttonContainer} size="middle">
          <Link to={`/addArticle/articleId=${articleId}`}>
            <Button shape="circle" icon={<EditFilled />} />
          </Link>
          <Button
            shape="circle"
            icon={<DeleteFilled />}
            danger
            type="primary"
            onClick={() => alert('删除按钮被点击')}
          ></Button>
        </Space>
      )}
    </div>
  );
};
export default DisplayCard;
