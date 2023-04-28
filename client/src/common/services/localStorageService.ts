type RequiredProps<T> = {
  [P in keyof T]-?: T[P];
};

export class LocalStorageService {
  static getJSONItem<T extends Object>(key: string): T | null {
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }

    let parsedItem: T;

    try {
      parsedItem = JSON.parse(item) as T;
    } catch {
      return null;
    }

    const requiredProps = Object.keys(parsedItem) as (keyof T)[];

    if (!requiredProps.every((prop) => parsedItem.hasOwnProperty(prop))) {
      return null;
    }

    return parsedItem;
  }

  static getPrimitiveItem<T extends string | number | boolean>(
    key: string,
  ): T | null {
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }

    try {
      const parsedItem = JSON.parse(item);
      if (
        typeof parsedItem === 'string' ||
        typeof parsedItem === 'number' ||
        typeof parsedItem === 'boolean'
      ) {
        return parsedItem as T;
      }
    } catch {
      return item as T;
    }

    return null;
  }

  static setItem<T>(key: string, value: Partial<RequiredProps<T>>): void {
    const item = JSON.stringify(value);
    localStorage.setItem(key, item);
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
