import Clock from '@/components/Clock';
import {
  FlexCenter,
  FlexColumnAuto,
  FlexColumnCenter,
  MotionBox,
} from '@/components/styleBox';
import FavoritesFolder from '@/pages/Home/FavoritesFolder/FavoritesFolder';
import Module from '@/pages/Module';
import { db } from '@/utils/indexDBUtils/db';
import { CaretDownFilled } from '@ant-design/icons';
import { useDispatch } from '@umijs/max';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import TodoList from '../Todo';
import EditFavoriteItemModal from './EditFavoriteItemModal/EditFavoriteItemModal';
import SearchInput from './SearchInput/SearchInput';
import style from './style.less';

const Home = () => {
  const dispatch = useDispatch();
  const favoritesFolder = useLiveQuery(async () => {
    return await db['favoritesFolder'].toArray();
  });
  const [currentScrollY, setCurrentScrollY] = useState(0);

  useEffect(() => {
    dispatch({
      type: 'todo/refresh',
    });
  }, []);

  useEffect(() => {
    function getScrollY(e) {
      setCurrentScrollY(window.scrollY);
    }
    window.addEventListener('scroll', getScrollY);

    return () => {
      window.removeEventListener('scroll', getScrollY);
    };
  }, []);
  const scrollToBottom = () => {
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: window.innerHeight,
    });
  };

  if (!favoritesFolder) return null;

  return (
    <>
      <FlexColumnAuto style={{ overflow: 'hidden' }}>
        <FlexColumnCenter style={{ height: 'calc(100vh)' }}>
          <Clock style={{ marginTop: 48 }} />
          <SearchInput className={style.searchContainer} />
          <div className={style.folderBox}>
            {_.map(favoritesFolder || [], (folder, index) => {
              if (index === favoritesFolder.length - 1) {
                return (
                  <FavoritesFolder
                    key={index}
                    folder={folder}
                    isLast={true}
                  ></FavoritesFolder>
                );
              }
              return (
                <FavoritesFolder
                  key={index}
                  folder={folder}
                  isLast={false}
                ></FavoritesFolder>
              );
            })}
          </div>
          {currentScrollY > 300 ? undefined : (
            <FlexCenter className={style.homeFooter} onClick={scrollToBottom}>
              <MotionBox
                animate={{
                  y: -10,
                  transition: {
                    repeat: Infinity,
                    repeatType: 'mirror',
                    duration: 2,
                  },
                }}
              >
                <CaretDownFilled style={{ color: '#FFF', fontSize: '50px' }} />
              </MotionBox>
            </FlexCenter>
          )}
        </FlexColumnCenter>
        <Module />
        <EditFavoriteItemModal />
      </FlexColumnAuto>
      <TodoList />
    </>
  );
};

export default Home;
