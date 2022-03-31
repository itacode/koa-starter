import Router from '@koa/router';
import { indexGet, stringGet, jsonGet } from './root-controller';

function registerRoutes(router: Router) {
  router.get('/', indexGet);
  router.get('/string', stringGet);
  router.get('/json', jsonGet);
}

export { registerRoutes };
