import {
  DoingIcon,
  DoneIcon,
  DoneStampIcon,
  TodoIcon,
} from '@/components/icons';
import { FlexAuto, FlexColumn, FlexRowAuto } from '@/components/styleBox';
import { DeleteTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from '@umijs/max';
import { Input, message } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useState } from 'react';
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
  const { content = '-', time = dayjs().format('MM月DD日 HH:mm'), id } = todo;
  const { todoList } = useSelector((state) => state.todo);
  const [editor, setEditor] = useState(false);
  const [inputContent, setInputContent] = useState(content);

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
  const handleEditor = () => {
    setEditor(true);
  };
  const handleChange = (e) => {
    setInputContent(e.target.value);
  };
  const finishEditor = () => {
    if (inputContent) {
      setEditor(false);
      let newTodoList = JSON.parse(JSON.stringify(todoList));
      let time = new Date();
      let newTodoList_copy = newTodoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            content: inputContent,
            time,
          };
        } else
          return {
            ...todo,
          };
      });
      dispatch({
        type: 'todo/saveLocalTodoList',
        config: { todoList: newTodoList_copy },
      });
    } else {
      message.error('任务不能为空！');
    }
  };

  return (
    <FlexRowAuto ref={innerRef} {...props} className={style.todoItem}>
      <FlexColumn style={{ width: '70%' }} className={style.todoLeft}>
        <br />
        <div
          className={style.content}
          onMouseDown={handleEditor}
          style={{ cursor: 'pointer' }}
        >
          {editor === true && todo.status !== 'done' ? (
            <Input
              autoFocus
              value={inputContent}
              onPressEnter={finishEditor}
              onChange={handleChange}
              bordered={false}
              className={style.editorInput}
              allowClear
              placeholder="回车完成修改"
            />
          ) : (
            content
          )}
        </div>
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
