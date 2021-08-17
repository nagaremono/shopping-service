import { injectable } from 'inversify';
import { Product } from '../models/Product';

@injectable()
export class ProductService {
  async findAll(): Promise<{
    result: string;
    products: Product[];
    count: number;
  }> {
    const { rows: products, count } = await Product.findAndCountAll();

    return {
      result: 'ok',
      products,
      count,
    };
  }
}
