'use strict';

import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import json from 'koa-json';
import koaPinoLogger from 'koa-pino-logger';
import koaStatic from 'koa-static';
// import views from 'koa-views';
import views from '@ladjs/koa-views';
import path from 'path';

import { router as apiRouter } from './api';
import { router as indexRouter } from './routes';

function newApp() {
  const pino = koaPinoLogger();
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
    }),
  );
  app.use(json());
  app.use(pino);
  app.use(koaStatic(path.join(__dirname, '../public')));

  const render = views(__dirname + '/views', { extension: 'ejs' });
  // Must be used before any router is used
  app.use(render);

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

  return app;
}

export { newApp };
