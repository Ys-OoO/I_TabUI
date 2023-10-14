import Clock from '@/components/Clock';
import { FlexColumnAuto, FlexColumnCenter } from '@/components/FlexBox';
import SearchInput from './SearchInput/SearchInput';
import style from './style.less';

const Home = () => {
  return (
    <FlexColumnAuto style={{ marginTop: 24 }}>
      <FlexColumnCenter style={{ height: 'calc(100vh)' }}>
        <Clock />
        <SearchInput className={style.searchContainer} />
      </FlexColumnCenter>
    </FlexColumnAuto>
  );
};

export default Home;
