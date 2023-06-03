import React, { useState, useEffect } from 'react';
import logo from '../../imagens/logo.png';
import logoLB from '../../imagens/logoLB.png';

import '../navbar/navbar.css';
import { Link, useLocation } from 'react-router-dom';

const Home: React.FC = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <>
      <div className="nav-bar">
      <div className="logo-nav-adm">
          <img src={isMobile ? logoLB : logo} alt="Logo Visiona"></img>
        </div>
        <div className="nav-links">
        <Link
            to="/Home"
            className={`nav-link ${location.pathname === '/Home' ? 'active' : ''}`}
          >
            {isMobile ? 'Início' : 'Página Inicial'}
          </Link>
          <Link
            to="/Dashboard"
            className={`nav-link ${location.pathname === '/Dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/Listagem"
            className={`nav-link ${location.pathname === '/Listagem' ? 'active' : ''}`}
          >
            Listagem
          </Link>
          <Link
            to="/logout"
            className={`nav-link ${location.pathname === '/logout' ? 'active' : ''}`}
          >
            Logout
          </Link>
      
        </div>
      </div>
      
      <hr></hr>
    </>
  );
};

export default Home;
