import WallpaperList from '@/components/WallpaperList';
import { WallpaperIcon } from '@/components/icons';
import { setStorage } from '@/utils/localStorageUtils';
import { useDispatch, useSelector } from '@umijs/max';
import { Modal } from 'antd';
export default function WallpaperChangeModal() {
  const dispatch = useDispatch();
  const { wallpaperVisible } = useSelector((state) => state.home);

  const onClose = () => {
    dispatch({ type: 'home/change', config: { wallpaperVisible: false } });
  };

  const setBackground = (paper) => {
    dispatch({ type: 'home/change', config: { wallpaper: paper } });
    setStorage('wallpaper', paper, 'object');
  };

  return (
    <Modal
      open={wallpaperVisible}
      onCancel={onClose}
      width={1200}
      footer={null}
      title={
        <>
          <WallpaperIcon></WallpaperIcon>
          <span style={{ marginLeft: 8 }}>壁纸切换</span>
        </>
      }
      styles={{ body: { maxHeight: 600, overflow: 'auto', padding: 24 } }}
      destroyOnClose
    >
      <WallpaperList onClick={setBackground} />
    </Modal>
  );
}
