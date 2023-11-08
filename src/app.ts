// 运行时配置
import { db } from '@/utils/indexDBUtils/db';
import { message, notification } from 'antd';

const refreshDB = async () => {
  const existDBtable = await db.favoritesFolder.count();
  if (existDBtable < 1) {
    db.favoritesFolder.put({ typeName: '常用' });
    db.favoritesFolder.put({ typeName: '其他' });
  }
};
refreshDB();

// 重写umi提供 的 render
export const render = async (oldRender: () => void): Promise<void> => {
  // 设置ANTD Message组件显示的容器，全屏元素或body
  message.config({
    getContainer: () =>
      (document.fullscreenElement || document.body) as HTMLElement,
  });
  oldRender();
};

// 重写umi 全局前置路由导航
/**
 export const onRouteChange = ({
  location,
  clientRoutes,
  routes,
  isFirst,
  }): void => {};
 */

//配置全局Notification
notification.config({
  bottom: 24,
  duration: 3,
  placement: 'bottomRight',
  maxCount: 3,
});
//配置全局Message
message.config({
  top: 24,
  duration: 3,
  maxCount: 2,
});
