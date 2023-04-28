import { createDefaultCategory } from '../__mocks__/category.mock';
import { createDefaultProduct } from '../__mocks__/product.mock';
import { Product } from '../product';

describe('Product', () => {
  describe('Common', () => {
    test('class exists', () => {
      expect(Product).toBeDefined();
    });
  });

  describe('Getters', () => {
    test('id getter exists', () => {
      const entity = createDefaultProduct();

      expect(entity.id).toBeDefined();
    });

    test('created getter exists', () => {
      const entity = createDefaultProduct();

      expect(entity.created).toBeDefined();
    });

    test('created getter exists and returns instance of Date', () => {
      const entity = createDefaultProduct();

      expect(entity.created).toBeInstanceOf(Date);
    });

    test('categoriesIds getter returns Array of strings', () => {
      const entity = createDefaultProduct();

      expect(entity.categoriesIds).toBeInstanceOf(Array);
      expect(typeof entity.categoriesIds[0]).toBe('string');
    });

    test('price getter exists', () => {
      const entity = createDefaultProduct();

      expect(entity.price).toBeDefined();
    });

    test('stock getter exists', () => {
      const entity = createDefaultProduct();

      expect(entity.stock).toBeDefined();
    });
  });

  describe('Constructor', () => {
    test('assigns ID on construction', () => {
      const entity = createDefaultProduct();

      expect(entity.id).toBe('P_ID_01');
    });

    test('assigns created on construction', () => {
      const entity = createDefaultProduct();

      expect(entity.created).toBeInstanceOf(Date);
    });

    test('assigns updated on construction', () => {
      const entity = createDefaultProduct();

      expect(entity.updated).toBeInstanceOf(Date);
    });

    test('assigns name on construction', () => {
      const entity = createDefaultProduct();

      expect(entity.name).toBe('Banana');
    });

    test('assigns description on construction', () => {
      const entity = createDefaultProduct();

      expect(entity.description).toBe('Great Banana');
    });

    test('assigns categoriesIds on construction', () => {
      const entity = createDefaultProduct();

      expect(entity.categoriesIds).toEqual(['C_ID_1']);
    });

    test('assigns price on construction', () => {
      const entity = createDefaultProduct();

      expect(entity.price).toBe(1.5);
    });

    test('assigns stock on construction', () => {
      const entity = createDefaultProduct();

      expect(entity.stock).toBe(2);
    });
  });

  describe('Behaviour', () => {
    describe('#updateNameAndDescription(...)', () => {
      test('method exists', () => {
        const entity = createDefaultProduct();

        expect(entity.updateNameAndDescription).toBeDefined();
      });

      test('updates name and description properties', () => {
        const entity = createDefaultProduct();
        const newName = 'Apple';
        const newDescription = 'Juicy Apple';

        entity.updateNameAndDescription(newName, newDescription);

        expect(entity.name).toBe(newName);
        expect(entity.description).toBe(newDescription);
      });

      test('returns instance of Product', () => {
        const entity = createDefaultProduct();
        const newName = 'Apple';
        const newDescription = 'Juicy Apple';

        expect(
          entity.updateNameAndDescription(newName, newDescription),
        ).toBeInstanceOf(Product);
      });
    });

    describe('#addCategory(...)', () => {
      test('method exists', () => {
        const entity = createDefaultProduct();

        expect(entity.addCategory).toBeDefined();
      });

      test('adds new category', () => {
        const entity = createDefaultProduct();
        const newCategory = createDefaultCategory();

        entity.addCategory(newCategory);

        expect(entity.categoriesIds).toContain(newCategory.id);
      });

      test('does not add existing category', () => {
        const entity = createDefaultProduct();
        const newCategory = createDefaultCategory();

        entity.addCategory(newCategory);

        expect(entity.categoriesIds.length).toEqual(1);
        expect(entity.categoriesIds[0]).toEqual('C_ID_1');
      });

      test('returns instance of Product', () => {
        const entity = createDefaultProduct();
        const newCategory = createDefaultCategory();

        expect(entity.addCategory(newCategory)).toBeInstanceOf(Product);
      });
    });

    describe('#removeCategory(...)', () => {
      test('method exists', () => {
        const entity = createDefaultProduct();

        expect(entity.removeCategory).toBeDefined();
      });

      test('removes category', () => {
        const entity = createDefaultProduct();
        const categoryId = 'C_ID_1';

        entity.removeCategory(categoryId);

        expect(entity.categoriesIds).not.toContain(categoryId);
      });

      test('returns instance of Product', () => {
        const entity = createDefaultProduct();

        expect(entity.removeCategory('C_ID_01')).toBeInstanceOf(Product);
      });
    });

    describe('#updatePrice(...)', () => {
      test('method exists', () => {
        const entity = createDefaultProduct();

        expect(entity.updatePrice).toBeDefined();
      });

      test('updates price property', () => {
        const entity = createDefaultProduct();
        const newPrice = 2.5;

        entity.updatePrice(newPrice);

        expect(entity.price).toBe(newPrice);
      });

      test('returns instance of Product', () => {
        const entity = createDefaultProduct();

        expect(entity.updatePrice(2.5)).toBeInstanceOf(Product);
      });
    });
  });
});
