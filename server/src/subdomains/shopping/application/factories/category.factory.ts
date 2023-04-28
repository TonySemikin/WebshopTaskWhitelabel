import { Category } from '../../domain/entities/category';
import { ICreateCategoryDto } from '../dto/create-category.dto';

export class CategoryFactory {
  static create({ name, description }: ICreateCategoryDto): Category {
    return new Category(null, new Date(), new Date(), name, description);
  }
}
