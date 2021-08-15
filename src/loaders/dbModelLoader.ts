import { Sequelize } from 'sequelize/types';
import { initProduct } from '../models/Product';
import { initUser } from '../models/User';

export function dbModelLoader(sequelize: Sequelize): void {
  const modelInitializers = [initUser, initProduct];

  for (const modelInitializer of modelInitializers) {
    modelInitializer(sequelize);
  }
}
