const controller = require('./root-controller');

function registerRoutes(router) {
  router.get('/', controller.indexGet);
  router.get('/string', controller.stringGet);
  router.get('/json', controller.jsonGet);
}

module.exports = registerRoutes;
