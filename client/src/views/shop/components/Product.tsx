import { Button, InputNumber, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { IProduct } from '../queries/products.query';
import { ICartItem } from '../../cart/queries/cart.query';
import './scss/Product.scss';

interface ProductProps {
  cartItem: ICartItem | null;
  product: IProduct;
  index: number;
  onAddToCart: (quantity: number) => void;
  onRemoveFromCart: () => void;
  errorCreateCart: boolean;
  errorAddItemToCart: boolean;
  errorRemoveItemFromCart: boolean;
}

const Product: React.FC<ProductProps> = ({
  cartItem,
  product,
  onAddToCart,
  onRemoveFromCart,
  errorCreateCart,
  errorAddItemToCart,
  errorRemoveItemFromCart,
  index,
}) => {
  //*** LOCAL STATE ***//

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [loadingRemoveFromCart, setLoadingRemoveFromCart] = useState(false);

  //*** HANDLERS ***//

  const handleQuantityChange = (value: number | null) => {
    if (value != null) setSelectedQuantity(value);
  };

  const handleAddToCart = () => {
    setLoadingAddToCart(true);
    onAddToCart(selectedQuantity);
  };

  const handleRemoveFromCart = () => {
    setLoadingRemoveFromCart(true);
    onRemoveFromCart();
  };

  //*** SIDE EFFECTS ***//

  useEffect(() => {
    if (cartItem) {
      setSelectedQuantity(cartItem.quantity);
    }

    if (cartItem && loadingAddToCart) {
      setLoadingAddToCart(false);
    }

    if (!cartItem && loadingRemoveFromCart) {
      setLoadingRemoveFromCart(false);
    }
  }, [cartItem, loadingAddToCart, loadingRemoveFromCart]);

  useEffect(() => {
    if (errorCreateCart || errorAddItemToCart) {
      setLoadingAddToCart(false);
    }

    if (errorRemoveItemFromCart) {
      setLoadingRemoveFromCart(false);
    }
  }, [errorCreateCart, errorAddItemToCart, errorRemoveItemFromCart]);

  return (
    <div className="product">
      <div className="product__info">
        <img
          className="product__info-image"
          src={`https://loremflickr.com/200/200/abstract?lock=${94862 + index}`}
          alt={product.name}
        />
        <div className="product__info-details">
          <div className="product__info-details-title">{product.name}</div>
          <div className="product__info-details-description">
            {product.description}
          </div>
          <div className="product__info-details-price">
            <span className="product__info-details-price-currency">€</span>
            {product.price.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="product__actions">
        <div className="product__actions-stock-limit">
          {product.stock < 10 && <p>Only {product.stock} items left</p>}
        </div>
        <div className="product__actions-quantity">
          <InputNumber
            disabled={!!cartItem}
            min={1}
            max={product.stock}
            value={selectedQuantity}
            onChange={handleQuantityChange}
          />
        </div>
        <div className="product__actions-add-to-cart">
          <Button
            disabled={!!cartItem}
            loading={loadingAddToCart}
            type="primary"
            onClick={handleAddToCart}>
            {cartItem ? 'Added To Cart' : 'Add To Cart'}
          </Button>
        </div>
        <div className="product__actions-delete-from-cart">
          {cartItem && !loadingRemoveFromCart && (
            <DeleteOutlined onClick={handleRemoveFromCart} />
          )}
          {loadingRemoveFromCart && <Spin />}
        </div>
      </div>
    </div>
  );
};

export default Product;
