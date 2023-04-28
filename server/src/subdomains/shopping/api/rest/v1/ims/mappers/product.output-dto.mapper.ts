import { Product } from 'src/subdomains/shopping/domain/entities/product';
import { ProductOutputDto } from '../dto/output/product.output-dto';

export class ProductOutputDtoMapper {
  public static entityToDto(entity: Product): ProductOutputDto {
    const { id, name, description, categoriesIds, price } = entity;

    const dto = new ProductOutputDto();

    dto.id = id;
    dto.name = name;
    dto.description = description;
    dto.categoriesIds = categoriesIds;
    dto.price = price;

    return dto;
  }
}
