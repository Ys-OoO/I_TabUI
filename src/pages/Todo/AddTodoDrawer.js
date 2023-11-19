import { TodoListIcon } from '@/components/icons';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Drawer, Input } from 'antd';
import { message } from 'antd/lib';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './style.less';

export default function AddTodoDrawer() {
  const dispatch = useDispatch();
  const { visible, todoGroup } = useSelector((state) => state.todo);
  const [content, setContent] = useState("");
  const inputRef = useRef();

  const closeDrawer = (e) => {
    dispatch({ type: 'todo/save', config: { visible: false } });
  }

  const addTodo = _.debounce((e) => {
    if (content === '' || content.trim() === '') {
      message.warning("内容为空！")
      return;
    }

    const todo = {
      id: uuidv4(),
      content: content.trim(),
      status: 'todo',
      time: dayjs(),
    };
    dispatch({
      type: 'todo/saveLocalTodos',
      config: { todoGroup: { todo: [...todoGroup['todo'] || [], todo] } },
    });
    setContent("");
    closeDrawer(e);
  }, 300);

  const onKeyDown = (e) => {
    if (e.code === "Enter") {
      addTodo(content);
    }
  }
  return (
    <Drawer
      open={visible}
      onClose={closeDrawer}
      placement="right"
      getContainer={false}
      maskClassName={style.drawerMask}
      footer={<Button onClick={addTodo} style={{ backgroundColor: 'var(--card-bgc)', color: 'var(--card-color)' }}>确定</Button>}
      style={{ height: 190 }}
      destroyOnClose={true}
      autoFocus={true}
      afterOpenChange={() => {
        inputRef && inputRef?.current.focus();
      }}
      styles={{
        body: {
          backgroundColor: 'var(--card-bgc)',
        },
        header: {
          backgroundColor: 'var(--card-bgc)',
        },
        footer: {
          backgroundColor: 'var(--card-bgc)',
        }
      }}
    >
      <Input
        size="large"
        placeholder="输入添加的Todo项内容"
        prefix={<TodoListIcon />}
        value={content}
        onChange={(e) => { setContent(e.target.value) }}
        onKeyDown={onKeyDown}
        ref={inputRef}
      />
    </Drawer>
  )
}
