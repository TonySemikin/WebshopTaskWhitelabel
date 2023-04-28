import React, { useState } from 'react';
import CategoryList from './containers/CategoryList';
import ProductList from './containers/ProductList';
import './Shop.scss';

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const onCategorySelected = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="shop">
      <aside className="shop__categories">
        <CategoryList onCategorySelected={onCategorySelected} />
      </aside>
      <section className="shop__products">
        <ProductList selectedCategory={selectedCategory} />
      </section>
    </div>
  );
};

export default Shop;
