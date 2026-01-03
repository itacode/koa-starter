import { RouterWithMethods } from '@koa/router';
import { barGet, indexGet } from './users-controller';
import { DefaultState, DefaultContext } from 'koa';

function registerRoutes(
  router: RouterWithMethods<string, DefaultState, DefaultContext>,
) {
  router.get('/users', indexGet);
  router.get('/users/bar', barGet);
}

export { registerRoutes };
