import axios, { AxiosRequestConfig } from 'axios';
import { Context } from 'koa';

async function indexGet(ctx: Context) {
  const requestOptions: AxiosRequestConfig = {
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
  };
  const serviceResponse = await axios(requestOptions);
  ctx.log.info(serviceResponse && serviceResponse.data);
  ctx.body = {
    title: 'koa2 json',
  };
}

export { indexGet };
