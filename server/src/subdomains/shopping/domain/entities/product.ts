import { Entity } from 'src/shared/entities/entity';
import { Category } from './category';

export class Product extends Entity {
  #name: string;
  #description: string;
  #categoriesIds: string[];
  #price: number;
  #stock: number;

  constructor(
    id: string,
    created: Date,
    updated: Date,
    name: string,
    description: string,
    categoriesIds: string[],
    price: number,
    stock: number,
  ) {
    super(id, created, updated);

    this.#name = name;
    this.#description = description;
    this.#categoriesIds = categoriesIds;
    this.#price = price;
    this.#stock = stock;
  }

  //*** PUBLIC API ***//

  updateNameAndDescription(name: string, description: string): this {
    this.#name = name;
    this.#description = description;

    return this;
  }

  addCategory(category: Category): this {
    const existingCategory = this.#categoriesIds.find(
      (categoryId) => categoryId === category.id,
    );

    if (existingCategory) {
      return this;
    }

    this.#categoriesIds.push(category.id);

    return this;
  }

  removeCategory(categoryId: string): this {
    this.#categoriesIds = this.#categoriesIds.filter(
      (_categoryId) => _categoryId !== categoryId,
    );

    return this;
  }

  updatePrice(price: number): this {
    this.#price = price;

    return this;
  }

  //*** GETTERS ***//

  get name(): string {
    return this.#name;
  }

  get description(): string {
    return this.#description;
  }

  get categoriesIds(): string[] {
    return this.#categoriesIds;
  }

  get price(): number {
    return this.#price;
  }

  get stock(): number {
    return this.#stock;
  }
}
