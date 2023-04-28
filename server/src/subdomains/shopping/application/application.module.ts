import { Module } from '@nestjs/common';
import { CategoryMongoRepository } from '../infrastructure/db/mongo/repositories/category.mongo.repository';
import { ProductMongoRepository } from '../infrastructure/db/mongo/repositories/product.mongo.repository';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CATEGORY_REPOSITORY } from './repositories/category.repository';
import { PRODUCT_REPOSITORY } from './repositories/product.repository';
import { ImsService } from './services/ims.service';
import { ShoppingService } from './services/shopping.service';

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductMongoRepository,
    },
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryMongoRepository,
    },
    ShoppingService,
    ImsService,
  ],
  exports: [ShoppingService, ImsService],
})
export class ApplicationModule {}
