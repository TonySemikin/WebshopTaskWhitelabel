import { ObjectId } from 'mongodb';
import { EntityMongoDocument } from 'src/shared/documents/mongo-entity.document';
import { Cart } from 'src/subdomains/cart/domain/entities/cart';
import { CartItem } from 'src/subdomains/cart/domain/values/cart-item';

export class CartMongoDocument extends EntityMongoDocument {
  readonly userId: string;
  readonly items: CartItemMongoDocument[];
  readonly total: number;
  readonly [key: string]: any;

  //*** SERIALIZATION / DESERIALIZATION ***//

  static serialize(entity: Cart): CartMongoDocument {
    const { id, created, updated, userId, items, total } = entity;

    const document = {
      _id: new ObjectId(id),
      created,
      updated,
      userId,
      items: items.map((i) => CartItemMongoDocument.serialize(i)),
      total,
    };

    if (!entity.id) delete document._id;

    return document;
  }

  static deserialize(document: CartMongoDocument): Cart {
    const { _id, created, updated, userId, items, total } = document;

    return new Cart(
      _id.toHexString(),
      created,
      updated,
      userId,
      items.map((i) => CartItemMongoDocument.deserialize(i)),
      total,
    );
  }

  static appendId(document: CartMongoDocument, _id: ObjectId): Cart {
    document._id = _id;

    return this.deserialize(document);
  }
}

class CartItemMongoDocument {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly total: number;

  //*** SERIALIZATION / DESERIALIZATION ***//

  static serialize(value: CartItem): CartItemMongoDocument {
    const { productId, productName, quantity, total } = value;

    return {
      productId,
      productName,
      quantity,
      total,
    };
  }

  static deserialize(document: CartItemMongoDocument): CartItem {
    const { productId, productName, quantity, total } = document;

    return new CartItem(productId, productName, quantity, total);
  }
}
