import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Empty, Pagination, Skeleton } from 'antd';
import { GET_PRODUCTS, IProduct } from '../queries/products.query';
import Product from '../components/Product';
import { useShoppingCart } from '../../cart/contexts/ShoppingCartContext';
import { ICart } from '../../cart/queries/cart.query';
import './scss/ProductList.scss';

interface ProductListProps {
  selectedCategory: string;
}

const PAGE_SIZE_OPTIONS = [5, 10];

const ProductList: React.FC<ProductListProps> = ({ selectedCategory }) => {
  //*** LOCAL STATE ***//

  const [query, setQuery] = useState({ from: 1, to: 6, size: 5, step: 1 });

  //*** CONTEXTS ***//

  const {
    cart,
    errorCreateCart,
    errorAddItemToCart,
    errorRemoveItemFromCart,
    addToCart,
    removeFromCart,
  } = useShoppingCart();

  //*** HOOKS ***//

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const searchParamsRef = useRef(searchParams);

  //*** GRAPHQL ***//

  const { loading, error, data } = useQuery<{
    productsByCategory: { products: IProduct[]; totalCount: number };
  }>(GET_PRODUCTS, {
    variables: {
      filter: { categoryId: selectedCategory, from: query.from, to: query.to },
    },
  });

  //*** HELPER FUNCTIONS ***//

  const parseQueryParams = () => {
    const fromParam = searchParamsRef.current.get('from');
    const sizeParam = searchParamsRef.current.get('size');

    const from = fromParam ? parseInt(fromParam) : 1;
    const sizeProvided = sizeParam ? parseInt(sizeParam) : 5;
    const size = PAGE_SIZE_OPTIONS.includes(sizeProvided)
      ? sizeProvided
      : PAGE_SIZE_OPTIONS[0];

    return { from, size };
  };

  const findProductInCart = (cart: ICart | null, product: IProduct) => {
    if (!cart || cart.items.length === 0) return null;

    return cart.items.find((i) => i.productId === product.id) ?? null;
  };

  //*** HANDLERS ***//

  const onAddToCart = (productId: string, quantity: number) => {
    addToCart(productId, quantity);
  };

  const onRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const onPaginationChange = (step: number, size: number) => {
    const from = (step - 1) * size + 1;
    const to = from + size;

    setQuery({ from, to, step, size });
    navigate({
      search: createSearchParams({
        categoryId: selectedCategory,
        from: from.toString(),
        size: size.toString(),
      }).toString(),
    });
  };

  //*** SIDE EFFECTS ***//

  useEffect(() => {
    if (selectedCategory) {
      const { from, size } = parseQueryParams();

      const start = Math.ceil(from / size);

      navigate({
        search: createSearchParams({
          categoryId: selectedCategory,
          from: from.toString(),
          size: size.toString(),
        }).toString(),
      });

      onPaginationChange(start, size);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <div className="product-list">
      {(!selectedCategory || loading) && (
        <div className="product-list__loading">
          <Skeleton active />
        </div>
      )}
      {error && (
        <div className="product-list__empty">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={'Error occurred'}
          />
        </div>
      )}
      {!loading && !error && selectedCategory && (
        <div className="product-list__content">
          <div className="product-list__content-list">
            {(!data?.productsByCategory.products ||
              data?.productsByCategory.products.length === 0) && (
              <div className="product-list__content-empty">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={'No products found '}
                />
              </div>
            )}
            {data?.productsByCategory.products?.map((product, index) => (
              <div className="product-list__content-list-item" key={product.id}>
                <Product
                  product={product}
                  cartItem={findProductInCart(cart, product)}
                  index={index}
                  onAddToCart={(quantity: number) =>
                    onAddToCart(product.id, quantity)
                  }
                  onRemoveFromCart={() => onRemoveFromCart(product.id)}
                  errorCreateCart={!!errorCreateCart}
                  errorAddItemToCart={!!errorAddItemToCart}
                  errorRemoveItemFromCart={!!errorRemoveItemFromCart}
                />
              </div>
            ))}
          </div>
          {!!data?.productsByCategory.totalCount && (
            <div className="product-list__content-pagination">
              <Pagination
                showSizeChanger
                onChange={onPaginationChange}
                defaultCurrent={query.step}
                defaultPageSize={query.size}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                total={data?.productsByCategory.totalCount ?? 0}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
