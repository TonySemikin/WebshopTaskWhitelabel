import * as mongodb from 'mongodb';
import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { configuration } from 'src/aop/config/configuration';

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_AUTHSOURCE,
  DB_CONNECTION_TIMEOUT,
} = configuration;
const url = `${DB_HOST}:${DB_PORT}`;

const databaseProviders = [
  {
    provide: 'MONGO_DB_CONNECTION',
    useFactory: async (): Promise<mongodb.Db> => {
      try {
        const client = await mongodb.MongoClient.connect(url, {
          serverSelectionTimeoutMS: DB_CONNECTION_TIMEOUT,
          auth: {
            username: DB_USERNAME,
            password: DB_PASSWORD,
          },
          authSource: DB_AUTHSOURCE,
        });
        return client.db(DB_NAME);
      } catch (error) {
        throw error;
      }
    },
  },
];

@Module({
  imports: [],
  controllers: [],
  providers: [...databaseProviders, MongoService],
  exports: [...databaseProviders, MongoService],
})
export class MongoDbModule {}
