import { Repository } from 'src/shared/repositories/repository';
import { Cart } from '../../domain/entities/cart';

export const CART_REPOSITORY = 'CART_REPOSITORY';

export interface CartRepository extends Repository<Cart> {}
