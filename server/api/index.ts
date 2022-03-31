import Router from '@koa/router';
import { registerRoutes as registerSearchRoutes } from './search/search-routes';

const router = new Router({
  prefix: '/api',
});

registerAllRoutes(router);

function registerAllRoutes(router: Router) {
  registerSearchRoutes(router);
}

export { router };
