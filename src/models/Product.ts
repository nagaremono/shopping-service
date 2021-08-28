import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { SoldItem } from './SoldItem';

interface ProductAttributes {
  id: number;
  stock: number;
  images: string[];
  price: string;
  name: string;
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id'>;

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  readonly createdAt!: Date;

  readonly updatedAt!: Date;

  id!: number;

  stock!: number;

  price!: string;

  name!: string;

  images!: string[];

  soldItems?: SoldItem[];

  static associations: {
    soldItems: Association<Product, SoldItem>;
  };
}

export function initProduct(sequelize: Sequelize): void {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      stock: {
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
    },
    {
      tableName: 'product',
      sequelize,
    }
  );
}

export function initProductRelations(): void {
  Product.hasMany(SoldItem, {
    foreignKey: {
      name: 'productId',
      field: 'product_id',
    },
    as: 'soldItems',
  });
}
