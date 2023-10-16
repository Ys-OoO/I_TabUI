import {
  FlexAuto,
  FlexCenter,
  FlexColumn,
  FlexRowAuto,
  Title,
} from '@/components/FlexBox';
import IFloatButton from '@/components/IFloatButton';
import { ShrinkOutlined, TodoListIcon } from '@/components/icons';
import { isBlank } from '@/utils/common';
import { getStorage, setStorage } from '@/utils/localStorageUtils';
import { PlusSquareTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Card } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './TodoItem';
import style from './style.less';

const defaultListOrder = ['todo', 'doing', 'done'];

const getTitleStyle = (key) => {
  if (key === 'todo') {
    return { marginLeft: 0 };
  }
  if (key === 'doing') {
    return { color: '#1677ff' };
  }
  if (key === 'done') {
    return { color: '#52c41a' };
  }
};

export default function Todo() {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(true);
  const { todoList } = useSelector((state) => state.todo);
  let todoStatusMap = _.groupBy(todoList, 'status');
  let todoStatusGroup = {};
  if (!isBlank(todoStatusMap)) {
    defaultListOrder.forEach((key) => {
      if (todoStatusMap.hasOwnProperty(key)) {
        todoStatusGroup[key] = todoStatusMap[key];
      }
    });
  }

  const addTodo = (content) => {
    if (isBlank(content)) {
      return;
    }
    const todo = {
      id: uuidv4(),
      content,
      status: 'todo',
      time: dayjs(),
    };
    let todolist = getStorage('todolist', 'array');
    setStorage('todolist', [...todolist, todo], 'array');
  };

  const onDragEnd = (result) => {
    console.log(result);
  };
  return (
    <>
      {expanded ? (
        <Card
          title={
            <FlexRowAuto>
              <FlexCenter>
                <TodoListIcon style={{ marginRight: 12 }} />
                <span>Todo List</span>
                <FlexAuto />
              </FlexCenter>
            </FlexRowAuto>
          }
          extra={
            <Button
              icon={<ShrinkOutlined />}
              style={{ border: 0, marginLeft: 12 }}
              onClick={() => {
                setExpanded(false);
              }}
            ></Button>
          }
          hoverable={true}
          actions={[
            <PlusSquareTwoTone
              key="add"
              onClick={() => {
                addTodo('b');
                dispatch({ type: 'todo/refreshLocalTodoList' });
              }}
            />,
          ]}
          className={style.dragCard}
        >
          <FlexRowAuto>
            <DragDropContext onDragEnd={onDragEnd}>
              {_.map(todoStatusGroup, (item, key) => {
                return (
                  <FlexColumn key={key}>
                    <Title className={style.title} style={getTitleStyle(key)}>
                      {_.upperCase(key)}
                    </Title>
                    <Droppable droppableId={key} key={key}>
                      {(droppableProvided) => (
                        <div
                          ref={droppableProvided.innerRef}
                          {...droppableProvided.droppableProps}
                          className={style.dropBox}
                        >
                          {_.map(todoStatusGroup[key], (item, index) => {
                            return (
                              <Draggable
                                draggableId={item.id}
                                index={index}
                                key={index}
                              >
                                {(draggableProvided) => (
                                  <TodoItem
                                    todo={item}
                                    innerRef={draggableProvided.innerRef}
                                    {...draggableProvided.draggableProps}
                                    {...draggableProvided.dragHandleProps}
                                  />
                                )}
                              </Draggable>
                            );
                          })}
                          {droppableProvided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </FlexColumn>
                );
              })}
            </DragDropContext>
          </FlexRowAuto>
        </Card>
      ) : (
        <IFloatButton
          onClick={() => {
            setExpanded(true);
          }}
          icon={<TodoListIcon />}
          style={{ top: 16, right: 24 }}
        />
      )}
    </>
  );
}
