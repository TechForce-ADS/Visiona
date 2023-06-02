import React from 'react';
import logo from '../../imagens/logo.png';
import icon from '../../imagens/icon.png';
import '../navbar/navbar.css'
import { Link, useLocation } from 'react-router-dom';

const Home: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <div className="nav-bar">
        <div className="logo-nav">
          <img src={logo} alt="Logo Visiona"></img>
        </div>
        <div className="nav-links">
          <Link
            to="/HomeC"
            className={`nav-link ${location.pathname === '/HomeC' ? 'active' : ''}`}
          >
            Página inicial
          </Link>
          <Link
            to="/Perfil"
            className={`nav-link ${location.pathname === '/Perfil' ? 'active' : ''}`}
          >
            Meu Perfil
          </Link>
          <Link
            to="/Contato"
            className={`nav-link ${location.pathname === '/Contato' ? 'active' : ''}`}
          >
            Contato
          </Link>
          <Link
            to="/logout"
            className={`nav-link ${location.pathname === '/logout' ? 'active' : ''}`}
          >
            Logout
          </Link>
        </div>
        <div className="icon-nav">
          <img src={icon} alt="Icon"></img>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

export default Home;
