import { gql } from '@apollo/client';

export interface ICategory {
  id: string;
  name: string;
  description: string;
}

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
      description
    }
  }
`;
