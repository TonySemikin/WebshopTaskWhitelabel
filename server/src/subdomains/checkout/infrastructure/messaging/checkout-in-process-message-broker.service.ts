import { Injectable } from '@nestjs/common';
import { InProcessMessagingService } from 'src/aop/messaging/in-process-messaging.service';
import { CheckoutMessageBroker } from '../../application/messaging/checkout.message-broker';

@Injectable()
export class CheckoutInProcessMessageBroker
  extends InProcessMessagingService
  implements CheckoutMessageBroker {}
