import { Module } from '@nestjs/common';
import { OrderResolver } from './v1/public/resolvers/order.resolver';
import { GraphQLRootModule } from 'src/aop/graphql/graphql.module';
import { ApplicationModule } from '../../application/application.module';

@Module({
  imports: [GraphQLRootModule, ApplicationModule],
  providers: [OrderResolver],
})
export class GraphQLApiModule {}
