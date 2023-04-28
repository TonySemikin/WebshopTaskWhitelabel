import { BaseEvent } from 'src/aop/messaging/events/base.event';

export const PAYMENT_MESSAGE_BROKER = 'PAYMENT_MESSAGE_BROKER';

export interface PaymentMessageBroker {
  emitEvent(event: BaseEvent): void;
  listenToEvent(eventName: string, callback: (data: any) => void): void;
}
