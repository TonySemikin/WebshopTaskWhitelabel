import { Utils } from 'src/shared/utils/utils';
import { Cart } from '../../domain/entities/cart';
import { Product } from '../../domain/interfaces/product.interface';
import { CartItem } from '../../domain/values/cart-item';
import { ICartItemDto } from '../dto/cart-item.dto';

export class CartFactory {
  static create(userId: string, dto: ICartItemDto, product: Product): Cart {
    const firstItem = this.createItem(dto, product);

    return new Cart(null, new Date(), new Date(), userId, [firstItem], null);
  }

  static createItem(dto: ICartItemDto, product: Product): CartItem {
    const { productId, quantity } = dto;
    const total = Utils.round(quantity * product.price, 2);

    return new CartItem(productId, product.name, quantity, total);
  }
}
