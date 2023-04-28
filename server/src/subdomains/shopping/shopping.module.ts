import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [ApiModule, ApplicationModule, InfrastructureModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ShoppingModule {}
