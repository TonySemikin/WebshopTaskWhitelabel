import React from 'react';
import { Modal } from 'antd';
import { useModals } from '../contexts/ModalContext';
import UserForm from '../forms/UserForm';

const UserModal: React.FC = () => {
  const { modals, setModals } = useModals();

  const closeModal = () => {
    setModals({ isUserModalOpen: false });
  };

  return (
    <Modal
      title="Sign Up"
      open={modals?.isUserModalOpen}
      footer={null}
      centered={true}
      closable={false}>
      <UserForm onSubmitted={closeModal} />
    </Modal>
  );
};

export default UserModal;
