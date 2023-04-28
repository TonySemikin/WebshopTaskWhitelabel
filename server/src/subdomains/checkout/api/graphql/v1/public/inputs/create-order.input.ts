import { InputType, Field } from '@nestjs/graphql';
import { ICreateOrderDto } from 'src/subdomains/checkout/application/dto/create-order.dto';
import { AddressInput } from './address.input';

@InputType()
export class CreateOrderInput implements ICreateOrderDto {
  @Field()
  cartId: string;

  @Field((type) => AddressInput)
  address: AddressInput;
}
