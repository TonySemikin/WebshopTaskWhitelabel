import { Module } from '@nestjs/common';
import { MongoDbModule } from 'src/aop/db/mongo/mongo-db.module';
import { MessagingRootModule } from 'src/aop/messaging/messaging.module';
import { PaymentMongoRepository } from './db/mongo/repositories/payment.mongo.repository';

@Module({
  imports: [MongoDbModule, MessagingRootModule],
  controllers: [],
  providers: [PaymentMongoRepository],
  exports: [MongoDbModule, PaymentMongoRepository],
})
export class InfrastructureModule {}
