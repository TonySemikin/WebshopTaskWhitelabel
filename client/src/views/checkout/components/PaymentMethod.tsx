import { Button } from 'antd';
import React from 'react';
import './scss/PaymentMethod.scss';

interface PaymentMethodProps {
  isActionsShown: boolean;
  proceedToPaymentLoading: boolean;
  proceed: () => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  isActionsShown,
  proceedToPaymentLoading,
  proceed,
}) => {
  return (
    <div className="payment-method">
      <div className="payment-method__body">
        <p>Tony will cover all payments for you!</p>
      </div>
      <div className="payment-method__footer">
        {isActionsShown && (
          <Button
            loading={proceedToPaymentLoading}
            type="primary"
            htmlType="submit"
            onClick={proceed}>
            Proceed with Payment
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
