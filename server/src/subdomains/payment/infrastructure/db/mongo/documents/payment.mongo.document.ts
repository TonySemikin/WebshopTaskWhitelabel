import { ObjectId } from 'mongodb';
import { EntityMongoDocument } from 'src/shared/documents/mongo-entity.document';
import { Payment } from 'src/subdomains/payment/domain/entities/payment';
import { PaymentStatus } from 'src/subdomains/payment/domain/enums/payment-status.enum';

export class PaymentMongoDocument extends EntityMongoDocument {
  readonly orderId: string;
  readonly status: PaymentStatus;
  readonly [key: string]: any;

  //*** SERIALIZATION / DESERIALIZATION ***//

  static serialize(entity: Payment): PaymentMongoDocument {
    const { id, created, updated, orderId, status } = entity;

    const document = {
      _id: new ObjectId(id),
      created,
      updated,
      orderId,
      status,
    };

    if (!entity.id) delete document._id;

    return document;
  }

  static deserialize(document: PaymentMongoDocument): Payment {
    const { _id, created, updated, orderId, status } = document;

    return new Payment(_id.toHexString(), created, updated, orderId, status);
  }

  static appendId(document: PaymentMongoDocument, _id: ObjectId): Payment {
    document._id = _id;

    return this.deserialize(document);
  }
}
