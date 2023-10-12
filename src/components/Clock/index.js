import React, { useEffect, useState } from 'react'
import style from './style.less';
import dayjs from 'dayjs';
import { isBlank } from '@/utils/common';
import { FlexColumnCenter } from '../FlexBox';

export default function Clock() {
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
    <FlexColumnCenter className={style.clockBox}>
      <div className={style.clock}>{time.format("HH:mm")}</div>
      <div className={style.date}>{time.format("YYYY-MM-DD")}</div>
    </FlexColumnCenter>
  )
}
