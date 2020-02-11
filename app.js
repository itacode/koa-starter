const Koa = require('koa');
const app = new Koa();
const helmet = require('koa-helmet');
const views = require('koa-views');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');

/**
 * Configure environment variables defined in files inside .env.
 * Any modules needing env variables must be required after config().
 */
const config = require('./config/index');
config();

const logger = require('koa-logger');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./api');

// Security best practices
app.use(helmet());

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(indexRouter.routes()).use(indexRouter.allowedMethods());
app.use(usersRouter.routes()).use(usersRouter.allowedMethods());
apiRouter.prefix('/api');
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
