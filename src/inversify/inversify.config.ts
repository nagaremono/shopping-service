import { Container } from 'inversify';
import { controllers } from './modules/controllers';

const myContainer = new Container();
myContainer.load(controllers);

export { myContainer };
