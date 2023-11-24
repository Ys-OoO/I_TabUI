import Wallpaper from './Wallpaper';

const paperList = [
  {
    src: 'https://files.codelife.cc/itab/defaultWallpaper/videos/v-29.jpg?x-oss-process=image/resize,limit_0,m_fill,w_1920,h_1080/quality,q_92/format,webp',
    videoSrc: 'https://files.codelife.cc/itab/defaultWallpaper/videos/v-29.mp4',
  },
  {
    src: 'https://files.codelife.cc/itab/defaultWallpaper/videos/10.jpg?x-oss-process=image/resize,limit_0,m_fill,w_1920,h_1080/quality,q_92/format,webp',
    videoSrc: 'https://files.codelife.cc/itab/defaultWallpaper/videos/10.mp4',
  },
  {
    src: 'https://files.codelife.cc/itab/defaultWallpaper/videos/47.jpg?x-oss-process=image/resize,limit_0,m_fill,w_1920,h_1080/quality,q_92/format,webp',
    videoSrc: 'https://files.codelife.cc/itab/defaultWallpaper/videos/47.mp4',
  },
  {
    src: 'https://dogefs.s3.ladydaily.com/~/source/wallhaven/full/p9/wallhaven-p97l5e.png?w=2560&h=1440&fmt=webp',
    videoSrc: 'unknown',
  },
];

export default function WallpaperList({ onClick, ...props }) {
  return (
    <div>
      {paperList.map((p, index) => {
        return <Wallpaper paper={p} key={index} onClick={onClick} {...props} />;
      })}
    </div>
  );
}
