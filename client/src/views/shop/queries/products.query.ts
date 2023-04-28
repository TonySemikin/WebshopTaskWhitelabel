import { gql } from '@apollo/client';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const GET_PRODUCTS = gql`
  query ProductsByCategory($filter: ProductsByCategoryFilter!) {
    productsByCategory(filter: $filter) {
      products {
        id
        name
        description
        price
        stock
      }
      totalCount
    }
  }
`;
