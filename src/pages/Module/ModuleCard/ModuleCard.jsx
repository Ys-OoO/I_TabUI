import { useEffect } from 'react';
import style from './style.less';

const defalutCardInfo = {
  desc: '持续开发中...🤗',
  borderColor: '',
};

function getRotateDegree(mousePosition, cardLength) {
  const range = [-15, 15];
  return (mousePosition / cardLength) * (range[1] - range[0]) + range[0];
}

export default function ModuleCard({
  cardInfo = defalutCardInfo,
  keyProp = 'default',
  ...props
}) {
  useEffect(() => {
    //Module card rotation on mousemove
    const card = document.querySelector(`#card_${keyProp}`);
    const rotateFunc = (e) => {
      const { offsetX, offsetY } = e;
      const { offsetWidth, offsetHeight } = card;
      const yDegree = -getRotateDegree(offsetX, offsetWidth);
      const xDegree = getRotateDegree(offsetY, offsetHeight);
      card.style.setProperty('--rx', `${xDegree}deg`);
      card.style.setProperty('--ry', `${yDegree}deg`);
    };
    const recoverFunc = (e) => {
      card.style.setProperty('--rx', `0deg`);
      card.style.setProperty('--ry', `0deg`);
    };
    card.onmousemove = rotateFunc;
    card.onmouseleave = recoverFunc;
    return () => {
      card.onmousemove = null;
      card.onmouseleave = null;
    };
  }, []);

  return (
    <div
      className={style.cardBackground}
      {...props}
      id={`card_${keyProp}`}
      key={keyProp}
    >
      <div className={style.moduleCard}>
        <div className={style.desc}>{cardInfo.desc}</div>
      </div>
    </div>
  );
}
