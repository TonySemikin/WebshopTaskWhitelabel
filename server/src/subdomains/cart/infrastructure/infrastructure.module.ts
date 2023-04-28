import { Module } from '@nestjs/common';
import { MongoDbModule } from 'src/aop/db/mongo/mongo-db.module';
import { CartMongoRepository } from './db/mongo/repositories/cart.mongo.repository';

@Module({
  imports: [MongoDbModule],
  controllers: [],
  providers: [CartMongoRepository],
  exports: [MongoDbModule, CartMongoRepository],
})
export class InfrastructureModule {}
