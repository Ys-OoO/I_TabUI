import IBackground from '@/components/IBackground';
import { Flex, FlexColumn } from '@/components/styleBox';
import { Outlet, useSelector } from '@umijs/max';
import BasicNavigator from './BasicNavigator';

export default function BasicLayout() {
  const userState = useSelector((state) => state.user);
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
