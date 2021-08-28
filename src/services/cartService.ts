import { injectable } from 'inversify';
import { AddProductToCartDTO } from '../dtos/addProductToCartDTO';
import { dbConnectionLoader } from '../loaders/dbConnectionLoader';
import { redisLoader } from '../loaders/redisLoader';
import { Product } from '../models/Product';
import { SoldItem } from '../models/SoldItem';
import { Transaction } from '../models/Transaction';
import { Cart } from '../types/cart';
import { CreateResult } from '../types/findResult';

@injectable()
export class CartService {
  async addToCart(
    { productId, quantity }: AddProductToCartDTO,
    userid: number
  ): Promise<CreateResult<Cart>> {
    const redis = redisLoader();

    await redis.hset(`cart:${userid}`, { [productId]: quantity });

    return {
      result: 'ok',
      data: await this.getUserCart(userid),
    };
  }

  async getUserCart(userId: number): Promise<Cart> {
    const redis = redisLoader();

    return new Promise((resolve, reject) => {
      redis.hgetall(`cart:${userId}`, (err, res) => {
        if (err) reject(err);

        const transformedCart: Cart = {};

        for (const [productId, quantity] of Object.entries(res)) {
          transformedCart[parseInt(productId)] = parseInt(quantity);
        }

        resolve(transformedCart);
      });
    });
  }

  async checkout(userId: number): Promise<CreateResult<Transaction>> {
    const sequelize = await dbConnectionLoader();
    const userCart = await this.getUserCart(userId);
    const redis = redisLoader();

    try {
      const data = await sequelize.transaction(async (t) => {
        const products = await Product.findAll({
          where: {
            id: Object.keys(userCart),
          },
          transaction: t,
        });

        const totalAmount = products
          .reduce((total, p) => total + parseFloat(p.price) * userCart[p.id], 0)
          .toFixed(2);

        const newTransaction = await Transaction.create(
          {
            customerId: userId,
            totalAmount,
            transactionDate: new Date(),
            paymentStatus: 'pending',
          },
          { transaction: t }
        );

        await SoldItem.bulkCreate(
          products.map(({ name, images, price, id }) => ({
            images,
            name,
            price,
            quantity: userCart[id],
            transactionId: newTransaction.id,
            productId: id,
          })),
          { transaction: t }
        );

        return newTransaction;
      });

      await redis.del(`cart:${userId}`);

      return {
        result: 'ok',
        data,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Checkout failed, please try again later.');
    }
  }
}
