import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

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
