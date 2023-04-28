import { BaseEvent } from 'src/aop/messaging/events/base.event';

export const CHECKOUT_MESSAGE_BROKER = 'CHECKOUT_MESSAGE_BROKER';

export interface CheckoutMessageBroker {
  emitEvent(event: BaseEvent): void;
  listenToEvent<T>(eventName: string, callback: (data: T) => void): void;
}
