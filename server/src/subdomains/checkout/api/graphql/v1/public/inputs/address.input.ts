import { InputType, Field, Int } from '@nestjs/graphql';
import { IAddressDto } from 'src/subdomains/checkout/application/dto/address.dto';

@InputType()
export class AddressInput implements IAddressDto {
  @Field()
  shortDescription: string;
}
