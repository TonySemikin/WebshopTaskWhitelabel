import { Module } from '@nestjs/common';
import { ProductResolver } from './v1/public/resolvers/product.resolver';
import { CategoryResolver } from './v1/public/resolvers/category.resolver';
import { GraphQLRootModule } from 'src/aop/graphql/graphql.module';
import { ApplicationModule } from '../../application/application.module';

@Module({
  imports: [GraphQLRootModule, ApplicationModule],
  providers: [ProductResolver, CategoryResolver],
})
export class GraphQLApiModule {}
