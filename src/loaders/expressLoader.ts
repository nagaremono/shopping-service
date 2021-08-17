import { Application } from 'express';
import express from 'express';
import {
  getMetadataArgsStorage,
  RoutingControllersOptions,
  useExpressServer,
} from 'routing-controllers';
import path from 'path';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUI from 'swagger-ui-express';

export const expressLoader = (): Application => {
  const app = express();

  const myOptions: RoutingControllersOptions = {
    routePrefix: '/api',
    controllers: [path.join(__dirname, '..', 'controllers', '*.js')],
    middlewares: [path.join(__dirname, '..', 'middlewares', '*.js')],
  };

  const spec = routingControllersToSpec(getMetadataArgsStorage(), myOptions, {
    info: {
      title: 'Simple Shop Service',
      version: '1.0.0',
      license: {
        name: 'MIT',
      },
    },
  });

  app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(spec));

  useExpressServer(app, myOptions);

  return app;
};
