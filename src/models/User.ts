import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Transaction } from './Transaction';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  readonly createdAt!: Date;

  readonly updatedAt!: Date;

  id!: number;

  username!: string;

  email!: string;

  password!: string;

  transactions?: Transaction[];

  static associations: {
    transactions: Association<User, Transaction>;
  };
}

export function initUser(sequelize: Sequelize): void {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'user',
      sequelize,
    }
  );
}

export function initUserRelations(): void {
  User.hasMany(Transaction, {
    foreignKey: {
      name: 'customerId',
      field: 'customer_id',
    },
    as: 'transactions',
  });
}
