import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { CategorySchema } from './category.schema';

@ObjectType()
export class ProductSchema {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field((type) => [CategorySchema])
  categories: CategorySchema[];

  @Field((type) => Float)
  price: number;

  @Field((type) => Int)
  stock: number;
}
