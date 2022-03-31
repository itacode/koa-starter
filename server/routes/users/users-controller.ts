import { Context } from 'koa';

async function indexGet(ctx: Context) {
  ctx.body = 'this is a users response!';
}

async function barGet(ctx: Context) {
  ctx.body = 'bar';
}

export { indexGet, barGet };
