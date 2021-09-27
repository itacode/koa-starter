const controller = require('./search-controller');

function registerRoutes(router) {
  router.get('/search', controller.indexGet);
}

module.exports = { registerRoutes };
