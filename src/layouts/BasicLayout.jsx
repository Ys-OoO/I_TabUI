import IBackground from '@/components/IBackground';
import { Flex, FlexColumn } from '@/components/styleBox';
import { db } from '@/utils/indexDBUtils/db';
import { Outlet, useDispatch, useSelector } from '@umijs/max';
import { useEffect } from 'react';
import BasicNavigator from './BasicNavigator';

export default function BasicLayout() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    return () => {
      db.close();
    };
  }, []);

  return (
    <FlexColumn>
      <Flex>
        <Outlet />
      </Flex>
      <BasicNavigator />
      <IBackground />
    </FlexColumn>
  );
}
