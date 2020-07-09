async function indexGet(ctx, next) {
  ctx.body = {
    title: 'koa2 json',
  };
}

module.exports = { indexGet };
