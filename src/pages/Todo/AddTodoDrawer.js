import { TodoListIcon } from '@/components/icons';
import { isBlank } from '@/utils/common';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Drawer, Input } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './style.less';

export default function AddTodoDrawer() {
  const dispatch = useDispatch();
  const { visible, order, todoList } = useSelector((state) => state.todo);
  const [content, setContent] = useState("");

  const closeDrawer = (e) => {
    dispatch({ type: 'todo/save', config: { visible: false } });
  }

  const addTodo = (e) => {
    if (isBlank(String(content.trim()))) {
      console.log('1');
      return;
    }
    console.log(String(content), isBlank(content));

    const todo = {
      id: uuidv4(),
      content: content.trim(),
      status: 'todo',
      time: dayjs(),
      order: order,
    };

    dispatch({
      type: 'todo/saveLocalOrder',
      config: { order: order + 1 },
    });
    dispatch({
      type: 'todo/saveLocalTodoList',
      config: { todoList: [...todoList, todo] },
    });
    setContent("");
    closeDrawer(e);
  };

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
      footer={<Button onClick={addTodo}>确定</Button>}
    >
      <Input
        size="large"
        placeholder="输入添加的Todo项内容"
        prefix={<TodoListIcon />}
        value={content}
        onChange={(e) => { setContent(e.target.value) }}
        onKeyDown={onKeyDown}
      />
    </Drawer>
  )
}
