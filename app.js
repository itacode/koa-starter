'use strict';

const Koa = require('koa');
const helmet = require('koa-helmet');
const views = require('koa-views');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');

/**
 * Configure environment variables defined in files inside .env.
 * Any module needing env variables must be required after config().
 */
const config = require('./config').config;
config();

const logger = require('koa-pino-logger');

const indexRouter = require('./routes');
const apiRouter = require('./api');

const app = new Koa();

/**
 * Security best practices.
 */
app.use(helmet());

/**
 * Middlewares.
 */
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

/**
 * Pages routes.
 */
app.use(indexRouter.routes()).use(indexRouter.allowedMethods());

/**
 * API routes.
 */
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

/**
 * Error-handling.
 */
app.on('error', (err, ctx) => {
  ctx.log.error('server error', err, ctx);
});

module.exports = app;
