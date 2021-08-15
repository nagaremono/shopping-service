import { Application } from 'express';
import { dbConnectionLoader } from './dbConnectionLoader';
import { dbModelLoader } from './dbModelLoader';
import { expressLoader } from './expressLoader';

export const load = async (): Promise<Application> => {
  const sequelize = await dbConnectionLoader();
  dbModelLoader(sequelize);
  const app = expressLoader();

  return app;
};
