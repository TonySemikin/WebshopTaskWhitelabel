import { IOrderItem } from '../queries/order.query';
import './scss/OrderItem.scss';

interface OrderItemProps {
  index: number;
  item: IOrderItem;
}

const OrderItem: React.FC<OrderItemProps> = ({ index, item }) => {
  return (
    <div className="order-item">
      <div className="order-item__info">
        <img
          className="order-item__info-image"
          src={`https://loremflickr.com/200/200/abstract?lock=${94862 + index}`}
          alt={item.productName}
        />
        <span className="order-item__info-name">{item.productName}</span>
      </div>
      <div className="order-item__details">
        <span>Quantity: {item.quantity}</span>
        <span>Total: € {item.total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderItem;
