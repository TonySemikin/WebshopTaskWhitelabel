import { Module } from '@nestjs/common';
import { MongoDbModule } from 'src/aop/db/mongo/mongo-db.module';
import { MessagingRootModule } from 'src/aop/messaging/messaging.module';
import { OrderMongoRepository } from './db/mongo/repositories/order.mongo.repository';

@Module({
  imports: [MongoDbModule, MessagingRootModule],
  controllers: [],
  providers: [OrderMongoRepository],
  exports: [MongoDbModule, OrderMongoRepository],
})
export class InfrastructureModule {}
