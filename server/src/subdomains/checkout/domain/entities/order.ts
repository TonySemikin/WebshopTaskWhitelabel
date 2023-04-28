import { BadRequestException } from '@nestjs/common';
import { Entity } from 'src/shared/entities/entity';
import { OrderStatus } from '../enums/order-status.enum';
import { Cart } from '../interfaces/cart.interface';
import { OrderItem } from '../values/order-item.value';
import { Address } from '../values/address';

export class Order extends Entity {
  #status: OrderStatus;
  #cartId: string | null;
  #deliveryAddress: Address;
  #items: OrderItem[];
  #total: number;

  constructor(
    id: string,
    created: Date,
    updated: Date,
    status: OrderStatus,
    cartId: string,
    deliveryAddress: Address,
    items: OrderItem[],
    total: number,
  ) {
    super(id, created, updated);

    this.#status = status;
    this.#cartId = cartId;
    this.#deliveryAddress = deliveryAddress;
    this.#items = items;
    this.#total = total;
  }

  //*** PUBLIC API ***//

  proceedToPayment(cart: Cart): this {
    this.#status = OrderStatus.PAYMENT_PENDING;
    this.actualizeOrderItems(cart);

    return this;
  }

  paymentSucceeded(): this {
    this.#status = OrderStatus.COMPLETE;
    this.unbindCart();

    return this;
  }

  //*** PRIVATE RULES ***//

  private actualizeOrderItems(cart: Cart): void {
    this.#items = cart.items.map((i) => OrderItem.create(i));
    this.#total = cart.total;
  }

  private unbindCart(): void {
    this.#cartId = null;
  }

  //*** GETTERS ***//

  get status(): OrderStatus {
    return this.#status;
  }

  get cartId(): string | null {
    return this.#cartId;
  }

  get deliveryAddress(): Address {
    return this.#deliveryAddress;
  }

  get items(): OrderItem[] {
    return this.#items;
  }

  get total(): number {
    return this.#total;
  }
}
