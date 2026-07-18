import Router, { RouterWithMethods } from '@koa/router';
import { DefaultContext, DefaultState } from 'koa';

import { registerRoutes as registerSearchRoutes } from './search/search-routes';

const router = new Router({
  prefix: '/api',
});

registerAllRoutes(router);

function registerAllRoutes(
  router: RouterWithMethods<string, DefaultState, DefaultContext>,
) {
  registerSearchRoutes(router);
}

export { router };
