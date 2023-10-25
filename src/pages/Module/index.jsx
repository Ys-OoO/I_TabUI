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
        <ModuleCard
          keyProp="1"
          borderColor={
            'linear-gradient(var(--direc),#fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)'
          }
        ></ModuleCard>
        <ModuleCard keyProp="2"></ModuleCard>
      </FlexRow>
    </div>
  );
}
