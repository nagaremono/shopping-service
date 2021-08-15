/* eslint-disable @typescript-eslint/no-var-requires */
const dotenvSafe = require('dotenv-safe');

dotenvSafe.config();

const { DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
  },
};
