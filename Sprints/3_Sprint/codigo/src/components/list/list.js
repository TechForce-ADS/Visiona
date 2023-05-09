import { FaTrash, FaEye, FaPen } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './list.css';
import UserModal from './view';
import EditUserModal from './edit';
import ReactPaginate from 'react-paginate';

import Navbar from '../navbar/navbar';

function List() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState({ column: '', direction: '' });

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const pageCount = Math.ceil(users.length / usersPerPage);



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
    if (sortOrder.column === 'cpf') {           // se a coluna selecionada for CPF
      if (sortOrder.direction === 'asc') {      // se a direção de classificação for ascendente
        return a.cpf.localeCompare(b.cpf);      // comparar os CPFs e retornar o resultado
      } else {                                  // caso contrário, se a direção de classificação for descendente
        return b.cpf.localeCompare(a.cpf);      // comparar os CPFs invertidos e retornar o resultado
      }
    } else if (sortOrder.column === 'email') {  // caso contrário, se a coluna selecionada for e-mail
      if (sortOrder.direction === 'asc') {      // se a direção de classificação for ascendente
        return a.email.localeCompare(b.email);  // comparar os e-mails e retornar o resultado
      } else {                                  // caso contrário, se a direção de classificação for descendente
        return b.email.localeCompare(a.email);  // comparar os e-mails invertidos e retornar o resultado
      }
    } if                                        // caso contrário, se nenhuma coluna for selecionada, retornar 0 (sem classificação)
      (a.status && !b.status) {                 // a está ativo, b está inativo
      return -1; 
    }
    if (!a.status && b.status) {                // a está inativo, b está ativo
      return 1; 
    }
    return 0; // a e b têm o mesmo status
  });

  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <Navbar />
      <div className="bannerCont"></div>
      <div className="listContent">
        <div className="BarraPesq">
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="Pesquisa"
          />
          <select value={sortOrder.column} onChange={(e) => handleSort(e.target.value)} className='ordenacao'>
            <option value="">Ordenar por</option>
            <option value="cpf">CPF</option>
            <option value="email">Email</option>
          </select>
          <button className="btn-adicionar" >Adicionar</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Conta</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className={user.status ? "" : "inativo"}>
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
      </div>
    </>
  );

}

export default List;
