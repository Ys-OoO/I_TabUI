import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { FlexRow } from '../styleBox';
import CoverItem from './CoverItem/CoverItem';
import style from './style.less';


const selectedStyle = {
  transform: "scale(1.3)"
}
export default function CoverSelector({ src, onChange, ...props }) {
  const controlled = 'value' in props;
  const [seletctType, setSelectType] = useState("img")
  const [text, setText] = useState(props?.value);

  useEffect(() => {
    if (onChange) {
      onChange({ type: 'img' })
    }
  }, [])

  const changeHandler = (e) => {
    setText(e.target.value)
    if (onChange) onChange({ type: "text", text: e.target.value });
  }

  const handleClick = (type) => {
    setSelectType(type);
    if (onChange) {
      if (type === "text") {
        onChange({ type, text });
      } else {
        onChange({ type, src })
      }
    }
  }

  return (
    <div className={style.selectBox} {...props}>
      {
        controlled && seletctType === "text" ? <Input placeholder='输入描述文字' value={text} onChange={changeHandler} style={{ marginBottom: 8 }} /> : undefined
      }
      <FlexRow>
        {
          ["img", "text"].map((type) => {
            const coverInfo = {
              type,
              desc: text,
              text: text,
              src
            }
            return <CoverItem
              key={type}
              coverInfo={coverInfo}
              onClick={() => {
                handleClick(type);
              }}
              style={seletctType === type ? selectedStyle : null}
            />
          })
        }
      </FlexRow>
    </div>
  )
}
