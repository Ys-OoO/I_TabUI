interface IRoute {
  path?: string;
  component?: string;
  wrappers?: string[];
  redirect?: string;
  needAuth?: boolean;
  name?: string;
  routes?: IRoute[];
  [k: string]: unknown;
}

const routes: IRoute[] = [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        name: '主页',
        path: '/home',
        component: './Home',
      },
      {
        name: '笔记',
        path: '/article',
        component: './Article',
      },
      {
        name: '新建笔记',
        path: '/addArticle/:type',
        component: '@/pages/Article/ArticleEditor',
      },
    ],
  },
];

const formatRoutes = (originRoutes: IRoute[]): IRoute[] => {
  return originRoutes.map((originRoute) => {
    const newRoute = { ...originRoute };
    if (originRoute.needAuth)
      newRoute.wrappers = [
        ...(newRoute.wrappers || []),
        // "@/components/Auth/...",
      ];
    if (Array.isArray(originRoute.routes)) {
      newRoute.routes = formatRoutes(originRoute.routes);
    }
    return newRoute;
  });
};

export default formatRoutes(routes);
