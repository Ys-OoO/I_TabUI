import { FlexColumn, FlexRow } from '@/components/FlexBox';
import { Outlet, useSelector } from '@umijs/max';
import BasicSideBar from './BasicSideBar';

export default function BasicLayout() {
  const userState = useSelector((state) => state.user);
  return (
    <FlexColumn>
      <FlexRow>
        <BasicSideBar />
        <Outlet />
      </FlexRow>
      {/* modules */}
    </FlexColumn>
  );
}
