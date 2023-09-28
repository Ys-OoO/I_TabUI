export interface IRoute {
  path?: string;
  wrappers?: string[];
  component?: string;
  redirect?: string;
  title?: string;
  unaccessable?: any; //路由访问权限 真值时进行校验
  routes?: IRoute[];
  [key: string]: unknown;
}

//修改后需要重新启动(umi编译)
const routes: IRoute[] = [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        component: '@/pages/Home/index',
      },
      {
        path: '*',
        component: '/404',
      },
    ],
  },
];

export default routes;
