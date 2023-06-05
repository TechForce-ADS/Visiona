import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.css';
import Navbar from '../navbar/navbarComum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

function Profile() {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);

  function handleForgotPassword(email) {
    axios
      .post('http://localhost:3333/users/recover', {
        email: email,
      })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Email de recuperação de senha enviado com sucesso',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        let errorMessage = 'Ocorreu um erro ao enviar o email de recuperação de senha';
  
        if (error.response && error.response.status === 400) {
          const { message } = error.response.data;
          errorMessage = message;
        }
        Swal.fire({
          iconColor: '#fc5d00',
          icon: 'error',
          confirmButtonColor: '#fc5d00',
          text: errorMessage,
        });
      });
  }


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await axios.get(`http://localhost:3333/users/email/${email}`);
        const userData = response.data;
        setUser(userData);
        setEditedUser({ ...userData });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const getAdm = (adm) => {
    return adm ? 'Administrador' : 'Comum';
  };

  const handleEditUser = (user) => {
    setEditedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditSuccess = () => {
    setShowEditSuccessModal(false);
  };

  const handleSaveUser = async () => {
    try {
      await axios.put(`http://localhost:3333/users/${editedUser.id}`, editedUser);
      const response = await axios.get('http://localhost:3333/users');
      setUser(editedUser);
      setShowEditModal(false);
      setShowEditSuccessModal(true);
    } catch (error) {
      console.log(error);
      alert('Não foi possível atualizar o usuário');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <Navbar />
      <div className="profile">
        <div className="containerProfile">
          <FontAwesomeIcon icon={faUser} size="5x" color="#fc5d00" />
          <h2>Meus Dados</h2>
          {user && (
            <div>
              <p>
                <b>Nome:</b> {user.nome}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>CPF:</b> {user.cpf}
              </p>
              <p>
                <b>Cargo:</b> {getAdm(user.adm)}
              </p>
              <div className="alteraInfo">
                <button onClick={() => handleEditUser(user)}>Alterar Informações</button>
                <button onClick={() => handleForgotPassword(user.email)}>
                      Alterar Senha
                    </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditModal(false)}>
              &times;
            </span>
            <h2>Editar Informações</h2>
            <div>
              <label>Nome:</label>
              <input type="text" name="nome" value={editedUser.nome} onChange={handleChange} />
            </div>
            <div>
              <label>Email:</label>
              <input type="text" name="email" value={editedUser.email} onChange={handleChange} />
            </div>
            <div>
              <label>CPF:</label>
              <input type="text" name="cpf" value={editedUser.cpf} onChange={handleChange} />
            </div>
            <div className="botoesProfile">
              <button onClick={handleSaveUser}>Salvar</button>
              <button onClick={() => setShowEditModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showEditSuccessModal && (
        <div className="modal">
          <div className="modal-editP-content">
          <AiOutlineCheckCircle className="delete-success-icon" size="x2" color='green' />
            <h2>Informações alteradas com sucesso!</h2>
            <button id="editConfirm" onClick={handleCloseEditSuccess}>
              Ok!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
