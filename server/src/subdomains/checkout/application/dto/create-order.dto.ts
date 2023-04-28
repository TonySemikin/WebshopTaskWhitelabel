import { IAddressDto } from './address.dto';

export interface ICreateOrderDto {
  cartId: string;
  address: IAddressDto;
}
