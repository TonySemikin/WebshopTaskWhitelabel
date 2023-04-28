import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CartService } from 'src/subdomains/cart/application/services/cart.service';
import { Order } from '../../domain/entities/order';
import { ICreateOrderDto } from '../dto/create-order.dto';
import { OrderFactory } from '../factories/order.factory';
import {
  CheckoutMessageBroker,
  CHECKOUT_MESSAGE_BROKER,
} from '../messaging/checkout.message-broker';
import {
  OrderRepository,
  ORDER_REPOSITORY,
} from '../repositories/order.repository';
/**
 * @note in real-life scenario would not be imported via source code
 * Rather references from open host messaging API definition of Payment service
 */
import { PaymentSucceededEvent } from 'src/subdomains/payment/domain/events/payment-succeeded.event';
import { PaymentCreateCommand } from 'src/subdomains/payment/domain/commands/payment-create.command';
import { Utils } from 'src/shared/utils/utils';

@Injectable()
export class CheckoutService {
  constructor(
    @Inject(ORDER_REPOSITORY) private orderRepository: OrderRepository,
    @Inject(CHECKOUT_MESSAGE_BROKER)
    private checkoutMessageBroker: CheckoutMessageBroker,
    private readonly cartService: CartService,
  ) {
    this.subscribeToEvents();
  }

  //*** PUBLIC API ***//

  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.orderRepository.loadById(orderId);
    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  async createOrder(dto: ICreateOrderDto): Promise<Order> {
    /**
     * @important - delay is just for UI demo purposes, to see some delay and spinners.
     */
    await Utils.delay(300);

    const cart = await this.cartService.getCartById(dto.cartId);
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${dto.cartId} not found.`);
    }

    const deliveryAddress = OrderFactory.createAddress(dto.address);
    const newOrder = OrderFactory.create(cart, deliveryAddress);

    return await this.orderRepository.save(newOrder);
  }

  async proceedToPayment(orderId: string): Promise<Order> {
    /**
     * @important - delay is just for UI demo purposes, to see some delay and spinners.
     */
    await Utils.delay(300);

    const order = await this.getOrderById(orderId);
    const cart = await this.cartService.getCartById(order.cartId);
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${order.cartId} not found.`);
    }

    order.proceedToPayment(cart);

    this.checkoutMessageBroker.emitEvent(new PaymentCreateCommand(orderId));
    return await this.orderRepository.save(order);
  }

  async paymentSucceeded({ orderId }): Promise<void> {
    const order = await this.getOrderById(orderId);

    order.paymentSucceeded();

    await this.orderRepository.save(order);
  }

  //*** MESSAGING API ***//

  private subscribeToEvents() {
    this.checkoutMessageBroker.listenToEvent<{ orderId: string }>(
      PaymentSucceededEvent._name,
      this.paymentSucceeded.bind(this),
    );
  }
}
