import { gql } from '@apollo/client';

export interface ICart {
  id: string;
  userId: string;
  items: ICartItem[];
  total: number;
}

export interface ICartItem {
  productId: string;
  productName: string;
  quantity: number;
  total: number;
}

export const GET_CART = gql`
  query Cart($id: String!) {
    cart(id: $id) {
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
