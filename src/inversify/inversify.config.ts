import { Container } from 'inversify';
import { controllers } from './modules/controllers';
import { middlewares } from './modules/middlewares';
import { services } from './modules/services';

const myContainer = new Container();
myContainer.load(controllers, middlewares, services);

export { myContainer };
