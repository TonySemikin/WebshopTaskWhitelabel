import { Avatar, List } from 'antd';
import React from 'react';
import { ICategory } from '../queries/categories.query';
import './scss/Category.scss';

interface CategoryProps {
  category: ICategory;
  selectedCategoryId: string;
  selectCategory: (id: string) => void;
  index: number;
}

const Category: React.FC<CategoryProps> = ({
  category,
  selectedCategoryId,
  selectCategory,
  index,
}) => (
  <List.Item
    onClick={() => selectCategory(category.id)}
    className={`category ${
      category.id === selectedCategoryId ? 'selected' : ''
    }`}>
    <List.Item.Meta
      avatar={
        <Avatar
          src={`https://loremflickr.com/200/200/abstract?lock=${index}`}
        />
      }
      title={category.name}
      description={category.description}
    />
  </List.Item>
);

export default Category;
