import { ObjectId } from 'mongodb';
import { EntityMongoDocument } from 'src/shared/documents/mongo-entity.document';
import { Order } from 'src/subdomains/checkout/domain/entities/order';
import { OrderStatus } from 'src/subdomains/checkout/domain/enums/order-status.enum';
import { Address } from 'src/subdomains/checkout/domain/values/address';
import { OrderItem } from 'src/subdomains/checkout/domain/values/order-item.value';

export class OrderMongoDocument extends EntityMongoDocument {
  status: OrderStatus;
  cartId: string | null;
  deliveryAddress: AddressMongoDocument;
  items: OrderItemMongoDocument[];
  total: number;
  readonly [key: string]: any;

  //*** SERIALIZATION / DESERIALIZATION ***//

  static serialize(entity: Order): OrderMongoDocument {
    const {
      id,
      created,
      updated,
      status,
      cartId,
      deliveryAddress,
      items,
      total,
    } = entity;

    const document = {
      _id: new ObjectId(id),
      created,
      updated,
      status,
      cartId,
      deliveryAddress: AddressMongoDocument.serialize(deliveryAddress),
      items: items.map((i) => OrderItemMongoDocument.serialize(i)),
      total,
    };

    if (!entity.id) delete document._id;

    return document;
  }

  static deserialize(document: OrderMongoDocument): Order {
    const {
      _id,
      created,
      updated,
      status,
      cartId,
      deliveryAddress,
      items,
      total,
    } = document;

    return new Order(
      _id.toHexString(),
      created,
      updated,
      status,
      cartId,
      AddressMongoDocument.deserialize(deliveryAddress),
      items.map((i) => OrderItemMongoDocument.deserialize(i)),
      total,
    );
  }

  static appendId(document: OrderMongoDocument, _id: ObjectId): Order {
    document._id = _id;

    return this.deserialize(document);
  }
}

class OrderItemMongoDocument {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly total: number;

  //*** SERIALIZATION / DESERIALIZATION ***//

  static serialize(value: OrderItem): OrderItemMongoDocument {
    const { productId, productName, quantity, total } = value;

    return {
      productId,
      productName,
      quantity,
      total,
    };
  }

  static deserialize(document: OrderItemMongoDocument): OrderItem {
    const { productId, productName, quantity, total } = document;

    return new OrderItem(productId, productName, quantity, total);
  }
}

class AddressMongoDocument {
  readonly shortDescription: string;

  //*** SERIALIZATION / DESERIALIZATION ***//

  static serialize(value: Address): AddressMongoDocument {
    const { shortDescription } = value;

    return {
      shortDescription,
    };
  }

  static deserialize(document: AddressMongoDocument): Address {
    const { shortDescription } = document;

    return new Address(shortDescription);
  }
}
