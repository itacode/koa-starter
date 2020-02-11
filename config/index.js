const production = require('../.env/.env-production').envProduction;
const development = require('../.env/.env-development').env;

function init() {
  const nodeEnv = process.env.NODE_ENV;

  // Case: production
  if (!nodeEnv || nodeEnv === 'production') {
    configProduction(process.env, production);
  }

  // Case: development
  if (nodeEnv === 'development') {
    configDevelopment(process.env, development);
  }
}

function configProduction(processEnv, production) {
  mergeProperties(processEnv, production);
}

function configDevelopment(processEnv, development) {
  mergeProperties(processEnv, development);
}

function mergeProperties(target, source) {
  return Object.assign(target, source);
}

module.exports = init;
