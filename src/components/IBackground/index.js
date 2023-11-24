import backgroundImage from '@/assets/images/background.jpg';
import { useEffect, useRef } from 'react';
import style from './style.less';

const videoSrc = 'https://files.codelife.cc/itab/defaultWallpaper/videos/47.mp4';
export default function IBackground({ videoSource, src }) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef) {
      videoRef.current.defaultPlaybackRate = 1.5;
    }
  }, [videoRef])
  return (
    <div className={style.wallpaper}>
      <video className={style.wallpaperVideo} autoPlay loop poster={src || backgroundImage} muted ref={videoRef} src={videoSource || videoSrc}>
      </video>
    </div>
  )
}
