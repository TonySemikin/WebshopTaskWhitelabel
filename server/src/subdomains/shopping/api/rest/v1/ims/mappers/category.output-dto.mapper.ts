import { Category } from 'src/subdomains/shopping/domain/entities/category';
import { CategoryOutputDto } from '../dto/output/category.output-dto';

export class CategoryOutputDtoMapper {
  public static entityToDto(entity: Category): CategoryOutputDto {
    const { id, name, description } = entity;

    const dto = new CategoryOutputDto();

    dto.id = id;
    dto.name = name;
    dto.description = description;

    return dto;
  }
}
