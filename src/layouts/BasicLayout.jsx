import { Flex, FlexColumn } from '@/components/FlexBox';
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
    </FlexColumn>
  );
}
