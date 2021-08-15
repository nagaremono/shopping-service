import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { SoldItem } from './SoldItem';
import { User } from './User';

interface TransactionAttributes {
  id: string;
  transactionDate: Date;
  customerId: number;
  totalAmount: string;
}

type TransactionCreationAttributes = Optional<TransactionAttributes, 'id'>;

export class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  readonly createdAt!: Date;

  readonly updateAt!: Date;

  id!: string;

  transactionDate!: Date;

  customerId!: number;

  totalAmount!: string;

  customer?: User;

  soldItems?: SoldItem[];

  static associations: {
    customer: Association<Transaction, User>;
    soldItems: Association<Transaction, SoldItem>;
  };
}

export function initTransaction(sequelize: Sequelize): void {
  Transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      transactionDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'transaction_date',
      },
      customerId: {
        type: DataTypes.INTEGER,
        field: 'customer_id',
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(17, 2),
        allowNull: false,
      },
    },
    {
      tableName: 'transaction',
      sequelize,
    }
  );
}

export function initTransactionRelations(): void {
  Transaction.belongsTo(User, {
    as: 'customer',
  });
  Transaction.hasMany(SoldItem, {
    foreignKey: {
      name: 'transactionId',
      field: 'transaction_id',
    },
    as: 'soldItems',
  });
}
