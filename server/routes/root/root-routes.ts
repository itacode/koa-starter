import Router from '@koa/router';
import { indexGet, jsonGet, stringGet } from './root-controller';

function registerRoutes(router: Router) {
  router.get('/', indexGet);
  router.get('/string', stringGet);
  router.get('/json', jsonGet);
}

export { registerRoutes };
