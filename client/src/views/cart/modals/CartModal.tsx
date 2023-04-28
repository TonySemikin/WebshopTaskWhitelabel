import React from 'react';
import { Modal } from 'antd';
import { useModals } from '../../../common/contexts/ModalContext';
import Cart from '../Cart';

const CartModal: React.FC = () => {
  const { modals, setModals } = useModals();

  const closeModal = () => {
    setModals({ isCartModalOpen: false });
  };

  return (
    <Modal
      title="Cart"
      open={modals?.isCartModalOpen ?? false}
      footer={null}
      centered={true}
      closable={true}
      onCancel={closeModal}>
      <Cart onSubmitted={closeModal} />
    </Modal>
  );
};

export default CartModal;
