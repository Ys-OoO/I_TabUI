import Clock from '@/components/Clock';
import { FlexColumnAuto, FlexColumnCenter } from '@/components/styleBox';
import Module from '@/pages/Module';
import { useDispatch } from '@umijs/max';
import { useEffect } from 'react';
import TodoList from '../Todo';
import SearchInput from './SearchInput/SearchInput';
import style from './style.less';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'todo/refresh',
    });
  }, []);

  return (
    <>
      <FlexColumnAuto style={{ overflow: 'hidden' }}>
        <FlexColumnCenter style={{ height: 'calc(100vh)' }}>
          <Clock style={{ marginTop: 48 }} />
          <SearchInput className={style.searchContainer} />
        </FlexColumnCenter>
        <Module />
      </FlexColumnAuto>
      <TodoList />
    </>
  );
};

export default Home;
