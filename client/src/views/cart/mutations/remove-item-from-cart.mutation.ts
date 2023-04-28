import { gql } from '@apollo/client';

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($cartId: String!, $productId: String!) {
    removeItemFromCart(cartId: $cartId, productId: $productId) {
      id
      userId
      items {
        productId
        productName
        quantity
        total
      }
      total
    }
  }
`;
