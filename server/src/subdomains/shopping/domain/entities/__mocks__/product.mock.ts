import { Product } from '../product';
import { createDefaultCategory } from './category.mock';

export function createDefaultProduct(): Product {
  return createCustomProduct({});
}

export function createCustomProduct(customValues: Partial<Product>): Product {
  let { id, created, updated, name, description, categoriesIds, price, stock } =
    customValues;
  const keys = Object.keys(customValues);

  id = keys.includes('id') ? id : 'P_ID_01';
  created = keys.includes('created') ? created : new Date();
  updated = keys.includes('updated') ? updated : new Date();
  name = keys.includes('name') ? name : 'Banana';
  description = keys.includes('description') ? description : 'Great Banana';
  categoriesIds = keys.includes('categoriesIds')
    ? categoriesIds
    : [createDefaultCategory().id];
  price = keys.includes('price') ? price : 1.5;
  stock = keys.includes('stock') ? stock : 2;

  return new Product(
    id,
    created,
    updated,
    name,
    description,
    categoriesIds,
    price,
    stock,
  );
}
