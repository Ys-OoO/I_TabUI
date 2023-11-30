import IFloatButton from '@/components/IFloatButton';
import {
  FavoritesFolderIcon,
  FunctionIcon,
  GitHubIcon,
  MoreIcon,
  WallpaperIcon,
} from '@/components/icons';
import { debouncePush, getClientInfo } from '@/utils/common';
import { BookTwoTone } from '@ant-design/icons';
import { useDispatch } from '@umijs/max';
import { FloatButton } from 'antd';
import _ from 'lodash';
import { Fragment } from 'react';
import style from './style.less';

const { isPc, isMobile } = getClientInfo();
export default function BasicNavigator() {
  const dispatch = useDispatch();
  const navigationItems = [
    {
      icon: <FavoritesFolderIcon />,
      onClick: () => {
        dispatch({
          type: 'home/change',
          config: {
            folderManage: true,
          },
        });
      },
      noRoute: true,
      tooltip: '收藏夹',
    },
    {
      icon: <BookTwoTone />,
      onClick: () => {
        dispatch({
          type: 'home/change',
          config: {
            editVisible: true,
          },
        });
      },
      noRoute: true,
      tooltip: '添加收藏项',
    },
    {
      icon: <WallpaperIcon />,
      onClick: () => {
        dispatch({
          type: 'home/change',
          config: {
            wallpaperVisible: true,
          },
        });
      },
      noRoute: true,
      tooltip: '切换壁纸',
    },
  ];

  _.forEach(navigationItems, (navi) => {
    if (!navi.noRoute) {
      navi.onClick = (path) => {
        debouncePush(path || '', 200)();
      };
    }
  });

  return (
    <Fragment>
      <div className={style.homebtn}>
        {/* 目前无路由，先注释 */}
        {/* <IFloatButton
          key="home"
          onClick={() => {
            debouncePush('/home', 200);
          }}
          icon={<HomeIcon />}
          style={{
            left: 24,
            top: 24,
          }}
        /> */}
        <IFloatButton
          key="home"
          onClick={() => {
            window.open('https://github.com/Ys-OoO');
          }}
          icon={<GitHubIcon></GitHubIcon>}
          style={{
            left: 24,
            top: 24,
          }}
        />
        <FloatButton.Group
          trigger="click"
          closeIcon={<MoreIcon />}
          icon={<FunctionIcon />}
        >
          {_.map(navigationItems, (navi, index) => {
            return (
              <IFloatButton
                icon={navi?.icon}
                key={index}
                onClick={navi?.onClick}
                path={navi?.path}
                tooltip={navi?.tooltip}
              />
            );
          })}
        </FloatButton.Group>
        <FloatButton.BackTop style={{ right: 80 }} />
      </div>
    </Fragment>
  );
}
