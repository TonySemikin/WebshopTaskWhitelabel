import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import logo from '../../logo.png';
import { useModals } from '../contexts/ModalContext';
import { useSession } from '../contexts/SessionContext';
import { useShoppingCart } from '../../views/cart/contexts/ShoppingCartContext';
import CartIcon from '../../views/cart/components/CartIcon';
import { useTheme } from '../contexts/ThemeContext';
import './scss/Header.scss';

const Header: React.FC = () => {
  //*** HOOKS ***//

  const navigate = useNavigate();

  //*** CONTEXTS ***//

  const { cart } = useShoppingCart();
  const { user } = useSession();
  const { setModals } = useModals();
  const { contrastRed } = useTheme();

  //*** HANDLERS ***//

  const handleCartIconClick = () => {
    setModals({ isCartModalOpen: true });
  };

  const handleHomeClick = () => {
    navigate('/shop');
  };

  return (
    <header className="header">
      <div className="header__logo" onClick={handleHomeClick}>
        <img
          className="header__logo-img"
          src={logo}
          alt="Tony's Web Shop Icon"
        />
        <span className="header__logo-text">Tony's Web Shop</span>
      </div>
      {user && (
        <div className="header__user">
          <span className="header__user-name">{user.username}</span>
          <span className="header__user-icon">
            <Avatar
              alt="User Icon"
              style={{ backgroundColor: contrastRed.main }}
              icon={<UserOutlined />}
            />
          </span>
          <Badge
            size="small"
            className="header__cart"
            count={cart?.items.length ?? null}>
            <span className="header__cart-icon">
              <CartIcon handleClick={handleCartIconClick} />
            </span>
          </Badge>
        </div>
      )}
    </header>
  );
};

export default Header;
