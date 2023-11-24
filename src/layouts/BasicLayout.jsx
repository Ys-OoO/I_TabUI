import IBackground from '@/components/IBackground';
import IFloatButton from '@/components/IFloatButton';
import { DarkIcon, LightIcon } from '@/components/icons';
import { Flex, FlexColumn } from '@/components/styleBox';
import { setCssVar } from '@/utils/common';
import { db } from '@/utils/indexDBUtils/db';
import { getStorage } from '@/utils/localStorageUtils';
import { Outlet, useDispatch, useSelector } from '@umijs/max';
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import BasicNavigator from './BasicNavigator';

export default function BasicLayout() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { wallpaper } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch({
      type: 'home/change',
      config: { wallpaper: getStorage('wallpaper', 'object') },
    });
  }, []);
  const [themIcon, setThemeIcon] = useState(<LightIcon />);
  useEffect(() => {
    setCssVar('--theme-bgc', '#fff');
    setCssVar('--theme-color', '#333');
    setCssVar('--theme-shadow', '#fff');
    setCssVar('--card-bgc', '#fff');
    setCssVar('--card-color', '#333');
    return () => {
      db.close();
    };
  }, []);

  const togggleTheme = () => {
    const style = window.getComputedStyle(document.documentElement);
    if (style.getPropertyValue('--theme-bgc') === '#333') {
      setCssVar('--theme-bgc', '#fff');
      setCssVar('--theme-color', '#333');
      setCssVar('--theme-shadow', '#fff');
      setThemeIcon(<LightIcon />);
      return;
    }
    setCssVar('--theme-bgc', '#333');
    setCssVar('--theme-color', '#fff');
    setCssVar('--theme-shadow', '#333');
    setThemeIcon(<DarkIcon />);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: 'var(--theme-bgc)',
            headerBg: 'var(--theme-bgc)',
            titleColor: 'var(--theme-color)',
          },
          Input: {
            activeBorderColor: '#fff',
            hoverBg: '#fff',
            hoverBorderColor: '#eee',
          },
        },
        token: {
          colorBgElevated: 'var(--theme-bgc)',
          colorText: 'var(--theme-color)',
        },
      }}
    >
      <FlexColumn>
        <Flex>
          <Outlet />
        </Flex>
        <BasicNavigator />
        <IFloatButton
          onClick={togggleTheme}
          icon={themIcon}
          style={{
            right: 74,
            top: 16,
            zIndx: 9,
          }}
        />
        <IBackground videoSource={wallpaper?.videoSrc} src={wallpaper?.src} />
      </FlexColumn>
    </ConfigProvider>
  );
}
