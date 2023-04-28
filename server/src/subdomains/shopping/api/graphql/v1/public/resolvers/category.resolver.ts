import { Query, Resolver } from '@nestjs/graphql';
import { ShoppingService } from 'src/subdomains/shopping/application/services/shopping.service';
import { CategorySchema } from '../schemas/category.schema';

@Resolver((of) => CategorySchema)
export class CategoryResolver {
  constructor(private shoppingService: ShoppingService) {}

  @Query((returns) => [CategorySchema])
  async categories() {
    return this.shoppingService.getAllCategories();
  }
}
