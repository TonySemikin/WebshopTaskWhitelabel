import { Order } from '../../domain/entities/order';
import { OrderStatus } from '../../domain/enums/order-status.enum';
import { CartItem } from '../../domain/interfaces/cart-item.interface';
import { Cart } from '../../domain/interfaces/cart.interface';
import { Address } from '../../domain/values/address';
import { OrderItem } from '../../domain/values/order-item.value';
import { IAddressDto } from '../dto/address.dto';

export class OrderFactory {
  static create(cartRepresentation: Cart, deliveryAddress: Address): Order {
    const { id, items, total } = cartRepresentation;
    return new Order(
      null,
      new Date(),
      new Date(),
      OrderStatus.CREATED,
      id,
      deliveryAddress,
      items.map((i) => this.createItem(i)),
      total,
    );
  }

  static createAddress(address: IAddressDto): Address {
    const { shortDescription } = address;

    return new Address(shortDescription);
  }

  private static createItem(cartItemRepresentation: CartItem): OrderItem {
    const { productId, productName, quantity, total } = cartItemRepresentation;

    return new OrderItem(productId, productName, quantity, total);
  }
}
