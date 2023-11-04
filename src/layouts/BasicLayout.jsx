import IBackground from '@/components/IBackground';
import { Flex, FlexColumn } from '@/components/styleBox';
import { Outlet, useDispatch, useSelector } from '@umijs/max';
import { useEffect } from 'react';
import BasicNavigator from './BasicNavigator';
import {createDb,upsertFavoritesFolder,db} from '@/utils/indexDBUtils/favoritesUtils';

export default function BasicLayout() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    createDb();
    upsertFavoritesFolder({id:1,typeName:"常用"});
    upsertFavoritesFolder({id:2,typeName:"其他"});
    return ()=>{
      db.close();
    }
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
