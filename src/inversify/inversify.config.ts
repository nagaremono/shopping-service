import { Container } from 'inversify';
import { controllers } from './modules/controllers';
import { middlewares } from './modules/middlewares';

const myContainer = new Container();
myContainer.load(controllers, middlewares);

export { myContainer };
