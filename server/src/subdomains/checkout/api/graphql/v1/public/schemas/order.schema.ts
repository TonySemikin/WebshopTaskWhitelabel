import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from 'src/subdomains/checkout/domain/enums/order-status.enum';

@ObjectType()
export class AddressSchema {
  @Field()
  shortDescription: string;
}

@ObjectType()
export class OrderItemSchema {
  @Field()
  productId: string;

  @Field()
  productName: string;

  @Field((type) => Int)
  quantity: number;

  @Field((type) => Float)
  total: number;
}

@ObjectType()
export class OrderSchema {
  @Field()
  id: string;

  @Field()
  status: OrderStatus;

  @Field({ nullable: true })
  cartId: string | null;

  @Field((type) => AddressSchema)
  deliveryAddress: AddressSchema;

  @Field((type) => [OrderItemSchema])
  items: OrderItemSchema[];

  @Field((type) => Float)
  total: number;
}
