import Clock from '@/components/Clock';
import { FlexColumnAuto, FlexColumnCenter } from '@/components/FlexBox';
import Todo from '../Todo';
import SearchInput from './SearchInput/SearchInput';
import style from './style.less';

const Home = () => {
  return (
    <FlexColumnAuto style={{ marginTop: 24 }}>
      <FlexColumnCenter style={{ height: 'calc(100vh)' }}>
        <Clock />
        <SearchInput className={style.searchContainer} />
      </FlexColumnCenter>
      <div className={style.todoBox}>
        <Todo />
      </div>
    </FlexColumnAuto>
  );
};

export default Home;
