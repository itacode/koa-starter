const nock = require('nock');
const CicuitBreaker = require('./CircuitBreaker').CircuitBreaker;

// https://github.com/nock/nock#axios
const axiosAdapter = require('axios/lib/adapters/http');

const circuitBreaker = new CicuitBreaker({
  failureThreshold: 5,
  cooldownPeriod: 3000,
  requestTimeout: 400,
});
const failureThresholdDelta = 1;
const requestTimeoutDelta = 100;
const nockUrl = 'http://example.com';
const requestOptions = {
  method: 'get',
  url: nockUrl,
  adapter: axiosAdapter,
};
const endpoint = `${requestOptions.method}:${requestOptions.url}`;

describe('Circuit breaker state transitions', () => {

  test('closed: successes = failure threshold', async () => {
    // jest.setTimeout(10000);
    let res;

    // Fast response
    nock(nockUrl)
      .persist()
      .get('/')
      .delay(circuitBreaker.requestTimeout - requestTimeoutDelta)
      .reply(200, {
        license: 'MIT',
      });
    for (let i = 0; i < circuitBreaker.failureThreshold + failureThresholdDelta; i++) {
      res = await circuitBreaker.callService({ requestOptions });
      expect(res.data.license).toBe('MIT');
    }
    expect(circuitBreaker.states[endpoint].circuit).toBe('closed');
    nock.cleanAll();
  });

  test('closed -> open: failures = threshold', async () => {
    nock(nockUrl)
      .persist()
      .get('/')
      .delay(circuitBreaker.requestTimeout + requestTimeoutDelta)
      .reply(200, {
        license: 'MIT',
      });
    for (let i = 0; i < circuitBreaker.failureThreshold; i++) {
      await circuitBreaker.callService({ requestOptions });
    }
    expect(circuitBreaker.states[endpoint].circuit).toBe('open');
    nock.cleanAll();
  });

  test('closed -> open -> halfOpen (cooldown) -> open', async () => {
    jest.setTimeout(10000);

    // Slow response
    nock(nockUrl)
      .persist()
      .get('/')
      .delay(circuitBreaker.requestTimeout + requestTimeoutDelta)
      .reply(200, {
        license: 'MIT',
      });
    // closed -> open
    for (let i = 0; i < circuitBreaker.failureThreshold; i++) {
      await circuitBreaker.callService({ requestOptions });
    }
    // -> halfOpen (cooldown)
    await delay(circuitBreaker.states[endpoint].cooldownPeriod + 100);
    // -> open
    await circuitBreaker.callService({ requestOptions });
    expect(circuitBreaker.states[endpoint].circuit).toBe('open');
    nock.cleanAll();
  });

  test('closed -> open -> halfOpen (cooldown) -> open -> open -> halfOpen (cooldown) -> closed -> closed', async () => {
    jest.setTimeout(50000);
    let res;

    // Slow response
    nock(nockUrl)
      .persist()
      .get('/')
      .delay(circuitBreaker.requestTimeout + requestTimeoutDelta)
      .reply(200, {
        license: 'MIT',
      });
    // -> open
    for (let i = 0; i < circuitBreaker.failureThreshold; i++) {
      res = await circuitBreaker.callService({ requestOptions });
      expect(res.data).toBe(undefined);
    }
    expect(circuitBreaker.states[endpoint].circuit).toBe('open');
    // -> halfOpen (cooldown)
    await delay(circuitBreaker.states[endpoint].cooldownPeriod + 1000);
    // -> open
    res = await circuitBreaker.callService({ requestOptions });
    expect(circuitBreaker.states[endpoint].circuit).toBe('open');

    // Fast response
    nock.cleanAll();
    nock(nockUrl)
      .persist()
      .get('/')
      .delay(circuitBreaker.requestTimeout - requestTimeoutDelta)
      .reply(200, {
        license: 'MIT',
      });
    // -> open
    res = await circuitBreaker.callService({ requestOptions });
    expect(circuitBreaker.states[endpoint].circuit).toBe('open');
    // -> halfOpen (cooldown)
    await delay(circuitBreaker.states[endpoint].cooldownPeriod + 1000);
    // -> closed
    res = await circuitBreaker.callService({ requestOptions });
    expect(circuitBreaker.states[endpoint].circuit).toBe('closed');

    // Slow response
    nock.cleanAll();
    nock(nockUrl)
      .persist()
      .get('/')
      .delay(circuitBreaker.requestTimeout + requestTimeoutDelta)
      .reply(200, {
        license: 'MIT',
      });
    // Failures less then treshold
    // -> closed
    for (let i = 0; i < circuitBreaker.failureThreshold - failureThresholdDelta; i++) {
      res = await circuitBreaker.callService({ requestOptions });
      expect(circuitBreaker.states[endpoint].circuit).toBe('closed');
    }
  });
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
