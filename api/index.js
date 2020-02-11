const Router = require('@koa/router');
const registerSearchRoutes = require('./search/search-routes');

const router = new Router();

const routes = getRoutes(router);

function getRoutes(router) {
  registerSearchRoutes(router);
  return router;
}

module.exports = routes;
