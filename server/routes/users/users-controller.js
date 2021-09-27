async function indexGet(ctx, next) {
  ctx.body = 'this is a users response!';
}

async function barGet(ctx, next) {
  ctx.body = 'bar';
}

module.exports = {
  indexGet,
  barGet,
};
