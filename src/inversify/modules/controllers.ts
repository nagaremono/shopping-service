import { ContainerModule, interfaces } from 'inversify';
import { HelloController } from '../../controllers/helloController';

export const controllers = new ContainerModule((bind: interfaces.Bind) => {
  bind<HelloController>(HelloController).toSelf();
});
