import { IsNumber } from 'class-validator';

export class AddProductToCartDTO {
  @IsNumber()
  productId!: number;

  @IsNumber()
  quantity!: number;
}
