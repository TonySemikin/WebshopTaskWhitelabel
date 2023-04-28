import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../cart/contexts/ShoppingCartContext';
import Order from './containers/Order';

const Checkout: React.FC = () => {
  const { cart, clearCart } = useShoppingCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart) {
      navigate({
        pathname: '/shop',
      });
    }
  });

  return (
    cart && (
      <Order
        items={cart.items}
        total={cart.total}
        cartId={cart.id}
        isReadonly={false}
        clearCart={clearCart}
      />
    )
  );
};

export default Checkout;
