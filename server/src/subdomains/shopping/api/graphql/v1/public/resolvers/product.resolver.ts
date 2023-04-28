import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ShoppingService } from 'src/subdomains/shopping/application/services/shopping.service';
import { Product } from 'src/subdomains/shopping/domain/entities/product';
import { ProductsByCategoryFilter } from '../filters/products-by-category.filter';
import { ProductSchema } from '../schemas/product.schema';
import { ProductsSchema } from '../schemas/products.schema';

@Resolver((of) => ProductSchema)
export class ProductResolver {
  constructor(private shoppingService: ShoppingService) {}

  @Query((returns) => ProductSchema)
  async product(@Args('id', { type: () => String }) id: string) {
    return this.shoppingService.getProductById(id);
  }

  @Query((returns) => ProductsSchema)
  async productsByCategory(
    @Args('filter', { type: () => ProductsByCategoryFilter })
    filter: ProductsByCategoryFilter,
  ) {
    return this.shoppingService.getProductsByQuery(filter);
  }

  @ResolveField()
  async categories(@Parent() product: Product) {
    const { categoriesIds } = product;

    return this.shoppingService.getCategoriesByIds(categoriesIds);
  }
}
