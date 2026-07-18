import { RouterWithMethods } from '@koa/router';
import { DefaultContext, DefaultState } from 'koa';

import { indexGet, jsonGet, stringGet } from './root-controller';

function registerRoutes(
  router: RouterWithMethods<string, DefaultState, DefaultContext>,
) {
  router.get('/', indexGet);
  router.get('/string', stringGet);
  router.get('/json', jsonGet);
}

export { registerRoutes };
