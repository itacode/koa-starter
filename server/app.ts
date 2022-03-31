'use strict';

import path from 'path';
import Koa from 'koa';
import helmet from 'koa-helmet';
import views from 'koa-views';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import koaPinoLogger from 'koa-pino-logger';
import koaStatic from 'koa-static';

import { router as indexRouter } from './routes';
import { router as apiRouter } from './api';

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
    })
  );
  app.use(json());
  app.use(pino);
  app.use(koaStatic(path.join(__dirname, '../public')));

  app.use(
    views(path.join(__dirname, './views'), {
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

  return app;
}

export { newApp };
