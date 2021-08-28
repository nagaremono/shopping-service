import { injectable } from 'inversify';
import {
  Authorized,
  BadRequestError,
  Body,
  Get,
  JsonController,
  Post,
} from 'routing-controllers';
import { CreateProductDTO } from '../dtos/createProductDTO';
import { Product } from '../models/Product';
import { ProductService } from '../services/productService';
import { CreateResult, FindResult } from '../types/findResult';

@injectable()
@JsonController('/product', { transformResponse: false })
export class ProductController {
  constructor(private ProductService: ProductService) {}

  @Authorized()
  @Get()
  findAll(): Promise<FindResult<Product>> {
    return this.ProductService.findAll();
  }

  @Authorized()
  @Post()
  create(@Body() body: CreateProductDTO): Promise<CreateResult<Product>> {
    try {
      return this.ProductService.create(body);
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
}
