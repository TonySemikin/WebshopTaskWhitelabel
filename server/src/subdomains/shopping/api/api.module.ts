import { Module } from '@nestjs/common';
import { GraphQLApiModule } from './graphql/graphql.module';
import { RestApiModule } from './rest/rest.module';

@Module({
  imports: [GraphQLApiModule, RestApiModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
