import { FaTrash, FaEye, FaPen } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import UserModal from './view';
import EditUserModal from './edit';

function List() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3333/users/');
      setUsers(response.data);
    }
    fetchData();
  }, []);

  if (users.length === 0) {
    return <div>Carregando...</div>;
  }
  const getStatus = (status) => {
    return status ? 'Ativo' : 'Inativo';
  };

  const getAdm = (adm) => {
    return adm ? 'Administrador' : 'Comum';
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Deseja realmente excluir o usuário?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3333/users/${id}`);
        setUsers(users.filter((user) => user.id !== id));
        alert('Usuário excluído com sucesso!');
      } catch (error) {
        alert('Não foi possível excluir o usuário');
      }
    }
  };

  const handleSaveUser = async (user) => {
    try {
      await axios.put(`http://localhost:3333/users/${user.id}`, user);
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      alert('Usuário atualizado com sucesso!');
    } catch (error) {
      console.log(error);
      alert('Não foi possível atualizar o usuário');
    }
    setShowEditModal(false);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const filteredUsers = users.filter((user) =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a.status && !b.status) return -1; // a está ativo, b está inativo
    if (!a.status && b.status) return 1; // a está inativo, b está ativo
    return 0; // a e b têm o mesmo status
  });

  return (
    <>
    <div className="bannerCont">
      
    </div>

    <div className="listContent">
    <div className="ContContent">
        <h1>Listagem</h1>
      </div>
    
      <div className="BarraPesq">
        



        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="Pesquisa"
        />
        <button className="btn-adicionar" >Adicionar</button>

      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Conta</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id} className={user.status ? "" : "inativo"}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{getAdm(user.adm)}</td>
              <td>{getStatus(user.status)}</td>
              <td>
                <button onClick={() => handleViewUser(user)}>
                  <FaEye />{" "}
                </button>
                <button onClick={() => handleDelete(user.id)}>
                  <FaTrash />
                </button>
                <button onClick={() => handleEditUser(user)}>
                  <FaPen />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <UserModal
          isOpen={showModal}
          user={selectedUser}
          onClose={handleCloseModal}
        />
      )}

      {showEditModal && (
        <EditUserModal
          isOpen={showEditModal}
          user={selectedUser}
          onSave={handleSaveUser}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
    </>
  );

}

export default List;