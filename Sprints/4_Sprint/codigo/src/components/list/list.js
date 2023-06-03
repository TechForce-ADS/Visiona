import { FaTrash, FaEye, FaPen } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './list.css';
import UserModal from './view';
import EditUserModal from './edit';
import ReactPaginate from 'react-paginate';
import DeleteUserModal from './delete';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import Navbar from '../navbar/navbar';

function List() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState({ column: '', direction: '' });
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const pageCount = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    // Verificar se há um usuário logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn ) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);

  useEffect(() => {
    // Verificar se há um usuário é admin
    const adm = localStorage.getItem('adm');
    if (adm !== 'true') {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);

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
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3333/users/${userToDelete}`);
      setUsers(users.filter((user) => user.id !== userToDelete));
      setDeleteSuccess(true);
    } catch (error) {
      alert('Não foi possível excluir o usuário');
    }
    setShowDeleteModal(false);
  };

  const handleCloseDeleteSuccess = () => {
    setDeleteSuccess(false);
  };


  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleSort = (column) => {
    if (sortOrder.column === column) {
      setSortOrder({
        ...sortOrder,
        direction: sortOrder.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortOrder({ column: column, direction: 'asc' });
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

  // Filtrar usuários com base no termo de pesquisa
  const filteredUsers = users.filter((user) =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Classificar usuários com base na coluna selecionada e direção
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortOrder.column] < b[sortOrder.column]) {
      return sortOrder.direction === 'asc' ? -1 : 1;
    }
    if (a[sortOrder.column] > b[sortOrder.column]) {
      return sortOrder.direction === 'asc' ? 1 : -1;
    }
    if (a.status && !b.status) {
      return -1;
    }
    if (!a.status && b.status) {
      return 1;
    }
    return 0;
  });

  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>

      <Navbar />
      <div className="bannerCont"></div>
      <div className="listContent">
        <h1> Listagem </h1>

        <div className="BarraPesq">
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="Pesquisa"
          />
        </div>
        <table id='table-container'>
          <thead>
            <tr>
              <th onClick={() => handleSort('nome')}>
                Nome
                {sortOrder.column === 'nome' && (
                  <span className={`arrow ${sortOrder.direction}`}></span>
                )}
              </th>
              <th onClick={() => handleSort('email')}>
                E-mail
                {sortOrder.column === 'email' && (
                  <span className={`arrow ${sortOrder.direction}`}></span>
                )}
              </th>
              <th onClick={() => handleSort('cpf')}>
                CPF
                {sortOrder.column === 'cpf' && (
                  <span className={`arrow ${sortOrder.direction}`}></span>
                )}
              </th>
              <th onClick={() => handleSort('adm')}>
                Nivel
                {sortOrder.column === 'adm' && (
                  <span className={`arrow ${sortOrder.direction}`}></span>
                )}
              </th>
              <th onClick={() => handleSort('status')}>
                Status
                {sortOrder.column === 'status' && (
                  <span className={`arrow ${sortOrder.direction}`}></span>
                )}
              </th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className={user.status ? '' : 'inativo'}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.cpf}</td>
                <td>{getAdm(user.adm)}</td>
                <td>{getStatus(user.status)}</td>
                <td>
                  <button onClick={() => handleViewUser(user)}>
                    <FaEye />
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
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Próximo'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />

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
        {showDeleteModal && (
          <DeleteUserModal
            isOpen={showDeleteModal}
            onDeleteConfirm={handleDeleteConfirm}
            onDeleteCancel={handleDeleteCancel}
          />
        )}
        {deleteSuccess && (
          <div className="SucessoDelete">
            <AiOutlineCheckCircle className="delete-success-icon" size="x2" color='green' />
            Usuário excluído com sucesso!
            <button id='deleteConfirm'  onClick={handleCloseDeleteSuccess}>Ok!</button>
          </div>
          
        )}
      </div>
    </>
  );
}

export default List;
