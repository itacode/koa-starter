const Router = require('@koa/router');
const registerSearchRoutes = require('./search/search-routes');

const router = new Router({
  prefix: '/api',
});

registerAllRoutes(router);

function registerAllRoutes(router) {
  registerSearchRoutes(router);
}

module.exports = router;
