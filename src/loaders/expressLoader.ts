import { Application } from 'express';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import path from 'path';

export const expressLoader = (): Application => {
  const app = express();
  useExpressServer(app, {
    controllers: [path.join(__dirname, '..', 'controllers', '*.js')],
  });
  return app;
};
