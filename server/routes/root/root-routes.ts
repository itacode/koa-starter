import { RouterWithMethods } from '@koa/router';
import { indexGet, jsonGet, stringGet } from './root-controller';
import { DefaultState, DefaultContext } from 'koa';

function registerRoutes(router: RouterWithMethods<string, DefaultState, DefaultContext>) {
  router.get('/', indexGet);
  router.get('/string', stringGet);
  router.get('/json', jsonGet);
}

export { registerRoutes };
