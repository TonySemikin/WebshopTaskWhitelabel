export interface ICreateProductDto {
  name: string;
  description: string;
  categoriesIds: string[];
  price: number;
  stock: number;
}
