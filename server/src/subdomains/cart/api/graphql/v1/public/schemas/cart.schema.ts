import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CartSchema {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field((type) => [CartItemSchema])
  items: CartItemSchema[];

  @Field((type) => Float)
  total: number;
}

@ObjectType()
export class CartItemSchema {
  @Field()
  productId: string;

  @Field()
  productName: string;

  @Field((type) => Int)
  quantity: number;

  @Field((type) => Float)
  total: number;
}
