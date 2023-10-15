import React, { useEffect, useRef } from 'react'
import backgroundImage from '@/assets/images/background.jpg';
import style from './style.less';

const videoSrc = 'https://files.codelife.cc/itab/defaultWallpaper/videos/47.mp4';
export default function IBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef) {
      videoRef.current.defaultPlaybackRate = 1.5;
    }
  }, [videoRef])

  return (
    <div className={style.wallpaper}>
      <video className={style.wallpaperVideo} autoPlay loop poster={backgroundImage} muted ref={videoRef}>
        <source src={videoSrc} type='video/mp4' />
      </video>
    </div>
  )
}
