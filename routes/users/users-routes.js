const controller = require('./users-controller');

function registerRoutes(router) {
  router.get('/users', controller.indexGet);
  router.get('/users/bar', controller.barGet);
}

module.exports = { registerRoutes };
