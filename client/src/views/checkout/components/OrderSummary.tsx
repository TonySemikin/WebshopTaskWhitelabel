import { Button, List } from 'antd';
import React from 'react';
import OrderItem from './OrderItem';
import { IOrderItem } from '../queries/order.query';
import { ICartItem } from '../../cart/queries/cart.query';
import './scss/OrderSummary.scss';

interface OrderSummaryProps {
  items: IOrderItem[] | ICartItem[];
  total: number;
  isActionsShown: boolean;
  proceed: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  total,
  isActionsShown,
  proceed,
}) => {
  return (
    <div className="order-summary">
      <div className="order-summary__list">
        <List
          itemLayout="horizontal"
          dataSource={items}
          renderItem={(item, index) => (
            <List.Item>
              <OrderItem item={item} key={item.productId} index={index} />
            </List.Item>
          )}
        />
      </div>
      <div className="order-summary__footer">
        <div className="order-summary__footer-total">
          <span>Order Total: </span>
          <span className="order-summary__footer-total-currency">€</span>
          <span>{total.toFixed(2)}</span>
        </div>
        <div className="order-summary__footer-actions">
          {isActionsShown && (
            <Button type="primary" htmlType="submit" onClick={proceed}>
              Provide delivery address
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
