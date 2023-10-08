import { defineConfig } from '@umijs/max';
import routes from '../I_TabUI/src/config/router/routes';

export default defineConfig({
  antd: {},
  dva: {},
  routes: routes,
  npmClient: 'yarn',
});
