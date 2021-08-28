import { injectable } from 'inversify';
import { AddProductToCartDTO } from '../dtos/addProductToCartDTO';
import { redisLoader } from '../loaders/redisLoader';
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
}
