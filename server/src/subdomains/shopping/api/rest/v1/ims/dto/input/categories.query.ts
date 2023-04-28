import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';
import { ICategoriesQuery } from 'src/subdomains/shopping/application/dto/categories.query';

export class CategoriesQuery implements ICategoriesQuery {
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  categoriesIds?: string[];
}
