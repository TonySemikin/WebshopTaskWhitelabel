import { Module } from '@nestjs/common';
import { ApplicationModule } from '../../application/application.module';
import { ImsController } from './v1/ims/controllers/ims.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [ImsController],
  providers: [],
})
export class RestApiModule {}
