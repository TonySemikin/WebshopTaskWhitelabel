import React from 'react';
import { Button, Form, Input } from 'antd';
import './DeliveryAddressForm.scss';

interface UserFormProps {
  savedDeliveryAddress: { shortDescription: string } | undefined;
  inputDeliveryAddress: string;
  isActionsShown: boolean;
  createOrderLoading: boolean;
  onChange: (address: string) => void;
  proceed: () => void;
}

const DeliveryAddressForm: React.FC<UserFormProps> = ({
  savedDeliveryAddress,
  inputDeliveryAddress,
  isActionsShown,
  createOrderLoading,
  onChange,
  proceed,
}) => {
  const handleChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <div className="delivery-address-form">
      {savedDeliveryAddress ? (
        <div className="delivery-address-form__body">
          <h3>Your order will be delivered to:</h3>
          <p>{savedDeliveryAddress.shortDescription}</p>
        </div>
      ) : (
        <div className="delivery-address-form__body">
          <Form
            name="basic"
            className="delivery-address-form__body-input"
            onChange={handleChange}
            disabled={!isActionsShown}
            initialValues={{ address: inputDeliveryAddress }}
            autoComplete="off">
            <Form.Item
              label={
                <span style={{ fontWeight: 'bold' }}>Delivery Address</span>
              }
              name="address"
              rules={[
                {
                  required: true,
                  message:
                    'Please input your delivery address (can be anything)!',
                },
              ]}>
              <Input />
            </Form.Item>
          </Form>
        </div>
      )}
      <div className="delivery-address-form__footer">
        {isActionsShown && (
          <Button
            disabled={!inputDeliveryAddress}
            loading={createOrderLoading}
            type="primary"
            htmlType="submit"
            onClick={proceed}>
            Select payment method
          </Button>
        )}
      </div>
    </div>
  );
};

export default DeliveryAddressForm;
