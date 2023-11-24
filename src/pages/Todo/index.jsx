import IFloatButton from '@/components/IFloatButton';
import {
  DarkIcon,
  EmptyIcon,
  LightIcon,
  ShrinkOutlined,
  TodoListIcon,
} from '@/components/icons';
import {
  FlexAuto,
  FlexCenter,
  FlexColumn,
  FlexColumnAuto,
  FlexRowAuto,
  MotionBox,
  Title,
} from '@/components/styleBox';
import { crop, toCanvas } from '@/utils/canvasUtils';
import { isBlank, setCssVar } from '@/utils/common';
import {
  DeleteTwoTone,
  FullscreenOutlined,
  PlusSquareTwoTone,
} from '@ant-design/icons';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Tooltip, message } from 'antd';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddTodoDrawer from './AddTodoDrawer';
import TodoItem from './TodoItem';
import style from './style.less';

const getTitleStyle = (key) => {
  if (key === 'todo') {
    return { marginLeft: 0, color: 'var(--card-color)' };
  }
  if (key === 'doing') {
    return { color: '#1677ff' };
  }
  if (key === 'done') {
    return { color: '#52c41a' };
  }
};

const reorder = (sourceList, source, destination) => {
  const result = Array.from(sourceList);
  const { index: sourceOrder } = source;
  const { index: destOrder } = destination;
  //先把自己从todoList摘出来
  const [removed] = result.splice(sourceOrder, 1);
  //插入到destOrder
  result.splice(destOrder, 0, removed);
  return result;
};

const move = (listGroup, source, destination) => {
  //获取被移动元素所在List
  const sourceTodoList = listGroup[source.droppableId];
  const [removed] = sourceTodoList.splice(source.index, 1);

  //获取目标区域
  const destTodoList = listGroup[destination.droppableId];
  removed.status = destination.droppableId;
  destTodoList.splice(destination.index, 0, removed);

  return [sourceTodoList, destTodoList];
};

export default function Todo() {
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [expanded, setExpanded] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [theme, setTheme] = useState('light');
  const parentRef = useRef();
  const targetRef = useRef();
  const { todoGroup } = useSelector((state) => state.todo);

  const groupTemp = {
    todo: [...(todoGroup['todo'] || [])],
    doing: [...(todoGroup['doing'] || [])],
    done: [...(todoGroup['done'] || [])],
  };

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
    if (expanded && windowWidth <= 1400) {
      setExpanded(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (fullScreen) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [fullScreen]);

  const deleteDone = (e) => {
    dispatch({
      type: 'todo/saveLocalTodos',
      config: { todoGroup: { done: [] } },
    });
  };

  const handleSwitch = (event, theme) => {
    const todoCanvas = toCanvas(targetRef.current);
    todoCanvas.then((canvas) => {
      parentRef.current.appendChild(canvas);
      setTimeout(() => {
        crop(canvas, event, { reverse: theme === 'dark' }).then(() => {
          parentRef.current.removeChild(canvas);
        });
        //换肤
        setCssVar('--card-bgc', theme === 'light' ? '#333' : '#fff');
        setCssVar('--card-color', theme === 'light' ? '#fff' : '#333');
      }, 0);
    });
  };

  const toggleTheme = (e) => {
    //截屏换肤
    handleSwitch(e, theme);
    setTheme(() => (theme === 'light' ? 'dark' : 'light'));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const { droppableId: sId } = source;
    const { droppableId: dId } = destination;
    //拖拽source 和 destination 同源
    if (!isBlank(sId) && !isBlank(dId) && sId === dId) {
      const newTodoList = reorder(groupTemp[sId], source, destination);
      dispatch({
        type: 'todo/saveLocalTodos',
        config: { todoGroup: { [sId]: newTodoList } },
      });
    }
    //拖拽source 和 destination 非同源
    if (!isBlank(sId) && !isBlank(dId) && sId !== dId) {
      const [sourceList, destList] = move(groupTemp, source, destination);
      dispatch({
        type: 'todo/saveLocalTodos',
        config: { todoGroup: { [sId]: sourceList, [dId]: destList } },
      });
    }
  };

  return (
    <MotionBox
      className={fullScreen ? style.fullScreenBox : style.todoBox}
      ref={parentRef}
    >
      {expanded ? (
        <MotionBox
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          key="expandedTodoList"
          className={style.card}
          style={fullScreen ? { height: '100%' } : {}}
          ref={targetRef}
        >
          <div className={style.cardHeader}>
            <FlexRowAuto className={style.left}>
              <FlexCenter>
                <TodoListIcon style={{ marginRight: 12 }} />
                <span>Todo List</span>
                <FlexAuto />
              </FlexCenter>
            </FlexRowAuto>
            <div className={style.right}>
              <Button
                icon={theme === 'light' ? <LightIcon /> : <DarkIcon />}
                style={{ marginLeft: 12, backgroundColor: 'var(--card-bgc)' }}
                className={style.themeBtn}
                onClick={toggleTheme}
              ></Button>
              <Button
                icon={<FullscreenOutlined />}
                style={{
                  border: 0,
                  marginLeft: 12,
                  backgroundColor: 'var(--card-bgc)',
                  color: 'var(--card-color)',
                }}
                onClick={() => {
                  setFullScreen(!fullScreen);
                }}
              />
              <Button
                icon={<ShrinkOutlined />}
                style={{
                  border: 0,
                  marginLeft: 12,
                  backgroundColor: 'var(--card-bgc)',
                  color: 'var(--card-color)',
                }}
                onClick={() => {
                  setExpanded(false);
                }}
              />
            </div>
          </div>
          <FlexColumnAuto
            className={fullScreen ? style.cardBodyFull : style.cardBody}
          >
            <FlexRowAuto>
              <DragDropContext onDragEnd={onDragEnd}>
                {_.map(groupTemp, (value, key) => {
                  return (
                    <FlexColumn
                      key={key}
                      style={
                        fullScreen
                          ? { maxHeight: window.innerHeight - 80 }
                          : { maxHeight: 700 }
                      }
                      className={
                        fullScreen ? style.singleListFull : style.singleList
                      }
                    >
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
                            {value.length ? (
                              _.map(value, (item, index) => {
                                return (
                                  <Draggable
                                    draggableId={item.id}
                                    index={index}
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
          </FlexColumnAuto>
          <FlexRowAuto className={style.footer}>
            <PlusSquareTwoTone
              key="add"
              onClick={() => {
                dispatch({ type: 'todo/save', config: { visible: true } });
                dispatch({ type: 'todo/refresh' });
              }}
              style={{ flex: 1, justifyContent: 'center' }}
              className={style.todoAction}
            />
            <Tooltip key="deleteDone" title="清空已完成">
              <DeleteTwoTone
                onClick={deleteDone}
                style={{ flex: 1, justifyContent: 'center' }}
                className={style.todoAction}
              />
            </Tooltip>
          </FlexRowAuto>
          <AddTodoDrawer />
        </MotionBox>
      ) : (
        <IFloatButton
          onClick={() => {
            if (windowWidth <= 1400) {
              message.info('浏览器视窗过小，请调整');
              return;
            }
            setExpanded(true);
          }}
          icon={<TodoListIcon />}
          style={{ top: 16, right: 24 }}
        />
      )}
    </MotionBox>
  );
}
