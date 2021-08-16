import { useContainer } from 'routing-controllers';
import { myContainer } from '../inversify/inversify.config';

export const IOCLoader = (): void => {
  useContainer(myContainer);
};
