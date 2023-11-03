import { Avatar } from 'antd';
import style from './style.less';

export default function CoverItem({ type, desc, src, ...props }) {

  return (
    <>
      {String(type) === 'img' ?
        <Avatar alt={desc} size={64} src={src} draggable={false}  {...props} className={style.roundBox} /> :
        <Avatar alt={desc} size={64}  {...props} className={style.roundBox}>{desc || "Text"}</Avatar>
      }
    </>
  )
}
