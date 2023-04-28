import { ObjectId } from 'mongodb';

export class EntityMongoDocument {
  _id?: ObjectId;
  readonly created: Date;
  readonly updated: Date;
}
