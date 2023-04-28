import { Module } from '@nestjs/common';
import { ApplicationModule as ShoppingApplicationModule } from 'src/subdomains/shopping/application/application.module';
import { CartMongoRepository } from '../infrastructure/db/mongo/repositories/cart.mongo.repository';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CART_REPOSITORY } from './repositories/cart.repository';
import { CartService } from './services/cart.service';

@Module({
  /**
   * @note on ShoppingApplicationModule import
   * in real-life situation Cart would access Shopping by RPC, REST or async messaging call via Shopping API or Infrastructure layer
   */
  imports: [InfrastructureModule, ShoppingApplicationModule],
  controllers: [],
  providers: [
    {
      provide: CART_REPOSITORY,
      useClass: CartMongoRepository,
    },
    CartService,
  ],
  exports: [CartService],
})
export class ApplicationModule {}
