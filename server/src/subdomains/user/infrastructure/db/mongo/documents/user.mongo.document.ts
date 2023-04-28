import { ObjectId } from 'mongodb';
import { EntityMongoDocument } from 'src/shared/documents/mongo-entity.document';
import { User } from 'src/subdomains/user/domain/entities/user';

export class UserMongoDocument extends EntityMongoDocument {
  readonly username: string;
  readonly [key: string]: any;

  //*** SERIALIZATION / DESERIALIZATION ***//

  static serialize(entity: User): UserMongoDocument {
    const { id, created, updated, username } = entity;

    const document = {
      _id: new ObjectId(id),
      created,
      updated,
      username,
    };

    if (!entity.id) delete document._id;

    return document;
  }

  static deserialize(document: UserMongoDocument): User {
    const { _id, created, updated, username } = document;

    return new User(_id.toHexString(), created, updated, username);
  }

  static appendId(document: UserMongoDocument, _id: ObjectId): User {
    document._id = _id;

    return this.deserialize(document);
  }
}
