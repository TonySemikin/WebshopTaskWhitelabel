import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { MongoService } from 'src/aop/db/mongo/mongo.service';
import { CartRepository } from 'src/subdomains/cart/application/repositories/cart.repository';
import { Cart } from 'src/subdomains/cart/domain/entities/cart';
import { CartMongoDocument } from '../documents/cart.mongo.document';

@Injectable()
export class CartMongoRepository implements CartRepository {
  private collection: Collection<CartMongoDocument>;

  constructor(dbService: MongoService) {
    this.collection = dbService.getCollection<CartMongoDocument>('cart');
  }

  async save(entity: Cart): Promise<Cart> {
    const document = CartMongoDocument.serialize(entity);

    const { upsertedId } = await this.collection.updateOne(
      document._id ? { _id: document._id } : { ...document },
      { $set: document },
      { upsert: true },
    );

    return CartMongoDocument.appendId(document, document._id ?? upsertedId);
  }

  async loadById(_id: string): Promise<Cart> {
    const document = await this.collection.findOne({ _id: new ObjectId(_id) });

    if (!document) {
      return null;
    }

    return CartMongoDocument.deserialize(document);
  }
}
