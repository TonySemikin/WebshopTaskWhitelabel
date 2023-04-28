import { Field, InputType, Int } from '@nestjs/graphql';
import { IProductsQuery } from 'src/subdomains/shopping/application/dto/products.query';

@InputType()
export class ProductsByCategoryFilter implements IProductsQuery {
  @Field()
  categoryId: string;

  @Field((type) => Int)
  from: number;

  @Field((type) => Int)
  to: number;
}
