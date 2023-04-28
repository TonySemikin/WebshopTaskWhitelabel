import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { configuration } from 'src/aop/config/configuration';
import { ApplicationModule } from 'src/subdomains/cart/application/application.module';

const { API_BASE_URL, API_VERSION } = configuration;

@Module({
  imports: [
    ApplicationModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: configuration.GRAPHQL_PLAYGROUND,
      path: `${API_BASE_URL}/${API_VERSION}/graphql`,
      autoSchemaFile: true,
    }),
  ],
})
export class GraphQLRootModule {}
