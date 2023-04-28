import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductSchema } from './product.schema';

@ObjectType()
export class ProductsSchema {
  @Field((type) => [ProductSchema])
  products: ProductSchema[];

  @Field((type) => Int)
  totalCount: number;
}
