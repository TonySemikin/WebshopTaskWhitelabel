import { CartItem } from './cart-item.interface';

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
}
