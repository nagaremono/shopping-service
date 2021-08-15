import dotenvSafe from 'dotenv-safe';
dotenvSafe.config();

export const CONFIG = {
  PORT: parseInt(process.env.PORT, 10),
  NODE_ENV: process.env.NODE_ENV,
  DB: {
    PORT: parseInt(process.env.DB_PORT, 10),
    USERNAME: process.env.DB_USERNAME,
    NAME: process.env.DB_NAME,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
  },
};
