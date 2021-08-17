import { ContainerModule, interfaces } from 'inversify';
import { SessionMiddleware } from '../../middlewares/sessionMiddleware';

export const middlewares = new ContainerModule((bind: interfaces.Bind) => {
  bind<SessionMiddleware>(SessionMiddleware).toSelf();
});
