import { Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider } from './common/contexts/SessionContext';
import { ShoppingCartProvider } from './views/cart/contexts/ShoppingCartContext';
import { ModalsProvider } from './common/contexts/ModalContext';
import Header from './common/containers/Header';
import UserModal from './common/modals/UserModal';
import CartModal from './views/cart/modals/CartModal';
import Footer from './common/containers/Footer';
import Shop from './views/shop/Shop';
import Checkout from './views/checkout/Checkout';
import Orders from './views/checkout/Orders';
import { ThemeProvider } from './common/contexts/ThemeContext';
import './common/scss/app.scss';

function App() {
  return (
    <ThemeProvider>
      <ModalsProvider>
        <SessionProvider>
          <ShoppingCartProvider>
            <Header />
            <Routes>
              <Route path="/">
                <Route index element={<Navigate to="/shop" />} />
                <Route path="shop" element={<Shop />} />
                <Route path="checkout/order/:id" element={<Checkout />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="orders/:id" element={<Orders />} />
                <Route path="*" element={<Navigate to="/shop" />} />
              </Route>
            </Routes>
            <Footer />
            <>
              <UserModal />
              <CartModal />
            </>
          </ShoppingCartProvider>
        </SessionProvider>
      </ModalsProvider>
    </ThemeProvider>
  );
}

export default App;
