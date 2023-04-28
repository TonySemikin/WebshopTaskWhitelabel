import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { MongoService } from 'src/aop/db/mongo/mongo.service';
import { PaymentRepository } from 'src/subdomains/payment/application/repositories/payment.repository';
import { Payment } from 'src/subdomains/payment/domain/entities/payment';
import { PaymentMongoDocument } from '../documents/payment.mongo.document';

@Injectable()
export class PaymentMongoRepository implements PaymentRepository {
  private collection: Collection<PaymentMongoDocument>;

  constructor(dbService: MongoService) {
    this.collection = dbService.getCollection<PaymentMongoDocument>('payment');
  }

  async save(entity: Payment): Promise<Payment> {
    const document = PaymentMongoDocument.serialize(entity);

    const { upsertedId } = await this.collection.updateOne(
      document._id ? { _id: document._id } : { ...document },
      { $set: document },
      { upsert: true },
    );

    return PaymentMongoDocument.appendId(document, document._id ?? upsertedId);
  }

  async loadById(_id: string): Promise<Payment> {
    const document = await this.collection.findOne({ _id: new ObjectId(_id) });

    if (!document) {
      return null;
    }

    return PaymentMongoDocument.deserialize(document);
  }
}
