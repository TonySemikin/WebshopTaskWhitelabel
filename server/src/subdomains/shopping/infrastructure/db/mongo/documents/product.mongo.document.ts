import { ObjectId } from 'mongodb';
import { EntityMongoDocument } from 'src/shared/documents/mongo-entity.document';
import { Product } from 'src/subdomains/shopping/domain/entities/product';

export class ProductMongoDocument extends EntityMongoDocument {
  readonly name: string;
  readonly description: string;
  readonly categoriesIds: string[];
  readonly price: number;
  readonly stock: number;
  readonly [key: string]: any;

  //*** SERIALIZATION / DESERIALIZATION ***//

  static serialize(entity: Product): ProductMongoDocument {
    const {
      id,
      created,
      updated,
      name,
      description,
      categoriesIds,
      price,
      stock,
    } = entity;

    const document = {
      _id: new ObjectId(id),
      created,
      updated,
      name,
      description,
      categoriesIds,
      price,
      stock,
    };

    if (!entity.id) delete document._id;

    return document;
  }

  static deserialize(document: ProductMongoDocument): Product {
    const {
      _id,
      created,
      updated,
      name,
      description,
      categoriesIds,
      price,
      stock,
    } = document;

    return new Product(
      _id.toHexString(),
      created,
      updated,
      name,
      description,
      categoriesIds,
      price,
      stock,
    );
  }

  static appendId(document: ProductMongoDocument, _id: ObjectId): Product {
    document._id = _id;

    return this.deserialize(document);
  }
}
