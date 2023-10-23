import { FlexRow } from '@/components/styleBox';
import ModuleCard from '@/pages/Module/ModuleCard/ModuleCard';
import style from './style.less';

export default function Module() {
  return (
    <div className={style.moduleContainer}>
      <FlexRow
        style={{
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        <ModuleCard keyProp="1"></ModuleCard>
        <ModuleCard keyProp="2"></ModuleCard>
      </FlexRow>
    </div>
  );
}
