import IBackground from '@/components/IBackground';
import IFloatButton from '@/components/IFloatButton';
import { DarkIcon, LightIcon } from '@/components/icons';
import { Flex, FlexColumn } from '@/components/styleBox';
import { db } from '@/utils/indexDBUtils/db';
import { Outlet, useDispatch, useSelector } from '@umijs/max';
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import BasicNavigator from './BasicNavigator';

const setCssVar = (cssVar, value) => {
  document.documentElement.style.setProperty(cssVar, value);
};
export default function BasicLayout() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [themIcon, setThemeIcon] = useState(<LightIcon />);
  useEffect(() => {
    // TODO 存localStorage 初始化主题样式变量
    setCssVar('--theme-bgc', '#fff');
    setCssVar('--theme-color', '#333');
    setCssVar('--theme-shadow', '#fff');
    return () => {
      db.close();
    };
  }, []);

  const handleChangeTheme = () => {
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
          onClick={handleChangeTheme}
          icon={themIcon}
          style={{
            right: 74,
            top: 16,
            zIndx: 9,
          }}
        />
        <IBackground />
      </FlexColumn>
    </ConfigProvider>
  );
}
