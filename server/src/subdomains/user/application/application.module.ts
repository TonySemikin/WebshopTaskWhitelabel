import { Module } from '@nestjs/common';
import { UserMongoRepository } from '../infrastructure/db/mongo/repositories/user.mongo.repository';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { USER_REPOSITORY } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserMongoRepository,
    },
    UserService,
  ],
  exports: [UserService],
})
export class ApplicationModule {}
