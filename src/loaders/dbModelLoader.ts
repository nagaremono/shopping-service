import { Sequelize } from 'sequelize';
import { initProduct, initProductRelations } from '../models/Product';
import { initSoldItem, initSoldItemRelations } from '../models/SoldItem';
import {
  initTransaction,
  initTransactionRelations,
} from '../models/Transaction';
import { initUser, initUserRelations } from '../models/User';

export function dbModelLoader(sequelize: Sequelize): void {
  const modelInitializers = [
    initUser,
    initProduct,
    initTransaction,
    initSoldItem,
  ];
  const relationInitializers = [
    initUserRelations,
    initTransactionRelations,
    initSoldItemRelations,
    initProductRelations,
  ];

  for (const modelInitializer of modelInitializers) {
    modelInitializer(sequelize);
  }

  for (const relationInitializer of relationInitializers) {
    relationInitializer();
  }
}
