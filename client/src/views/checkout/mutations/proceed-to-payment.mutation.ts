import { gql } from '@apollo/client';

export const PROCEED_TO_PAYMENT = gql`
  mutation ProceedToPayment($orderId: String!) {
    proceedToPayment(orderId: $orderId) {
      id
      status
      cartId
      deliveryAddress {
        shortDescription
      }
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
