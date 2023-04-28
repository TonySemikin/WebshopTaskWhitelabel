import { Repository } from 'src/shared/repositories/repository';
import { Payment } from '../../domain/entities/payment';

export const PAYMENT_REPOSITORY = 'PAYMENT_REPOSITORY';

export interface PaymentRepository extends Repository<Payment> {}
