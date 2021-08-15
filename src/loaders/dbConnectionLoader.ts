import { Sequelize } from 'sequelize';

export const dbConnectionLoader = async (): Promise<Sequelize> => {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    port: parseInt(process.env.DB_PORT, 10),
    host: process.env.DB_HOST,
  });

  try {
    await sequelize.authenticate();
    console.log('connected to database');
  } catch (error) {
    console.error(error);
  }
  return sequelize;
};
