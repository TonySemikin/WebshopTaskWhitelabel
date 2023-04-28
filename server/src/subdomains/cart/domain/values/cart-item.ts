import { Utils } from 'src/shared/utils/utils';
import { Product } from '../interfaces/product.interface';

export class CartItem {
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

  //*** PUBLIC API ***//

  /**
   * @param product - most recent Product representation, since the price might have changed
   */
  setProductQuantity(quantity: number, product: Product): this {
    this.#quantity = quantity;

    this.updateTotal(product);

    return this;
  }

  //*** PRIVATE RULES ***//

  private updateTotal(product: Product): this {
    this.#total = this.calculateItemTotal(this.#quantity, product.price);

    return this;
  }

  private calculateItemTotal(quantity: number, price: number): number {
    return Utils.round(quantity * price, 2);
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
