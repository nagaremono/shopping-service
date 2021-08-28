import { injectable } from 'inversify';
import {
  Authorized,
  BadRequestError,
  Body,
  CurrentUser,
  JsonController,
  Post,
} from 'routing-controllers';
import { AddProductToCartDTO } from '../dtos/addProductToCartDTO';
import { User } from '../models/User';
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
    @CurrentUser({ required: true }) user: User
  ): Promise<CreateResult<Cart>> {
    try {
      return this.cartService.addToCart(body, user.id);
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
}
