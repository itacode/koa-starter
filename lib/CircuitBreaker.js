const axios = require('axios');
const logger = require('../config/logger').logger;

class CircuitBreaker {
  constructor({
    failureThreshold = 5,
    cooldownPeriod = 10000,
    requestTimeout = 1000,
  } = {}) {
    this.states = {};
    this.failureThreshold = failureThreshold;
    this.cooldownPeriod = cooldownPeriod;
    this.requestTimeout = requestTimeout;
  }

  initState(endpoint) {
    this.states[endpoint] = {
      failureCount: 0,
      cooldownPeriod: this.cooldownPeriod,
      circuit: 'closed',
      nextTry: 0,
    };
  }

  async callService({ requestOptions }) {
    const endpoint = `${requestOptions.method}:${requestOptions.url}`;

    if (!this.canRequest(endpoint)) return false;

    requestOptions.timeout = this.requestTimeout;

    try {
      const response = await axios(requestOptions);
      this.onSuccess(endpoint);
      return response;
    } catch (err) {
      this.onFailure(endpoint);
      return false;
    }
  }

  canRequest(endpoint) {
    if (!this.states[endpoint]) {
      this.initState(endpoint);
    }
    const state = this.states[endpoint];

    if (state.circuit === 'closed' || state.circuit === 'halfOpen') {
      return true;
    }
    if (state.circuit === 'open') {
      if (Date.now() >= state.nextTry) {
        state.cicuit = 'halfOpen';
        logger.info(`INFO: circuit for ${endpoint} turned in state halfOpen`);
        return true;
      }
      return false;
    }
  }

  onSuccess(endpoint) {
    this.initState(endpoint);
  }

  onFailure(endpoint) {
    const state = this.states[endpoint];
    state.failureCount += 1;
    logger.info(
      `INFO: circuit for ${endpoint} has ${state.failureCount} failures`
    );
    if (
      state.circuit === 'halfOpen' ||
      state.failureCount >= this.failureThreshold
    ) {
      state.circuit = 'open';
      state.nextTry = Date.now() + this.cooldownPeriod;
      logger.warn(`WARNING: circuit for ${endpoint} turned in state open`);
    }
  }
}

module.exports = { CircuitBreaker };
