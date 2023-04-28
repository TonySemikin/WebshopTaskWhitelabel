import { Repository } from 'src/shared/repositories/repository';
import { Category } from '../../domain/entities/category';

export const CATEGORY_REPOSITORY = 'CATEGORY_REPOSITORY';

export interface CategoryRepository extends Repository<Category> {
  loadByIds(ids: string[]): Promise<Category[]>;
  loadAll(): Promise<Category[]>;
}
