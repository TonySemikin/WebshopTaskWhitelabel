import { Avatar, List, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ICartItem } from '../queries/cart.query';
import { useEffect, useState } from 'react';
import './scss/CartItem.scss';

interface CartItemProps {
  index: number;
  cartItem: ICartItem;
  onRemoveFromCart: () => void;
  onChangeItemQuantity: (quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  cartItem,
  onRemoveFromCart,
  index,
}) => {
  //*** HOOKS ***//

  const [loadingRemoveFromCart, setLoadingRemoveFromCart] = useState(false);

  //*** HANDLERS ***//

  const handleRemoveFromCart = () => {
    setLoadingRemoveFromCart(true);
    onRemoveFromCart();
  };

  //*** SIDE EFFECTS ***//

  useEffect(() => {
    if (!cartItem && loadingRemoveFromCart) {
      setLoadingRemoveFromCart(false);
    }
  }, [cartItem, loadingRemoveFromCart]);

  return (
    <div className="cart-item">
      <div className="cart-item__name">
        <List.Item.Meta
          avatar={
            <Avatar
              src={`https://loremflickr.com/200/200/abstract?lock=${
                94862 + index
              }`}
            />
          }
          title={cartItem.productName}
        />
      </div>
      <div className="cart-item__info">
        <span> Quantity: {cartItem.quantity}</span>
        <span> Total: € {cartItem.total.toFixed(2)}</span>
      </div>
      <div className="cart-item__actions">
        {cartItem && !loadingRemoveFromCart && (
          <DeleteOutlined onClick={handleRemoveFromCart} />
        )}
        {loadingRemoveFromCart && <Spin />}
      </div>
    </div>
  );
};

export default CartItem;
