import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsNumber()
  stock!: number;

  @IsNumberString()
  price!: string;

  @IsString()
  name!: string;

  @IsString({
    each: true,
  })
  images!: string[];
}
