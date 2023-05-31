import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.css';
import Navbar from '../navbar/navbarComum';


function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('email');

    axios
      .get(`http://localhost:3333/users/email/${email}`)
      .then((response) => {
        const userData = response.data;
        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getAdm = (adm) => {
    return adm ? 'Administrador' : 'Comum';
  };

 
  useEffect(() => {
    // Verificar se há um usuário logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
      // Redirecionar para a tela de login
      window.location.href = 'http://localhost:3000/';
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="containerProfile">
        <h2>Meu Perfil</h2>
        {user && (
          <div>
            <p>Nome: {user.nome}</p>
            <p>Email: {user.email}</p>
            <p>CPF: {user.cpf}</p>
            <p>Cargo: {getAdm(user.adm)}</p>
          </div>
        )}
      </div>
    </div>
  );
}


export default Profile;


