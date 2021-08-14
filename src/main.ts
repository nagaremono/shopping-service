import 'reflect-metadata';
import { expressLoader } from './loaders/expressLoader';
import dotenvSafe from 'dotenv-safe';

dotenvSafe.config();

function startServer() {
  const app = expressLoader();

  app.listen(parseInt(process.env.PORT, 10), () => {
    console.log(`server started on *:${process.env.PORT}`);
  });
}

startServer();
