import { gql } from '@apollo/client';

export const SET_ITEM_QUANTITY = gql`
  mutation SetItemQuantity(
    $cartId: String!
    $productId: String!
    $quantity: Int!
  ) {
    setItemQuantity(
      cartId: $cartId
      productId: $productId
      quantity: $quantity
    ) {
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
