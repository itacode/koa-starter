const Router = require('@koa/router');
const registerRootRoutes = require('./root/root-routes');
const registerUsersRoutes = require('./users/users-routes');

const router = new Router();

registerAllRoutes(router);

function registerAllRoutes(router) {
  registerRootRoutes(router);
  registerUsersRoutes(router);
}

module.exports = router;
