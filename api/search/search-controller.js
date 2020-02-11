async function index(ctx, next) {
  ctx.body = {
    title: 'koa2 json',
  };
}

module.exports.index = index;
