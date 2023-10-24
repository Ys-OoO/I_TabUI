import { isBlank } from '@/utils/common';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FlexColumnCenter } from '../styleBox';
import style from './style.less';

export default function Clock({ ...props }) {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isBlank(time) && !dayjs().isSame(time)) {
        setTime(dayjs())
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <FlexColumnCenter className={style.clockBox} {...props}>
      <div className={style.clock}>{time.format("HH:mm")}</div>
      <div className={style.date}>{time.format("YYYY-MM-DD")}</div>
    </FlexColumnCenter>
  )
}
