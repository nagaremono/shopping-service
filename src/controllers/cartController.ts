import { Request } from 'express';
import { injectable } from 'inversify';
import {
  Authorized,
  BadRequestError,
  Body,
  JsonController,
  Post,
  Req,
} from 'routing-controllers';
import { AddProductToCartDTO } from '../dtos/addProductToCartDTO';
import { CartService } from '../services/cartService';
import { Cart } from '../types/cart';
import { CreateResult } from '../types/findResult';

@injectable()
@JsonController('/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Authorized()
  @Post('/add-to-cart')
  addToCart(
    @Body() body: AddProductToCartDTO,
    @Req() req: Request
  ): Promise<CreateResult<Cart>> {
    try {
      return this.cartService.addToCart(body, req.session.userId as number);
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
}
