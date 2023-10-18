import Clock from '@/components/Clock';
import { FlexColumnAuto, FlexColumnCenter } from '@/components/FlexBox';
import { useDispatch } from '@umijs/max';
import { useEffect } from 'react';
import TodoList from '../Todo/TodoList';
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
    <FlexColumnAuto style={{ marginTop: 24 }}>
      <FlexColumnCenter style={{ height: 'calc(100vh)' }}>
        <Clock />
        <SearchInput className={style.searchContainer} />
      </FlexColumnCenter>
      <div className={style.todoBox}>
        <TodoList />
      </div>
    </FlexColumnAuto>
  );
};

export default Home;
