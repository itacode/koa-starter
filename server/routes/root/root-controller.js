async function indexGet(ctx, next) {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  });
}

async function stringGet(ctx, next) {
  ctx.body = 'koa2 string';
}

async function jsonGet(ctx, next) {
  ctx.body = {
    title: 'koa2 json',
  };
}

module.exports = {
  indexGet,
  stringGet,
  jsonGet,
};
