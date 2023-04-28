import { Module } from '@nestjs/common';
import { MongoDbModule } from 'src/aop/db/mongo/mongo-db.module';
import { CategoryMongoRepository } from './db/mongo/repositories/category.mongo.repository';
import { ProductMongoRepository } from './db/mongo/repositories/product.mongo.repository';

@Module({
  imports: [MongoDbModule],
  controllers: [],
  providers: [ProductMongoRepository, CategoryMongoRepository],
  exports: [MongoDbModule, ProductMongoRepository, CategoryMongoRepository],
})
export class InfrastructureModule {}
