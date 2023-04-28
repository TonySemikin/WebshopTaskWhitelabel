import { gql } from '@apollo/client';

export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($cartId: String!, $input: CartItemInput!) {
    addItemToCart(cartId: $cartId, input: $input) {
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
