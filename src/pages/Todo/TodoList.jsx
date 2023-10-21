import {
  FlexAuto,
  FlexCenter,
  FlexColumn,
  FlexRowAuto,
  Title,
} from '@/components/FlexBox';
import IFloatButton from '@/components/IFloatButton';
import {
  DeleteDoneIcon,
  EmptyIcon,
  ShrinkOutlined,
  TodoListIcon,
} from '@/components/icons';
import { isBlank } from '@/utils/common';
import { FullscreenOutlined, PlusSquareTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Card, Tooltip, message } from 'antd';
import { motion } from 'framer-motion';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddTodoDrawer from './AddTodoDrawer';
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

const reorder = (todoList, source, destination, isSameDrop) => {
  const { index: sourceOrder } = source;
  const { index: destOrder } = destination;
  return _.forEach(todoList, (todo) => {
    if (todo.order === sourceOrder) {
      if (!isSameDrop) {
        todo.status = destination.droppableId;
      }
      todo.order = destOrder;
      return;
    }
    if (todo.order === destOrder) {
      todo.order = sourceOrder;
      return;
    }
  });
};

export default function Todo() {
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [expanded, setExpanded] = useState(true);
  const { todoList, order } = useSelector((state) => state.todo);

  const sortedTodoList = _.sortBy(todoList, (o) => o.order);
  let todoStatusMap = _.groupBy(sortedTodoList, 'status');
  let todoStatusGroup = { todo: [], doing: [], done: [] };
  if (!isBlank(todoStatusMap)) {
    defaultListOrder.forEach((key) => {
      if (todoStatusMap.hasOwnProperty(key)) {
        todoStatusGroup[key] = todoStatusMap[key];
      }
    });
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (expanded && windowWidth <= 1080) {
      setExpanded(false);
    }
  }, [windowWidth]);

  const deleteDone = (e) => {
    const filterTodos = _.filter(todoList, (todo) => {
      return todo.status !== 'done';
    });
    dispatch({
      type: 'todo/saveLocalTodoList',
      config: { todoList: filterTodos },
    });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const { droppableId: sId } = source;
    const { droppableId: dId } = destination;
    let newTodoList = [];
    //拖拽source 和 destination 同源
    if (!isBlank(sId) && !isBlank(dId) && sId === dId) {
      newTodoList = reorder(todoList, source, destination, true);
    }
    //拖拽source 和 destination 非同源
    if (!isBlank(sId) && !isBlank(dId) && sId !== dId) {
      newTodoList = reorder(todoList, source, destination, false);
    }
    dispatch({
      type: 'todo/saveLocalTodoList',
      config: { todoList: newTodoList },
    });
  };

  return (
    <>
      {expanded ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          key="expandedTodoList"
        >
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
              <>
                <Button
                  icon={<FullscreenOutlined />}
                  style={{ border: 0, marginLeft: 12 }}
                  onClick={() => {
                    //TODO
                  }}
                ></Button>
                <Button
                  icon={<ShrinkOutlined />}
                  style={{ border: 0, marginLeft: 12 }}
                  onClick={() => {
                    setExpanded(false);
                  }}
                ></Button>
              </>
            }
            hoverable={true}
            actions={[
              <PlusSquareTwoTone
                key="add"
                onClick={() => {
                  dispatch({ type: 'todo/save', config: { visible: true } });
                  dispatch({ type: 'todo/refresh' });
                }}
              />,
              <Tooltip key="deleteDone" title="清空已完成">
                <DeleteDoneIcon onClick={deleteDone} />
              </Tooltip>,
            ]}
            bodyStyle={{ display: 'flex' }}
          >
            <FlexRowAuto>
              <DragDropContext onDragEnd={onDragEnd}>
                {_.map(todoStatusGroup, (item, key) => {
                  return (
                    <FlexColumn key={key} style={{ flex: 1 }}>
                      <Title className={style.title} style={getTitleStyle(key)}>
                        {_.upperCase(key)}
                      </Title>
                      <Droppable droppableId={key} key={key}>
                        {(droppableProvided) => (
                          <div
                            ref={droppableProvided.innerRef}
                            {...droppableProvided.droppableProps}
                            className={style.list}
                          >
                            {todoStatusGroup[key].length ? (
                              _.map(todoStatusGroup[key], (item) => {
                                return (
                                  <Draggable
                                    draggableId={item.id}
                                    index={item.order}
                                    key={item.id}
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
                              })
                            ) : (
                              <div
                                style={{
                                  fontSize: 40,
                                  textAlign: 'center',
                                  paddingTop: 40,
                                }}
                              >
                                <EmptyIcon />
                              </div>
                            )}
                            {droppableProvided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </FlexColumn>
                  );
                })}
              </DragDropContext>
            </FlexRowAuto>
            <AddTodoDrawer />
          </Card>
        </motion.div>
      ) : (
        <motion.div
          key="unexpandedTodoList"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1 }}
        >
          <IFloatButton
            onClick={() => {
              if (windowWidth <= 1080) {
                message.info('浏览器视窗过小，请调整');
                return;
              }
              setExpanded(true);
            }}
            icon={<TodoListIcon />}
            style={{ top: 16, right: 24 }}
          />
        </motion.div>
      )}
    </>
  );
}
