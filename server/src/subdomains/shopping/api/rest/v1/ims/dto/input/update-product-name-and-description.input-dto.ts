import { IsNotEmpty, IsString } from 'class-validator';
import { IUpdateProductNameAndDescriptionDto } from 'src/subdomains/shopping/application/dto/update-product-name-and-description.dto';

export class UpdateProductNameAndDescriptionDto
  implements IUpdateProductNameAndDescriptionDto
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
