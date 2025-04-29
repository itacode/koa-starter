import Router from '@koa/router';
import { barGet, indexGet } from './users-controller';

function registerRoutes(router: Router) {
  router.get('/users', indexGet);
  router.get('/users/bar', barGet);
}

export { registerRoutes };
