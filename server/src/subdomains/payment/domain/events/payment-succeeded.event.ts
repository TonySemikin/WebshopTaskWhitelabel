import { BaseEvent } from 'src/aop/messaging/events/base.event';

export class PaymentSucceededEvent extends BaseEvent {
  static readonly _name = 'payment.succeeded.event';

  constructor(orderId: string) {
    super(PaymentSucceededEvent._name, { orderId });
  }
}
