import { Module } from '@nestjs/common';
import { GraphQLRootModule } from 'src/aop/graphql/graphql.module';
import { ApplicationModule } from '../../application/application.module';
import { UserResolver } from './v1/public/resolvers/user.resolver';

@Module({
  imports: [GraphQLRootModule, ApplicationModule],
  providers: [UserResolver],
})
export class GraphQLApiModule {}
