import backgroundImage from '@/assets/images/background.jpg';
import { useEffect, useRef } from 'react';
import style from './style.less';

const videoSrc = 'https://files.codelife.cc/itab/defaultWallpaper/videos/47.mp4';
export default function IBackground({ videoSource }) {
  const videoRef = useRef(null);
  const _videoSource = videoSource || videoSrc;
  useEffect(() => {
    if (videoRef) {
      videoRef.current.defaultPlaybackRate = 1.5;
    }
  }, [videoRef])

  return (
    <div className={style.wallpaper}>
      <video className={style.wallpaperVideo} autoPlay loop poster={backgroundImage} muted ref={videoRef}>
        <source src={_videoSource} type='video/mp4' />
      </video>
    </div>
  )
}
