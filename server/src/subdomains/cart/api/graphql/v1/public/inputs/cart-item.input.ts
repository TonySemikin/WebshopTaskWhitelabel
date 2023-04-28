import { InputType, Field, Int } from '@nestjs/graphql';
import { ICartItemDto } from 'src/subdomains/cart/application/dto/cart-item.dto';

@InputType()
export class CartItemInput implements ICartItemDto {
  @Field()
  productId: string;

  @Field((type) => Int)
  quantity: number;
}
