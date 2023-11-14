import { FlexColumn } from '@/components/styleBox';
import { Avatar } from 'antd';
import style from './style.less';

export default function CoverItem({ coverInfo = {}, ...props }) {
  const { desc, src } = coverInfo;

  return (
    <>
      <FlexColumn style={{ alignItems: 'center', userSelect: 'none' }} {...props}>
        {
          String(coverInfo?.type) === 'img' ?
            <Avatar alt={desc} shape="square" size={48} src={src} draggable={false} className={style.roundBox} /> :
            <Avatar alt={desc} shape="square" size={48} className={style.roundBox}>{coverInfo?.text || "Text"}</Avatar>
        }
        <div className={style.desc}>{coverInfo?.name}</div>
      </FlexColumn>
    </>
  )
}
