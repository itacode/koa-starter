import { RouterWithMethods } from '@koa/router';
import { indexGet } from './search-controller';
import { DefaultState, DefaultContext } from 'koa';

function registerRoutes(
  router: RouterWithMethods<string, DefaultState, DefaultContext>,
) {
  router.get('/search', indexGet);
}

export { registerRoutes };
