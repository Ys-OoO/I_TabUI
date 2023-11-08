import CoverItem from '@/components/CoverSelector/CoverItem/CoverItem';
import { db } from '@/utils/indexDBUtils/db';
import { useDispatch } from '@umijs/max';
import { Dropdown, notification } from 'antd';
import { useLiveQuery } from 'dexie-react-hooks';
import _ from 'lodash';
import style from './style.less';


export default function FavoritesFolder({ folder = {}, ...props }) {
  const dispatch = useDispatch();
  const addSite = (e) => {
    dispatch({ type: 'home/save', config: { editVisible: true } })
  }
  const favoritesItem = useLiveQuery(() => {
    return db.favoritesItem.where({ folderId: folder.id }).toArray()
  }, [])

  const editFolder = (e) => {
    notification.info({
      message: "当前功能未开发完毕😶‍🌫️"
    })
  }

  const items = [
    {
      label: <div onClick={addSite}>添加网址</div>,
      key: 'addSite'
    },
    {
      label: <div onClick={editFolder}>编辑收藏夹</div>,
      key: 'editFolder'
    },
  ];

  return (
    <>
      <Dropdown menu={{
        items,
      }}
        trigger={['contextMenu']}
        {...props}
      >
        <div className={style.folderBox}>
          {_.map(favoritesItem || [], (item, index) => {
            const src = item.cover.src;
            const text = item.cover.text;
            const type = item?.cover?.type;
            const coverInfo = { ...item, src, text, type }
            return <CoverItem key={index} coverInfo={coverInfo} onClick={() => {
              window.open(item.url);
            }} />
          })}
        </div>
      </Dropdown >
    </>
  )
}
