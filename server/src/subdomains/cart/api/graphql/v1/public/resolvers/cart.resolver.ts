import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from 'src/subdomains/cart/application/services/cart.service';
import { CartItemInput } from '../inputs/cart-item.input';
import { CartSchema } from '../schemas/cart.schema';

@Resolver((of) => CartSchema)
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query((returns) => CartSchema)
  async cart(@Args('id', { type: () => String }) id: string) {
    return this.cartService.getCartById(id);
  }

  @Mutation((returns) => CartSchema)
  async createCart(
    @Args('userId', { type: () => String }) userId: string,
    @Args('item', { type: () => CartItemInput }) item: CartItemInput,
  ) {
    return this.cartService.createCart(userId, item);
  }

  @Mutation((returns) => CartSchema)
  async addItemToCart(
    @Args('cartId', { type: () => String }) cartId: string,
    @Args('input', { type: () => CartItemInput }) input: CartItemInput,
  ) {
    return this.cartService.addItemToCart(cartId, input);
  }

  @Mutation((returns) => CartSchema)
  async removeItemFromCart(
    @Args('cartId', { type: () => String }) cartId: string,
    @Args('productId', { type: () => String }) productId: string,
  ) {
    return this.cartService.removeItemFromCart(cartId, productId);
  }

  @Mutation((returns) => CartSchema)
  async clearCart(@Args('cartId', { type: () => String }) cartId: string) {
    return this.cartService.clearCart(cartId);
  }

  @Mutation((returns) => CartSchema)
  async setItemQuantity(
    @Args('cartId', { type: () => String }) cartId: string,
    @Args('productId', { type: () => String }) productId: string,
    @Args('quantity', { type: () => Int }) quantity: number,
  ) {
    return this.cartService.setItemQuantity(cartId, productId, quantity);
  }
}
