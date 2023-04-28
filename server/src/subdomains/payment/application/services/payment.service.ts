import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Utils } from 'src/shared/utils/utils';
import { PaymentCreateCommand } from '../../domain/commands/payment-create.command';
import { Payment } from '../../domain/entities/payment';
import { PaymentSucceededEvent } from '../../domain/events/payment-succeeded.event';
import { ICreatePaymentDto } from '../dto/create-payment.dto';
import { PaymentFactory } from '../factories/payment.factory';
import {
  PaymentMessageBroker,
  PAYMENT_MESSAGE_BROKER,
} from '../messaging/payment.message-broker';
import {
  PaymentRepository,
  PAYMENT_REPOSITORY,
} from '../repositories/payment.repository';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_REPOSITORY) private paymentRepository: PaymentRepository,
    @Inject(PAYMENT_MESSAGE_BROKER)
    private paymentMessageBroker: PaymentMessageBroker,
  ) {
    this.subscribeToEvents();
  }

  //*** PUBLIC API ***//

  async getPaymentById(paymentId: string): Promise<Payment> {
    const user = await this.paymentRepository.loadById(paymentId);
    if (!user) throw new NotFoundException('Payment not found');

    return user;
  }

  //*** MESSAGING API ***//

  private subscribeToEvents() {
    this.paymentMessageBroker.listenToEvent(
      PaymentCreateCommand._name,
      this.createPayment.bind(this),
    );
  }

  private async createPayment(dto: ICreatePaymentDto): Promise<void> {
    const newPayment = PaymentFactory.create(dto);
    const savedPayment = await this.paymentRepository.save(newPayment);
    /**
     * @note mimicking event processing delay
     */
    await Utils.delay(10000);
    await this.confirmPayment(savedPayment);
  }

  private async confirmPayment(payment: Payment): Promise<void> {
    this.paymentMessageBroker.emitEvent(
      new PaymentSucceededEvent(payment.orderId),
    );

    payment.paymentSucceeded();

    await this.paymentRepository.save(payment);
  }
}
