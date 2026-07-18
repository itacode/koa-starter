import { RouterWithMethods } from '@koa/router';
import { DefaultContext, DefaultState } from 'koa';

import { indexGet } from './search-controller';

function registerRoutes(
  router: RouterWithMethods<string, DefaultState, DefaultContext>,
) {
  router.get('/search', indexGet);
}

export { registerRoutes };
