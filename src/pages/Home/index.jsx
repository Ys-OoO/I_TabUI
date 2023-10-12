import Clock from '@/components/Clock';
import { FlexColumnAuot, FlexColumnCenter } from '@/components/FlexBox';
import { Outlet } from '@umijs/max';
import SearchInput from './SearchInput/SearchInput';
import style from './style.less';

const Home = () => {
  return (
    <FlexColumnAuot style={{ marginTop: 24 }}>
      <FlexColumnCenter style={{ height: 'calc(100vh)' }}>
        <Clock />
        <SearchInput className={style.searchContainer} />
      </FlexColumnCenter>
      {/* TODO下拉 */}

      <Outlet />
    </FlexColumnAuot>
  );
};

export default Home;
