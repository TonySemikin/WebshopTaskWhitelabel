import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { MongoService } from 'src/aop/db/mongo/mongo.service';
import { UserRepository } from 'src/subdomains/user/application/repositories/user.repository';
import { User } from 'src/subdomains/user/domain/entities/user';
import { UserMongoDocument } from '../documents/user.mongo.document';

@Injectable()
export class UserMongoRepository implements UserRepository {
  private collection: Collection<UserMongoDocument>;

  constructor(dbService: MongoService) {
    this.collection = dbService.getCollection<UserMongoDocument>('user');
  }

  async save(entity: User): Promise<User> {
    const document = UserMongoDocument.serialize(entity);

    const { upsertedId } = await this.collection.updateOne(
      document._id ? { _id: document._id } : { ...document },
      { $set: document },
      { upsert: true },
    );

    return UserMongoDocument.appendId(document, document._id ?? upsertedId);
  }

  async loadById(_id: string): Promise<User> {
    const document = await this.collection.findOne({ _id: new ObjectId(_id) });

    if (!document) {
      return null;
    }

    return UserMongoDocument.deserialize(document);
  }
}
