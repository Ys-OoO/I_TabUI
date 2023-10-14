import { FlexAuto, FlexCenter, FlexRowAuto } from '@/components/FlexBox';
import IFloatButton from '@/components/IFloatButton';
import { ShrinkOutlined, TodoListIcon } from '@/components/icons';
import { Button, Card } from 'antd';
import { useState } from 'react';

export default function Todo() {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      {expanded ? <Card
        title={
          <FlexRowAuto>
            <FlexCenter>
              <TodoListIcon style={{ marginRight: 12 }} />
              <span style={{}}>Todo List</span>
              <FlexAuto />
              <Button
                icon={<ShrinkOutlined />}
                style={{ border: 0, marginLeft: 12 }}
                onClick={() => { setExpanded(false) }}
              ></Button>
            </FlexCenter>
          </FlexRowAuto>
        }
      >
        <FlexRowAuto>

        </FlexRowAuto>
      </Card> : <IFloatButton onClick={() => { setExpanded(true) }} icon={<TodoListIcon />} style={{ top: 16, right: 24 }} />}
    </>
  );
}
