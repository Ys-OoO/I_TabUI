import { FlexColumn } from '@/components/FlexBox';
import { Outlet } from '@umijs/max';

export default function BasicLayout() {
  return (
    <FlexColumn>
      <div>BasicLayout</div>
      <Outlet />
    </FlexColumn>
  );
}
