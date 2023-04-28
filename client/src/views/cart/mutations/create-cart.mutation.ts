import { gql } from '@apollo/client';

export const CREATE_CART = gql`
  mutation CreateCart($userId: String!, $item: CartItemInput!) {
    createCart(userId: $userId, item: $item) {
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
