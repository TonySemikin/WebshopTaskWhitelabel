import { Injectable, Inject } from '@nestjs/common';
import { Db, Collection } from 'mongodb';

@Injectable()
export class MongoService {
  constructor(@Inject('MONGO_DB_CONNECTION') private db: Db) {}

  getCollection<T>(collectionName: string): Collection<T> {
    return this.db.collection(collectionName);
  }
}
