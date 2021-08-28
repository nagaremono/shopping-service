import { ContainerModule, interfaces } from 'inversify';
import { AuthController } from '../../controllers/authController';
import { CartController } from '../../controllers/cartController';
import { HelloController } from '../../controllers/helloController';
import { ProductController } from '../../controllers/productController';

export const controllers = new ContainerModule((bind: interfaces.Bind) => {
  bind<HelloController>(HelloController).toSelf();
  bind<AuthController>(AuthController).toSelf();
  bind<ProductController>(ProductController).toSelf();
  bind<CartController>(CartController).toSelf();
});
