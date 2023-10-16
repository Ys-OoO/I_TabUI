import { DeleteTwoTone } from '@ant-design/icons';
import { List } from 'antd';
import dayjs from 'dayjs';

export default function TodoItem({ todo, innerRef, ...props }) {
  return (
    // TODO rewrite
    <List.Item ref={innerRef} {...props}>
      <List.Item.Meta
        title={todo.content}
        description={<>{dayjs(todo.time).format('MM-DD HH:mm')}</>}
      />
      <DeleteTwoTone key="delete" />
    </List.Item>
  );
}
