import { Payment } from '../../domain/entities/payment';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';
import { ICreatePaymentDto } from '../dto/create-payment.dto';

export class PaymentFactory {
  static create({ orderId }: ICreatePaymentDto): Payment {
    return new Payment(
      null,
      new Date(),
      new Date(),
      orderId,
      PaymentStatus.PENDING,
    );
  }
}
