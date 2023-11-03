import IBackground from '@/components/IBackground';
import { Flex, FlexColumn } from '@/components/styleBox';
import { Outlet, useDispatch, useSelector } from '@umijs/max';
import { useEffect } from 'react';
import BasicNavigator from './BasicNavigator';
import Dexie from 'dexie';

export default function BasicLayout() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const db = new Dexie('itab');
    db.version(1).stores({
      favoritesFolder:'++id, typeName',
      favoritesItem:'++id, forderId, url, name , cover'
    });
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
