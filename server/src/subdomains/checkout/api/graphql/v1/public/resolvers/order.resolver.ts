import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckoutService } from 'src/subdomains/checkout/application/services/checkout.service';
import { CreateOrderInput } from '../inputs/create-order.input';
import { OrderSchema } from '../schemas/order.schema';

@Resolver((of) => OrderSchema)
export class OrderResolver {
  constructor(private checkoutService: CheckoutService) {}

  @Query((returns) => OrderSchema)
  async order(@Args('id', { type: () => String }) id: string) {
    return this.checkoutService.getOrderById(id);
  }

  @Mutation((returns) => OrderSchema)
  async createOrder(
    @Args('input', { type: () => CreateOrderInput }) input: CreateOrderInput,
  ) {
    return this.checkoutService.createOrder(input);
  }

  @Mutation((returns) => OrderSchema)
  async proceedToPayment(
    @Args('orderId', { type: () => String }) orderId: string,
  ) {
    return this.checkoutService.proceedToPayment(orderId);
  }
}
