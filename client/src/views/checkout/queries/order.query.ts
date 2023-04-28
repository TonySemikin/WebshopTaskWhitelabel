import { gql } from '@apollo/client';

export interface IOrder {
  id: string;
  status: IOrderStatus;
  cartId: string | null;
  items: IOrderItem[];
  deliveryAddress: IAddress;
  total: number;
}

export interface IOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  total: number;
}

export interface IAddress {
  shortDescription: string;
}

export enum IOrderStatus {
  CREATED = 'Created',
  PAYMENT_PENDING = 'PaymentPending',
  COMPLETE = 'Complete',
}

export const GET_ORDER = gql`
  query Order($id: String!) {
    order(id: $id) {
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
