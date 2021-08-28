import { injectable } from 'inversify';
import { CreateProductDTO } from '../dtos/createProductDTO';
import { Product } from '../models/Product';
import { CreateResult, FindResult } from '../types/findResult';

@injectable()
export class ProductService {
  async findAll(): Promise<FindResult<Product>> {
    const { rows: products, count } = await Product.findAndCountAll();

    return {
      result: 'ok',
      data: products,
      count,
    };
  }

  async create(body: CreateProductDTO): Promise<CreateResult<Product>> {
    const product = await Product.create(body);

    return {
      result: 'ok',
      data: product,
    };
  }
}
