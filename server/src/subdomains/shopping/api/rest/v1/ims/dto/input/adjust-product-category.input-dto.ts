import { IsNotEmpty, IsString } from 'class-validator';
import { IAdjustProductCategoryDto } from 'src/subdomains/shopping/application/dto/adjust-product-category.dto';

export class AdjustProductCategoryDto implements IAdjustProductCategoryDto {
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
