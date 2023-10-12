import IFloatButton from '@/components/IFloatButton';
import {
  FavoritesFolderIcon,
  FunctionIcon,
  HomeIcon,
  MarkdownIcon,
  MoreIcon,
  TodoListIcon,
} from '@/components/icons';
import { debouncePush } from '@/utils/common';
import { FloatButton } from 'antd';
import _ from 'lodash';
import { Fragment } from 'react';
import style from './style.less';

export default function BasicNavigator() {
  const navigationItems = [
    {
      icon: <MarkdownIcon />,
      path: '/article',
    },
    {
      icon: <TodoListIcon />,
      path: '/todos',
    },
    {
      icon: <FavoritesFolderIcon />,
      onClick: () => {
        //TODO 弹出收藏夹
      },
      noRoute: true,
    },
  ];

  _.forEach(navigationItems, (navi) => {
    if (!navi.noRoute) {
      navi.onClick = (path) => {
        debouncePush('/home' + (path || ''), 200)();
      };
    }
  });

  return (
    <Fragment>
      <div className={style.homebtn}>
        <IFloatButton
          key="home"
          onClick={debouncePush('/home', 200)}
          icon={<HomeIcon />}
          style={{ left: 24, top: 24 }}
        />
        <FloatButton.Group
          trigger="hover"
          closeIcon={<MoreIcon />}
          icon={<FunctionIcon />}
        >
          {_.map(navigationItems, (navi, index) => {
            return (
              <IFloatButton
                icon={navi?.icon}
                key={index}
                onClick={navi?.onClick}
                path={navi.path}
              />
            );
          })}
        </FloatButton.Group>
        <FloatButton.BackTop style={{ right: 80 }} />
      </div>
    </Fragment>
  );
}
