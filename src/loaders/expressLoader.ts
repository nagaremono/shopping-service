import { Application } from 'express';
import express from 'express';
import {
  Action,
  getMetadataArgsStorage,
  RoutingControllersOptions,
  useExpressServer,
} from 'routing-controllers';
import path from 'path';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUI from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import cors from 'cors';
import { CONFIG } from '../config/config';
import { User } from '../models/User';

export const expressLoader = (): Application => {
  const app = express();

  const myOptions: RoutingControllersOptions = {
    routePrefix: '/api',
    controllers: [path.join(__dirname, '..', 'controllers', '*.js')],
    middlewares: [path.join(__dirname, '..', 'middlewares', '*.js')],
    authorizationChecker: (action: Action) => !!action.request.session.userId,
    validation: {
      validationError: {
        target: false,
      },
    },
    currentUserChecker: async (action: Action) =>
      User.findByPk(action.request.session.userId),
  };

  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
  });

  const spec = routingControllersToSpec(getMetadataArgsStorage(), myOptions, {
    info: {
      title: 'Simple Shop Service',
      version: '1.0.0',
      license: {
        name: 'MIT',
      },
    },
    components: {
      schemas,
    },
  });

  app.use(
    cors({
      credentials: true,
      origin: CONFIG.ORIGIN,
    })
  );
  app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(spec));

  useExpressServer(app, myOptions);

  return app;
};
