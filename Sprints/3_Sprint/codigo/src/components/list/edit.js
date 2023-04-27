import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-modal';

function EditUserModal(props) {
  const { isOpen, user, onClose, onEdit } = props;

  const [updatedName, setUpdatedName] = useState(user.nome);
  const [updatedEmail, setUpdatedEmail] = useState(user.email);
  const [updatedPassword, setUpdatedPassword] = useState(user.senha);
  const [updatedStatus, setUpdatedStatus] = useState(user.status);

  const [nome, setNome] = useState(props.user.nome);
  const [email, setEmail] = useState(props.user.email);
  const [senha, setSenha] = useState(props.user.senha);
  const [status, setStatus] = useState(props.user.status);


  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:3333/users/${user.id}`, {
        nome: updatedName,
        email: updatedEmail,
        senha: updatedPassword,
        status: updatedStatus
      });
      
      // Atualiza o estado do componente com os valores atualizados
      setNome(updatedName);
      setEmail(updatedEmail);
      setSenha(updatedPassword);
      setStatus(updatedStatus);

      onClose();
      window.location.reload();
    } catch (error) {
      alert('Não foi possível atualizar o usuário');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="edit-user-modal">
      <h2>Editar Usuário</h2>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          id="nome"
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="senha">Senha:</label>
        <input
          id="senha"
          type="password"
          value={updatedPassword}
          onChange={(e) => setUpdatedPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <input
          id="status"
          type="checkbox"
          name="status"
          checked={updatedStatus}
          onChange={(e) => setUpdatedStatus(e.target.checked)}
        />
      </div>
      <div>
        <button onClick={handleUpdateUser}>Salvar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </Modal>
  );
}

EditUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditUserModal;
