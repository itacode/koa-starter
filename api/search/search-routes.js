const controller = require('./search-controller');

function registerRoutes(router) {
  router.get('/search', controller.index);
}

module.exports = registerRoutes;
