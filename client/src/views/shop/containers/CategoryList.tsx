import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Empty, List, Skeleton } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { ICategory, GET_CATEGORIES } from '../queries/categories.query';
import Category from '../components/Category';
import './scss/CategoryList.scss';

interface CategoryListProps {
  onCategorySelected: (categoryId: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onCategorySelected }) => {
  //*** LOCAL STATE ***//

  const [selectedCategory, setSelectedCategory] = useState('');

  //*** HOOKS ***//

  let [searchParams] = useSearchParams();

  //*** GRAPHQL ***//

  const { loading, error, data } = useQuery<{ categories: ICategory[] }>(
    GET_CATEGORIES,
  );

  //*** HANDLERS ***//

  const selectCategory = useCallback(
    (categoryId: string) => {
      setSelectedCategory(categoryId);
      onCategorySelected(categoryId);
    },
    [onCategorySelected],
  );

  //*** SIDE EFFECTS ***//

  useEffect(() => {
    if (data?.categories && data?.categories.length > 0 && !selectedCategory) {
      const categoryId = searchParams.get('categoryId');

      /**
       * @note setting selected category to one provided in the URL, but only if it has a valid ID
       */
      if (categoryId && data.categories.find((c) => c.id === categoryId)) {
        selectCategory(categoryId);
      } else {
        selectCategory(data.categories[0].id);
      }
    }
  }, [data, searchParams, selectCategory, selectedCategory]);

  return (
    <div className="category-list">
      {loading && (
        <div className="category-list__loading">
          <Skeleton active />
        </div>
      )}
      {error && (
        <div className="category-list__empty">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={'Error occurred'}
          />
        </div>
      )}
      {!loading && !error && (
        <div className="category-list__content">
          <List
            itemLayout="horizontal"
            className="category-list__content-list"
            dataSource={data?.categories}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={'No categories found'}
                />
              ),
            }}
            renderItem={(category, index) => (
              <Category
                index={index}
                category={category}
                selectCategory={selectCategory}
                selectedCategoryId={selectedCategory}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryList;
