const CircuitBreaker = require('../../lib/CircuitBreaker').CircuitBreaker;

const circuitbreaker = new CircuitBreaker();

async function indexGet(ctx, next) {
  const requestOptions = {
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
  };
  const serviceResponse = await circuitbreaker.callService({ requestOptions });
  ctx.log.info(serviceResponse && serviceResponse.data);
  ctx.body = {
    title: 'koa2 json',
  };
}

module.exports = { indexGet };
