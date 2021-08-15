import { Sequelize } from 'sequelize';
import { CONFIG } from '../config/config';

export const dbConnectionLoader = async (): Promise<Sequelize> => {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    database: CONFIG.DB.NAME,
    password: CONFIG.DB.PASSWORD,
    username: CONFIG.DB.USERNAME,
    port: CONFIG.DB.PORT,
    host: CONFIG.DB.HOST,
  });

  try {
    await sequelize.authenticate();
    console.log('connected to database');
  } catch (error) {
    console.error(error);
  }
  return sequelize;
};
