import Router from '@koa/router';
import { indexGet } from './search-controller';

function registerRoutes(router: Router) {
  router.get('/search', indexGet);
}

export { registerRoutes };
