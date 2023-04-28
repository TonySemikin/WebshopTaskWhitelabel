import { Injectable } from '@nestjs/common';
import { InProcessMessagingService } from 'src/aop/messaging/in-process-messaging.service';
import { PaymentMessageBroker } from '../../application/messaging/payment.message-broker';

@Injectable()
export class PaymentInProcessMessageBroker
  extends InProcessMessagingService
  implements PaymentMessageBroker {}
