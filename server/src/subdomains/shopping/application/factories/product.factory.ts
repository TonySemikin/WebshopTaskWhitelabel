import { Product } from '../../domain/entities/product';
import { ICreateProductDto } from '../dto/create-product.dto';

export class ProductFactory {
  static create(
    { name, description, price, stock }: ICreateProductDto,
    categoriesIds: string[],
  ): Product {
    return new Product(
      null,
      new Date(),
      new Date(),
      name,
      description,
      categoriesIds,
      price,
      stock,
    );
  }
}
