import { ContainerModule, interfaces } from 'inversify';
import { AuthService } from '../../services/authService';
import { CartService } from '../../services/cartService';
import { ProductService } from '../../services/productService';
import { TransactionService } from '../../services/transactionService';

export const services = new ContainerModule((bind: interfaces.Bind) => {
  bind<AuthService>(AuthService).toSelf();
  bind<ProductService>(ProductService).toSelf();
  bind<CartService>(CartService).toSelf();
  bind<TransactionService>(TransactionService).toSelf();
});
