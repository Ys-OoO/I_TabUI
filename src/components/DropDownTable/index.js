import { isBlank } from '@/utils/common';
import { DeleteTwoTone, EditTwoTone, RightCircleOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from 'react';
import { Flex, FlexAuto, FlexRow, MotionBox, Title } from '../styleBox';
import style from './style.less';

export default function DropDwonTable({ title = "-", index, deleteFunc, updateFunc, wrapper, ...props }) {
  const [expand, setExpand] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const onEdit = (e) => {
    e.stopPropagation();
    setIsEdit(true);
  }

  const onBlur = (e) => {
    const value = e.target.value;
    setIsEdit(false);
    if (isBlank(value.trim())) {
      return;
    }
    if (updateFunc) updateFunc(index, value);
  }

  const onDelete = (e) => {
    e.stopPropagation();
    if (deleteFunc) deleteFunc(index);
  }

  return (
    <div
      onMouseEnter={() => { setIsHover(true) }}
      onMouseLeave={() => { setIsHover(false) }}
      {...props}
    >
      <FlexRow className={style.header} onClick={() => { setExpand(!expand) }}>
        <MotionBox animate={{ rotate: expand ? 90 : 0 }}>
          <RightCircleOutlined />
        </MotionBox>
        <Title className={style.title}>
          {isEdit ? <Input autoFocus onBlur={onBlur} /> : title}
        </Title>
        <FlexAuto />
        {
          isHover ? <MotionBox animate={{ opacity: [0, 0.5, 1] }} className={style.actions}>
            <EditTwoTone twoToneColor="#333" onClick={onEdit} style={{ padding: 4 }} />
            <DeleteTwoTone twoToneColor="#333" onClick={onDelete} style={{ padding: 4 }} />
          </MotionBox> : undefined
        }
      </FlexRow>
      {
        expand ?
          <MotionBox animate={{ scale: [0.8, 1.1, 1], opacity: [0, 0.3, 1] }}>
            <Flex className={style.itemContainer}>
              {props.children || undefined}
            </Flex>
          </MotionBox> :
          undefined
      }
    </div>
  )
}
