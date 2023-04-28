import { Repository } from 'src/shared/repositories/repository';
import { Order } from '../../domain/entities/order';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface OrderRepository extends Repository<Order> {}
