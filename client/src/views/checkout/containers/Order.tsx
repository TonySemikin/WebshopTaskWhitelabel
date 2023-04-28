import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Stepper, {
  IStepsStatus,
  completeOrderStatus,
  initialStepsStatus,
  pendingOrderStatus,
} from '../components/Stepper';
import DeliveryAddressForm from '../forms/DeliveryAddressForm';
import OrderCompletion from '../components/OrderCompletion';
import { ICartItem } from '../../cart/queries/cart.query';
import { IOrder, IOrderItem, IOrderStatus } from '../queries/order.query';
import { CREATE_ORDER } from '../mutations/create-order.mutation';
import { PROCEED_TO_PAYMENT } from '../mutations/proceed-to-payment.mutation';
import OrderSummary from '../components/OrderSummary';
import PaymentMethod from '../components/PaymentMethod';
import './Order.scss';

interface OrderProps {
  items: IOrderItem[] | ICartItem[];
  total: number;
  isReadonly: boolean;
  orderStatus?: string;
  cartId?: string;
  savedDeliveryAddress?: { shortDescription: string };
  clearCart?: () => void;
}

const Order: React.FC<OrderProps> = ({
  items,
  total,
  isReadonly,
  orderStatus,
  cartId,
  savedDeliveryAddress,
  clearCart,
}) => {
  //*** LOCAL STATE ***//

  const [stepsState, setStepsState] =
    useState<IStepsStatus>(initialStepsStatus);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  //*** HOOKS ***//

  const { id } = useParams();
  const navigate = useNavigate();
  const [messageApi, messageContextHolder] = message.useMessage();

  //*** GRAPHQL ***//

  const [
    createOrderMutation,
    { loading: createOrderLoading, error: createOrderError },
  ] = useMutation<{
    createOrder: IOrder;
  }>(CREATE_ORDER);

  const [
    proceedToPaymentMutation,
    { loading: proceedToPaymentLoading, error: proceedToPaymentError },
  ] = useMutation<{
    proceedToPayment: IOrder;
  }>(PROCEED_TO_PAYMENT);

  //*** HANDLERS ***//

  const proceedToDelivery = () => {
    const newStatus = { ...stepsState };

    newStatus.currentStep = stepsState.currentStep + 1;
    newStatus.steps[0].status = 'finish';

    setStepsState(newStatus);
  };

  const onAddressChanged = (address: string) => {
    setDeliveryAddress(address);
  };

  const createOrder = async () => {
    const newStatus = { ...stepsState };

    const order = await createOrderMutation({
      variables: {
        input: {
          cartId,
          address: { shortDescription: deliveryAddress },
        },
      },
    });

    newStatus.currentStep = stepsState.currentStep + 1;
    newStatus.steps[1].status = 'finish';

    if (order.data) {
      navigate({ pathname: `order/${order.data.createOrder.id}` });
    }

    setStepsState(newStatus);
  };

  const proceedToPayment = async () => {
    const newStatus = { ...stepsState };

    await proceedToPaymentMutation({
      variables: {
        orderId: id,
      },
    });

    newStatus.currentStep = stepsState.currentStep + 1;
    newStatus.steps[2].status = 'finish';

    setStepsState(newStatus);
  };

  const backToShopping = () => {
    clearCart && clearCart();
    navigate('/shop');
  };

  const proceedToOrder = () => {
    clearCart && clearCart();
    navigate(`/orders/${id}`);
  };

  const onStepChange = (step: number) => {
    setStepsState({ ...stepsState, currentStep: step });
  };

  //*** SIDE EFFECTS ***//

  useEffect(() => {
    if (createOrderError) {
      messageApi.open({
        type: 'error',
        content:
          'Could not create order, please try again in a few minutes or contact support.',
      });
    }

    if (proceedToPaymentError) {
      messageApi.open({
        type: 'error',
        content:
          'Could not proceed to payment, please try again in a few minutes or contact support.',
      });
    }
  }, [createOrderError, proceedToPaymentError, messageApi]);

  useEffect(() => {
    if (!orderStatus) return;

    if (orderStatus === IOrderStatus.PAYMENT_PENDING) {
      setStepsState(pendingOrderStatus);
    }

    if (orderStatus === IOrderStatus.COMPLETE) {
      setStepsState(completeOrderStatus);
    }
  }, [orderStatus]);

  return (
    <div className="order">
      {messageContextHolder}
      <div className="order__stepper">
        <Stepper stepsStatus={stepsState} onStepChange={onStepChange} />
      </div>
      {stepsState.currentStep === 0 && (
        <OrderSummary
          items={items}
          total={total}
          proceed={proceedToDelivery}
          isActionsShown={
            !isReadonly &&
            stepsState.steps[stepsState.currentStep].status === 'wait'
          }
        />
      )}
      {stepsState.currentStep === 1 && (
        <DeliveryAddressForm
          savedDeliveryAddress={savedDeliveryAddress}
          inputDeliveryAddress={deliveryAddress}
          onChange={onAddressChanged}
          proceed={createOrder}
          isActionsShown={
            !isReadonly &&
            stepsState.steps[stepsState.currentStep].status === 'wait'
          }
          createOrderLoading={createOrderLoading}
        />
      )}
      {stepsState.currentStep === 2 && (
        <PaymentMethod
          proceed={proceedToPayment}
          isActionsShown={
            !isReadonly &&
            stepsState.steps[stepsState.currentStep].status === 'wait'
          }
          proceedToPaymentLoading={proceedToPaymentLoading}
        />
      )}
      {stepsState.currentStep === 3 && (
        <OrderCompletion
          status={orderStatus}
          isActionsShown={!isReadonly}
          backToShopping={backToShopping}
          proceedToOrder={proceedToOrder}
        />
      )}
    </div>
  );
};

export default Order;
