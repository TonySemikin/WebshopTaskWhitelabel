import { BaseEvent } from 'src/aop/messaging/events/base.event';

export class PaymentCreateCommand extends BaseEvent {
  static readonly _name = 'payment.create.command';

  constructor(orderId: string) {
    super(PaymentCreateCommand._name, { orderId });
  }
}
