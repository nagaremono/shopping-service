import { Application } from 'express';
import { dbConnectionLoader } from './dbConnectionLoader';
import { dbModelLoader } from './dbModelLoader';
import { expressLoader } from './expressLoader';
import { IOCLoader } from './IOCloader';

export const load = async (): Promise<Application> => {
  const sequelize = await dbConnectionLoader();
  dbModelLoader(sequelize);
  IOCLoader();
  const app = expressLoader();

  return app;
};
