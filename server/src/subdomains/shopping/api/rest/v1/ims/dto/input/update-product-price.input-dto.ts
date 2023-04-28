import { IsNotEmpty, IsNumber } from 'class-validator';
import { IUpdateProductPriceDto } from 'src/subdomains/shopping/application/dto/update-product-price.dto';

export class UpdateProductPriceDto implements IUpdateProductPriceDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
