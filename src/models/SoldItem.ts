import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Transaction } from './Transaction';

interface SoldItemAttributes {
  id: number;
  quantity: number;
  images: string[];
  price: string;
  name: string;
  transactionId: string;
}

type SoldItemCreationAttributes = Optional<SoldItemAttributes, 'id'>;

export class SoldItem
  extends Model<SoldItemAttributes, SoldItemCreationAttributes>
  implements SoldItemAttributes
{
  readonly createdAt!: Date;

  readonly updatedAt!: Date;

  id!: number;

  quantity!: number;

  price!: string;

  name!: string;

  images!: string[];

  transactionId!: string;

  transaction?: Transaction;

  static associations: {
    transaction: Association<SoldItem, Transaction>;
  };
}

export function initSoldItem(sequelize: Sequelize): void {
  SoldItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(17, 2),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      images: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      transactionId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'transaction_id',
      },
    },
    {
      tableName: 'sold_item',
      sequelize,
    }
  );
}

export function initSoldItemRelations(): void {
  SoldItem.belongsTo(Transaction, {
    as: 'transaction',
  });
}
