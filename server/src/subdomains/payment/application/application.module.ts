import { Module } from '@nestjs/common';
import { PaymentMongoRepository } from '../infrastructure/db/mongo/repositories/payment.mongo.repository';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { PaymentInProcessMessageBroker } from '../infrastructure/messaging/payment-in-process-message-broker.service';
import { PAYMENT_MESSAGE_BROKER } from './messaging/payment.message-broker';
import { PAYMENT_REPOSITORY } from './repositories/payment.repository';
import { PaymentService } from './services/payment.service';

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: PAYMENT_REPOSITORY,
      useClass: PaymentMongoRepository,
    },
    {
      provide: PAYMENT_MESSAGE_BROKER,
      useClass: PaymentInProcessMessageBroker,
    },
    PaymentService,
  ],
  exports: [PaymentService],
})
export class ApplicationModule {}
