import { Sequelize } from 'sequelize/types';
import { initUser } from '../models/User';

export function dbModelLoader(sequelize: Sequelize): void {
  const modelInitializers = [initUser];

  for (const modelInitializer of modelInitializers) {
    modelInitializer(sequelize);
  }
}
