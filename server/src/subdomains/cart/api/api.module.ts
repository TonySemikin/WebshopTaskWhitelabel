import { Module } from '@nestjs/common';
import { GraphQLApiModule } from './graphql/graphql.module';

@Module({
  imports: [GraphQLApiModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
