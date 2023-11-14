import CoverItem from '@/components/CoverSelector/CoverItem/CoverItem';
import DropDownTable from '@/components/DropDownTable';
import { db } from '@/utils/indexDBUtils/db';
import { useDispatch, useSelector } from '@umijs/max';
import { Drawer, Dropdown } from 'antd';
import { useLiveQuery } from 'dexie-react-hooks';
import _ from 'lodash';

export default function EditFavoriteFolderDrawer() {
  const disptach = useDispatch();
  const { folderManage } = useSelector((state) => state.home);
  const favoritesFolder = useLiveQuery(async () => {
    return await db.favoritesFolder.toArray();
  });
  const favoritesItem = useLiveQuery(async () => {
    return await db.favoritesItem.toArray();
  });
  const favoritesItemMap = _.groupBy(favoritesItem || [], 'folderId');

  const onClose = () => {
    disptach({ type: 'home/change', config: { folderManage: false } });
  };

  const deleteFunc = async (id) => {
    //找出所有folderId 为 id 的item 并删除
    await db.favoritesItem
      .where('folderId')
      .equals(id)
      .delete()
      .then((deleteCount) => {
        console.info('级联删除了' + deleteCount + '个收藏项');
        db.favoritesFolder.delete(id);
      });
  };

  const updateFunc = async (id, value) => {
    await db.favoritesFolder.update(id, { typeName: value });
  };

  const onClick = async (action, favorItem) => {
    const actionName = action.key;
    if (actionName === 'delete') {
      await db.favoritesItem.delete(favorItem.id);
    }

    if (actionName === 'modify') {
      const currentItem = {
        id: favorItem.id,
        url: favorItem.url,
        name: favorItem.name,
        typeName: favorItem.typeName,
        cover: favorItem.cover,
      };
      disptach({
        type: 'home/change',
        config: { editVisible: true, currentItem },
      });
    }
  };

  const dropdownMenu = [
    {
      label: '修改',
      key: 'modify',
    },
    {
      label: '删除',
      key: 'delete',
    },
  ];

  return (
    <Drawer
      open={folderManage}
      onClose={onClose}
      placement="left"
      size="large"
      styles={{
        body: {
          backgroundImage:
            'linear-gradient(180deg,#DEF3F8 0%, #2caaec 85%, #1b87e3 100%)',
        },
        header: {
          backgroundColor: '#dcf1f7',
        },
      }}
      zIndex={100}
    >
      {_.map(favoritesFolder || [], (folder, index) => {
        return (
          <DropDownTable
            title={folder?.typeName}
            index={folder.id}
            key={index}
            deleteFunc={deleteFunc}
            updateFunc={updateFunc}
          >
            {_.map(favoritesItemMap[folder.id] || [], (item, index) => {
              item.src = item.cover.src;
              item.type = item.cover.type;
              item.text = item.cover.text;
              return (
                <Dropdown
                  menu={{
                    items: dropdownMenu,
                    onClick: (action) => {
                      onClick(action, item);
                    },
                  }}
                  trigger={['contextMenu']}
                  key={index}
                >
                  <CoverItem coverInfo={item} />
                </Dropdown>
              );
            })}
          </DropDownTable>
        );
      })}
    </Drawer>
  );
}
