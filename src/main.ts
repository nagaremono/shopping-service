import 'reflect-metadata';
import dotenvSafe from 'dotenv-safe';
import { load } from './loaders';

dotenvSafe.config();

async function startServer() {
  const app = await load();

  app.listen(parseInt(process.env.PORT, 10), () => {
    console.log(`server started on *:${process.env.PORT}`);
  });
}

startServer();
