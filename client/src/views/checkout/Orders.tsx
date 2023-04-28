import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { Spin, message } from 'antd';
import { GET_ORDER, IOrder } from './queries/order.query';
import Order from './containers/Order';

const Orders: React.FC = () => {
  //*** HOOKS ***//

  const [messageApi, messageContextHolder] = message.useMessage();
  const navigate = useNavigate();
  let { id } = useParams();

  //*** GRAPHQL ***//

  const [getOrder, { loading, error, data }] = useLazyQuery<{ order: IOrder }>(
    GET_ORDER,
  );

  //*** SIDE EFFECTS ***//

  useEffect(() => {
    if (!id) {
      navigate({
        pathname: '/shop',
      });

      return;
    }

    getOrder({ variables: { id } });
  }, [getOrder, id, navigate]);

  useEffect(() => {
    if (error) {
      messageApi.open({
        type: 'error',
        content: `Could not find an order with id ${id}.`,
      });

      navigate({
        pathname: '/shop',
      });
    }
  }, [error, id, messageApi, navigate]);

  if (loading) return <Spin />;

  return (
    <>
      {messageContextHolder}
      {data && data.order ? (
        <Order
          items={data.order.items}
          total={data.order.total}
          orderStatus={data.order.status}
          isReadonly={true}
          savedDeliveryAddress={data.order.deliveryAddress}
        />
      ) : (
        <>Order not found</>
      )}
    </>
  );
};

export default Orders;
