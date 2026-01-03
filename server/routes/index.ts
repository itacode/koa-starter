import Router, { RouterWithMethods } from '@koa/router';
import { registerRoutes as registerRootRoutes } from './root/root-routes';
import { registerRoutes as registerUsersRoutes } from './users/users-routes';
import { DefaultState, DefaultContext } from 'koa';

const router = new Router({});

registerAllRoutes(router);

function registerAllRoutes(router: RouterWithMethods<string, DefaultState, DefaultContext>) {
  registerRootRoutes(router);
  registerUsersRoutes(router);
}

export { router };
