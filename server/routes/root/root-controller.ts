import { Context } from 'koa';

async function indexGet(ctx: Context) {
  await ctx.render('index', {
    title: 'Hello Koa!',
  });
}

async function stringGet(ctx: Context) {
  ctx.body = 'koa string';
}

async function jsonGet(ctx: Context) {
  ctx.body = {
    title: 'koa json',
  };
}

export { indexGet, jsonGet, stringGet };

