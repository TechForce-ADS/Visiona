import React from 'react';
import Modal from 'react-modal';
import "../../App.css"

const UserModal = (props) => {
  const { isOpen, user, onClose } = props;

  if (!user) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="user-modal">
      <h2>{user.nome}</h2>
      <p>Email: {user.email}</p>
      <p>CPF: {user.cpf}</p>
      <p>Perfil da conta: {user.adm ? 'Administrador' : 'Comum'}</p>
      <p>Criado em: {user.createdAt}</p>
      <p>Status: {user.status ? 'Ativo' : 'Inativo'}</p>
      <button onClick={onClose}>Fechar</button>
    </Modal>
  );
};

export default UserModal;