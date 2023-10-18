import { FlexAuto, FlexColumn, FlexRowAuto } from '@/components/FlexBox';
import { DeleteTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from '@umijs/max';
import dayjs from 'dayjs';
import _ from 'lodash';
import style from './style.less';

export default function TodoItem({ todo, innerRef, ...props }) {
  const dispatch = useDispatch();
  const { content = '-', time = dayjs().format('MM月DD日 HH:mm') } = todo;
  const { todoList } = useSelector((state) => state.todo);

  const deleteTodo = () => {
    const newTodoList = _.filter(todoList, (t) => {
      if (t.id === todo.id) {
        return false;
      }
      return true;
    });
    dispatch({
      type: 'todo/saveLocalTodoList',
      config: { todoList: newTodoList },
    });
  };
  return (
    <FlexRowAuto ref={innerRef} {...props} className={style.todoItem}>
      <FlexColumn style={{ width: '70%' }} className={style.todoLeft}>
        <div className={style.content}>{content}</div>
        <FlexAuto />
        <div className={style.time}>{dayjs(time).format('MM月DD日 HH:mm')}</div>
      </FlexColumn>
      <div className={style.actions} onClick={deleteTodo}>
        <DeleteTwoTone key="delete" />
      </div>
    </FlexRowAuto>
  );
}
