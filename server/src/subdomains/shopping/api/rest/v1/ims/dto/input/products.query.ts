import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { IProductsQuery } from 'src/subdomains/shopping/application/dto/products.query';

export class ProductsQuery implements IProductsQuery {
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  from: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  to: number;
}
