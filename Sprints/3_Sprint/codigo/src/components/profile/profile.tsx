import React from 'react';
import '../../App.css'
import Navbar from '../navbar/navbarComum';


import React from 'react';
import ReactDOM from 'react-dom';

interface InformacoesLoginProps {
  nomeUsuario: string;
  emailUsuario: string;
}

const InformacoesLogin: React.FC<InformacoesLoginProps> = ({
  nomeUsuario,
  emailUsuario,
}) => {
  return (
    <div>
      <h1>Informações de Login</h1>
      <p>Nome: {nomeUsuario}</p>
      <p>Email: {emailUsuario}</p>
    </div>
  );
};

// Definir as informações de login
const nomeUsuario = 'Exemplo';
const emailUsuario = 'exemplo@email.com';

ReactDOM.render(
  <InformacoesLogin nomeUsuario={nomeUsuario} emailUsuario={emailUsuario} />,
  document.getElementById('root')
);

export default Profile;