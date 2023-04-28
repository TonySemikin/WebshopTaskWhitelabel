import React from 'react';
import { InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { IOrderStatus } from '../queries/order.query';
import { Button } from 'antd';
import './scss/OrderCompletion.scss';

interface OrderCompletionProps {
  status?: string;
  isActionsShown: boolean;
  backToShopping: () => void;
  proceedToOrder: () => void;
}

const OrderCompletionPending = () => (
  <div className="order-completion__status-messages">
    <span className="order-completion__status-messages-icon">
      <InfoCircleOutlined />
    </span>
    <span>Thank you!</span>
    <span>Waiting Payment Confirmation for Your Order</span>
  </div>
);

const OrderCompletion: React.FC<OrderCompletionProps> = ({
  status,
  isActionsShown,
  backToShopping,
  proceedToOrder,
}) => {
  return (
    <div className="order-completion">
      <div className="order-completion__body">
        <div className="order-completion__status">
          {status === IOrderStatus.PAYMENT_PENDING && (
            <OrderCompletionPending />
          )}
          {status === IOrderStatus.COMPLETE && (
            <div className="order-completion__status-messages">
              <span className="order-completion__status-messages-icon">
                <CheckCircleOutlined />
              </span>
              <span>Thank you!</span>
              <span>Your Order is Complete.</span>
            </div>
          )}
          {!status && <OrderCompletionPending />}
        </div>
        <div className="order-completion__actions">
          <Button type="primary" htmlType="submit" onClick={backToShopping}>
            Back to shopping
          </Button>

          {isActionsShown && (
            <Button type="primary" htmlType="submit" onClick={proceedToOrder}>
              Track your order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCompletion;
