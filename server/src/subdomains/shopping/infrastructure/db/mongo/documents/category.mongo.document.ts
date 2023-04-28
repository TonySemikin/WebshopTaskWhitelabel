import { ObjectId } from 'mongodb';
import { EntityMongoDocument } from 'src/shared/documents/mongo-entity.document';
import { Category } from 'src/subdomains/shopping/domain/entities/category';

export class CategoryMongoDocument extends EntityMongoDocument {
  readonly name: string;
  readonly description: string;
  readonly [key: string]: any;

  //*** SERIALIZATION / DESERIALIZATION ***//

  static serialize(entity: Category): CategoryMongoDocument {
    const { id, created, updated, name, description } = entity;

    const document = {
      _id: new ObjectId(id),
      created,
      updated,
      name,
      description,
    };

    if (!entity.id) delete document._id;

    return document;
  }

  static deserialize(document: CategoryMongoDocument): Category {
    const { _id, created, updated, name, description } = document;

    return new Category(_id.toHexString(), created, updated, name, description);
  }

  static appendId(document: CategoryMongoDocument, _id: ObjectId): Category {
    document._id = _id;

    return this.deserialize(document);
  }
}
