import Clock from '@/components/Clock';
import { FlexColumnAuto, FlexColumnCenter } from '@/components/styleBox';
import FavoritesFolder from '@/pages/Home/FavoritesFolder/FavoritesFolder';
import { db } from '@/utils/indexDBUtils/db';
import { useDispatch } from '@umijs/max';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useRef } from 'react';
import TodoList from '../Todo';
import EditFavoriteFolderDrawer from './EditFavoriteFolderDrawer/EditFavoriteFolderDrawer';
import EditFavoriteItemModal from './EditFavoriteItemModal/EditFavoriteItemModal';
import SearchInput from './SearchInput/SearchInput';
import style from './style.less';

const Home = () => {
  const dispatch = useDispatch();
  const favoritesFolder = useLiveQuery(async () => {
    return await db['favoritesFolder'].toArray();
  });
  const singleFloderRef = useRef();
  const folderBoxRef = useRef();

  useEffect(() => {
    dispatch({
      type: 'todo/refresh',
    });
  }, []);

  const scrollToNextFolder = (index) => {
    const height = singleFloderRef.current.currentFolderHeight();
    folderBoxRef.current.scrollTop = (index + 1) * height;
  };
  if (!favoritesFolder) return null;

  return (
    <>
      <FlexColumnAuto style={{ overflow: 'hidden' }}>
        <FlexColumnCenter style={{ height: 'calc(100vh)' }}>
          <Clock style={{ marginTop: 48 }} />
          <SearchInput className={style.searchContainer} />
          <div className={style.folderBox} ref={folderBoxRef}>
            {_.map(favoritesFolder || [], (folder, index) => {
              return (
                <FavoritesFolder
                  key={index}
                  folder={folder}
                  ref={singleFloderRef}
                  index={index}
                  count={favoritesFolder.length}
                  onClickDownArrow={scrollToNextFolder}
                ></FavoritesFolder>
              );
            })}
          </div>
        </FlexColumnCenter>
        {/* 隐藏ModuleCard <Module /> */}
        <EditFavoriteItemModal />
        <EditFavoriteFolderDrawer />
      </FlexColumnAuto>
      <TodoList />
    </>
  );
};

export default Home;
