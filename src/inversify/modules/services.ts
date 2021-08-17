import { ContainerModule, interfaces } from 'inversify';
import { AuthService } from '../../services/authService';

export const services = new ContainerModule((bind: interfaces.Bind) => {
  bind<AuthService>(AuthService).toSelf();
});
