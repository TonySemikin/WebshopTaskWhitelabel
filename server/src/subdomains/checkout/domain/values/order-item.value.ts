import { CartItem } from '../interfaces/cart-item.interface';

export class OrderItem {
  #productId: string;
  #productName: string;
  #quantity: number;
  #total: number;

  constructor(
    productId: string,
    productName: string,
    quantity: number,
    total: number,
  ) {
    this.#productId = productId;
    this.#productName = productName;
    this.#quantity = quantity;
    this.#total = total;
  }

  //*** FACTORY METHODS ***//

  static create(cartItemRepresentation: CartItem): OrderItem {
    const { productId, productName, quantity, total } = cartItemRepresentation;

    return new OrderItem(productId, productName, quantity, total);
  }

  //*** GETTERS ***//

  get productId(): string {
    return this.#productId;
  }

  get productName(): string {
    return this.#productName;
  }

  get quantity(): number {
    return this.#quantity;
  }

  get total(): number {
    return this.#total;
  }
}
