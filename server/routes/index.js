const Router = require('@koa/router');
const registerRootRoutes = require('./root/root-routes').registerRoutes;
const registerUsersRoutes = require('./users/users-routes').registerRoutes;

const router = new Router();

registerAllRoutes(router);

function registerAllRoutes(router) {
  registerRootRoutes(router);
  registerUsersRoutes(router);
}

module.exports = { router };
