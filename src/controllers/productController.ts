import { injectable } from 'inversify';
import { Authorized, Get, JsonController } from 'routing-controllers';
import { Product } from '../models/Product';
import { ProductService } from '../services/productService';

@injectable()
@JsonController('/product', { transformResponse: false })
export class ProductController {
  constructor(private ProductService: ProductService) {}

  @Authorized()
  @Get()
  findAll(): Promise<{
    result: string;
    products: Product[];
    count: number;
  }> {
    return this.ProductService.findAll();
  }
}
