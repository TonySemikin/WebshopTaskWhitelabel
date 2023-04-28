import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { MongoService } from 'src/aop/db/mongo/mongo.service';
import { OrderRepository } from 'src/subdomains/checkout/application/repositories/order.repository';
import { Order } from 'src/subdomains/checkout/domain/entities/order';
import { OrderMongoDocument } from '../documents/order.mongo.document';

@Injectable()
export class OrderMongoRepository implements OrderRepository {
  private collection: Collection<OrderMongoDocument>;

  constructor(dbService: MongoService) {
    this.collection = dbService.getCollection<OrderMongoDocument>('order');
  }

  async save(entity: Order): Promise<Order> {
    const document = OrderMongoDocument.serialize(entity);

    const { upsertedId } = await this.collection.updateOne(
      document._id ? { _id: document._id } : { ...document },
      { $set: document },
      { upsert: true },
    );

    return OrderMongoDocument.appendId(document, document._id ?? upsertedId);
  }

  async loadById(_id: string): Promise<Order> {
    const document = await this.collection.findOne({ _id: new ObjectId(_id) });

    if (!document) {
      return null;
    }

    return OrderMongoDocument.deserialize(document);
  }
}
