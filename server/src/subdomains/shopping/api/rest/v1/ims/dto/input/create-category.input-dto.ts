import { IsNotEmpty, IsString } from 'class-validator';
import { ICreateCategoryDto } from 'src/subdomains/shopping/application/dto/create-category.dto';

export class CreateCategoryDto implements ICreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
