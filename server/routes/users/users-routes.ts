import { RouterWithMethods } from '@koa/router';
import { DefaultContext, DefaultState } from 'koa';

import { barGet, indexGet } from './users-controller';

function registerRoutes(
  router: RouterWithMethods<string, DefaultState, DefaultContext>,
) {
  router.get('/users', indexGet);
  router.get('/users/bar', barGet);
}

export { registerRoutes };
