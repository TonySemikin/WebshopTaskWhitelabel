import { Module } from '@nestjs/common';
import { CartResolver } from './v1/public/resolvers/cart.resolver';
import { GraphQLRootModule } from 'src/aop/graphql/graphql.module';
import { ApplicationModule } from '../../application/application.module';

@Module({
  imports: [GraphQLRootModule, ApplicationModule],
  providers: [CartResolver],
})
export class GraphQLApiModule {}
