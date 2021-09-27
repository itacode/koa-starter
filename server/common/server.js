'use strict';

const path = require('path');
const Koa = require('koa');
const helmet = require('koa-helmet');
const views = require('koa-views');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');

const pino = require('koa-pino-logger')();

const indexRouter = require('../routes').router;
const apiRouter = require('../api').router;

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
app.use(pino);
app.use(require('koa-static')(path.join(__dirname, '../../public')));

app.use(
  views(path.join(__dirname, '../views'), {
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
