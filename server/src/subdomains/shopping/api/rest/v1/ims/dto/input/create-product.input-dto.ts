import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ICreateProductDto } from 'src/subdomains/shopping/application/dto/create-product.dto';

export class CreateProductDto implements ICreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  categoriesIds: string[];

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsInt()
  stock: number;
}
