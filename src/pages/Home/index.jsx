import Clock from '@/components/Clock';
import { FlexColumnAuto, FlexColumnCenter } from '@/components/FlexBox';
import { useDispatch } from '@umijs/max';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import TodoList from '../Todo/TodoList';
import SearchInput from './SearchInput/SearchInput';
import style from './style.less';
import Module from '@/pages/Module';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'todo/refresh',
    });
  }, []);

  return (
    <FlexColumnAuto style={{ marginTop: 24, overflow: 'hidden' }}>
      <FlexColumnCenter style={{ height: 'calc(100vh)' }}>
        <Clock />
        <SearchInput className={style.searchContainer} />
      </FlexColumnCenter>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className={style.todoBox}
      >
        <TodoList />
      </motion.div>
      <Module/>
    </FlexColumnAuto>
  );
};

export default Home;
