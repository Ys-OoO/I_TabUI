/* eslint-disable react/button-has-type */
import { forwardRef } from 'react';
import { MotionBox } from '../styleBox';
import style from './style.less';
const Wallpaper = forwardRef(({ paper, ...props }, ref) => {
  const setBackground = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.onClick) props.onClick(paper);
  };
  return (
    <MotionBox
      whileInView="onscreen"
      initial="offscreen"
      viewport={{ once: true }}
      variants={{
        offscreen: { y: 100 },
        onscreen: {
          y: 0,
          transition: {
            type: 'spring',
            duration: 0.8,
          },
        },
      }}
      {...props}
      ref={ref}
      className={style.container}
    >
      <img src={paper.src} alt="wallpaper" className={style.image}></img>
      <div className={style.overlay} onClick={setBackground}>
        点击设置为壁纸
      </div>
    </MotionBox>
  );
});

export default Wallpaper;
