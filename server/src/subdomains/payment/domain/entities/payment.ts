import { Entity } from 'src/shared/entities/entity';
import { PaymentStatus } from '../enums/payment-status.enum';

export class Payment extends Entity {
  #orderId: string;
  #status: PaymentStatus;

  constructor(
    id: string,
    created: Date,
    updated: Date,
    orderId: string,
    status: PaymentStatus,
  ) {
    super(id, created, updated);

    this.#orderId = orderId;
    this.#status = status;
  }

  //*** PUBLIC API ***//

  paymentSucceeded(): this {
    this.#status = PaymentStatus.SUCCESS;

    return this;
  }

  paymentPending(): this {
    this.#status = PaymentStatus.PENDING;

    return this;
  }

  paymentFailed(): this {
    this.#status = PaymentStatus.FAIL;

    return this;
  }

  //*** GETTERS ***//

  get orderId(): string {
    return this.#orderId;
  }

  get status(): PaymentStatus {
    return this.#status;
  }
}
