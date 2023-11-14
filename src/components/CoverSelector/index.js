import { Input } from 'antd';
import { useRef, useState } from 'react';
import { FlexRow } from '../styleBox';
import CoverItem from './CoverItem/CoverItem';
import style from './style.less';

const selectedStyle = {
  transform: "scale(1.3)"
}

const selectOption = [
  'img', 'text'
]
export default function CoverSelector({ value, onChange, defaultValue, ...props }) {
  const controlled = value !== undefined;
  const currentRef = useRef(controlled ? value : defaultValue);
  if (controlled) {
    currentRef.current = value;
  }
  const [_, update] = useState({})
  const forceUpdate = (v) => {
    currentRef.current = v;
    update({})
    onChange?.(v)
  }

  const handleSelect = (type) => {
    forceUpdate({ ...currentRef.current, type });
  }

  const handleChange = (e) => {
    const value = e.target.value;
    forceUpdate({ ...currentRef.current, text: value })
  }
  return (
    <div className={style.selectBox} {...props}>
      {currentRef.current?.type === 'text' ? <Input value={currentRef.current?.text} onChange={handleChange} /> : undefined}
      <FlexRow>
        {selectOption.map((type) => {
          const selected = currentRef.current?.type;
          const coverInfo = { ...currentRef.current, type }
          return <CoverItem
            key={type}
            coverInfo={coverInfo}
            style={selected === type ? selectedStyle : undefined}
            onClick={() => { handleSelect(type) }}
          />
        })}
      </FlexRow>
    </div>
  )
}
