import IBackground from '@/components/IBackground';
import { Flex, FlexColumn } from '@/components/styleBox';
import { openDB } from '@/utils/indexDBUtils';
import { Outlet, useDispatch, useSelector } from '@umijs/max';
import { useEffect } from 'react';
import BasicNavigator from './BasicNavigator';

export default function BasicLayout() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const dbPromise = openDB('itab', 'favoritesFolder');
    dispatch({
      type: 'indexedDB/save',
      config: {
        dbPromise: dbPromise,
      },
    });
    return () => {
      dbPromise.then((db) => {
        closeDB(db);
      });
    };
  }, []);

  return (
    <FlexColumn>
      <Flex>
        <Outlet />
      </Flex>
      {/* modules */}
      <BasicNavigator />
      <IBackground />
    </FlexColumn>
  );
}
