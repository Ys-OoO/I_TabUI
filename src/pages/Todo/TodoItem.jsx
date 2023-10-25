import {
  DoingIcon,
  DoneIcon,
  DoneStampIcon,
  TodoIcon,
} from '@/components/icons';
import { FlexAuto, FlexColumn, FlexRowAuto } from '@/components/styleBox';
import { DeleteTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from '@umijs/max';
import dayjs from 'dayjs';
import _ from 'lodash';
import style from './style.less';

const getIcon = (status) => {
  switch (status) {
    case 'todo':
      return <TodoIcon />;
    case 'doing':
      return <DoingIcon />;
    case 'done':
      return <DoneIcon />;
    default:
      return <></>;
  }
};

export default function TodoItem({ todo, innerRef, ...props }) {
  const dispatch = useDispatch();
  const { content = '-', time = dayjs().format('MM月DD日 HH:mm') } = todo;
  const { todoGroup } = useSelector((state) => state.todo);

  const deleteTodo = () => {
    const { status } = todo;
    const newTodoList = todoGroup[status];
    const index = _.findIndex(newTodoList, { id: todo.id });
    newTodoList.splice(index, 1);
    dispatch({
      type: 'todo/saveLocalTodos',
      config: { todoGroup: { [status]: newTodoList } },
    });
  };

  return (
    <FlexRowAuto ref={innerRef} {...props} className={style.todoItem}>
      <FlexColumn style={{ width: '70%' }} className={style.todoLeft}>
        <div className={style.content}>{content}</div>
        <FlexAuto />
        <div className={style.time}>{dayjs(time).format('MM月DD日 HH:mm')}</div>
      </FlexColumn>
      <div className={style.left}>
        <div className={style.status}>{getIcon(todo.status)}</div>
        <div className={style.actions}>
          <DeleteTwoTone key="delete" onClick={deleteTodo} />
        </div>
      </div>
      {todo.status === 'done' ? (
        <div className={style.doneStamp}>
          <DoneStampIcon />
        </div>
      ) : undefined}
    </FlexRowAuto>
  );
}
