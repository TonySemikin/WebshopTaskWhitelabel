import { Module } from '@nestjs/common';
import { MongoDbModule } from 'src/aop/db/mongo/mongo-db.module';
import { UserMongoRepository } from './db/mongo/repositories/user.mongo.repository';

@Module({
  imports: [MongoDbModule],
  controllers: [],
  providers: [UserMongoRepository],
  exports: [MongoDbModule, UserMongoRepository],
})
export class InfrastructureModule {}
