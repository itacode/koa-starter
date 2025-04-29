import { Context } from 'koa';

async function indexGet(ctx: Context) {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  });
}

async function stringGet(ctx: Context) {
  ctx.body = 'koa2 string';
}

async function jsonGet(ctx: Context) {
  ctx.body = {
    title: 'koa2 json',
  };
}

export { indexGet, jsonGet, stringGet };

