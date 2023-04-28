import { Category } from '../category';

export function createDefaultCategory(): Category {
  return createCustomCategory({});
}

export function createCustomCategory(
  customValues: Partial<Category>,
): Category {
  let { id, created, updated, name, description } = customValues;
  const keys = Object.keys(customValues);

  id = keys.includes('id') ? id : 'C_ID_1';
  created = keys.includes('created') ? created : new Date();
  updated = keys.includes('updated') ? updated : new Date();
  name = keys.includes('name') ? name : 'Banana';
  description = keys.includes('description') ? description : 'Great Banana';

  return new Category(id, created, updated, name, description);
}
