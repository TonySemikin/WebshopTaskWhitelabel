import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { MongoService } from 'src/aop/db/mongo/mongo.service';
import { CategoryRepository } from 'src/subdomains/shopping/application/repositories/category.repository';
import { Category } from 'src/subdomains/shopping/domain/entities/category';
import { CategoryMongoDocument } from '../documents/category.mongo.document';

@Injectable()
export class CategoryMongoRepository implements CategoryRepository {
  private collection: Collection<CategoryMongoDocument>;

  constructor(dbService: MongoService) {
    this.collection =
      dbService.getCollection<CategoryMongoDocument>('category');
  }

  async save(entity: Category): Promise<Category> {
    const document = CategoryMongoDocument.serialize(entity);

    const { upsertedId } = await this.collection.updateOne(
      document._id ? { _id: document._id } : { ...document },
      { $set: document },
      { upsert: true },
    );

    return CategoryMongoDocument.appendId(document, document._id ?? upsertedId);
  }

  async loadById(_id: string): Promise<Category> {
    const document = await this.collection.findOne({ _id: new ObjectId(_id) });

    if (!document) {
      return null;
    }

    return CategoryMongoDocument.deserialize(document);
  }

  async loadByIds(ids: string[]): Promise<Category[]> {
    const categories = await this.collection
      .find({ _id: { $in: ids.map((id) => new ObjectId(id)) } })
      .toArray();

    return categories.map((c) => CategoryMongoDocument.deserialize(c));
  }

  async loadAll(): Promise<Category[]> {
    const documents = await this.collection.find().toArray();

    return documents.map((document) =>
      CategoryMongoDocument.deserialize(document),
    );
  }
}
