import { defineConfig } from '@umijs/max';
import routes, { IRoute } from './router/routes';

const formatRoutes = (originRoutes: IRoute[]): IRoute[] => {
  return originRoutes.map((originRoute) => {
    const newRoute = { ...originRoute };
    //TDOD wrapper 通过路由规则中unaccessable字段判断是否进行校验，修改其为校验路由
    if (originRoute.unaccessable) {
      newRoute.wrappers = [...(newRoute.wrappers || []), '@/components/...'];
    }
    if (Array.isArray(originRoute.routes)) {
      newRoute.routes = formatRoutes(originRoute.routes);
    }
    return newRoute;
  });
};

export default defineConfig({
  layout: {
    title: 'I_Tab',
  },
  dva: {},
  routes: formatRoutes(routes),
  npmClient: 'npm',
});
