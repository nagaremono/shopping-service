import 'reflect-metadata';
import { load } from './loaders';
import { CONFIG } from './config/config';

async function startServer() {
  const app = await load();

  app.listen(CONFIG.PORT, () => {
    console.log(`server started on *:${CONFIG.PORT}`);
  });
}

startServer();
