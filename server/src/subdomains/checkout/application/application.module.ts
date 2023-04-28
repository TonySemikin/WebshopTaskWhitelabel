import { Module } from '@nestjs/common';
import { OrderMongoRepository } from '../infrastructure/db/mongo/repositories/order.mongo.repository';
import { ApplicationModule as CartApplicationModule } from 'src/subdomains/cart/application/application.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { ORDER_REPOSITORY } from './repositories/order.repository';
import { CheckoutService } from './services/checkout.service';
import { CHECKOUT_MESSAGE_BROKER } from './messaging/checkout.message-broker';
import { CheckoutInProcessMessageBroker } from '../infrastructure/messaging/checkout-in-process-message-broker.service';

@Module({
  /**
   * @note on CartApplicationModule import
   * in real-life situation Checkout would access Cart by RPC, REST or async messaging call via Shopping API or Infrastructure layer
   */
  imports: [InfrastructureModule, CartApplicationModule],
  controllers: [],
  providers: [
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderMongoRepository,
    },
    {
      provide: CHECKOUT_MESSAGE_BROKER,
      useClass: CheckoutInProcessMessageBroker,
    },
    CheckoutService,
  ],
  exports: [CheckoutService],
})
export class ApplicationModule {}
