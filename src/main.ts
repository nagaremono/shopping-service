import 'reflect-metadata';
import { expressLoader } from './loaders/expressLoader';
import dotenvSafe from 'dotenv-safe';
import { dbConnectionLoader } from './loaders/dbConnectionLoader';

dotenvSafe.config();

async function startServer() {
  await dbConnectionLoader();
  const app = expressLoader();

  app.listen(parseInt(process.env.PORT, 10), () => {
    console.log(`server started on *:${process.env.PORT}`);
  });
}

startServer();
