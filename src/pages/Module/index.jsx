import React from 'react'
import  ModuleCard  from '@/pages/Module/ModuleCard/ModuleCard';
import style from './style.less';
import { FlexRow } from '@/components/FlexBox';




export default function Module() {
  return (
    <div className={style.moduleContainer}>
      <FlexRow style={{flexWrap:'wrap',justifyContent:'space-between',overflow:'hidden'}}>
        <ModuleCard></ModuleCard>
        {/* <ModuleCard></ModuleCard>
        <ModuleCard></ModuleCard>
        <ModuleCard></ModuleCard>
        <ModuleCard></ModuleCard> */}
      </FlexRow>
    </div>
  )
}
