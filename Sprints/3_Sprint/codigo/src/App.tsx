import React from 'react';
//import Login from './components/login/login';
//import Contact from './components/contact/contato';
//import Dashboard from './components/dashboard/dashboard';
//import Profile from './components/profile/profile';
//import List from './components/list/list';



const App: React.FC = () => {
  return (
    <>
     
    </>

  )
}

import React, { useState } from 'react';
import Profile from './Profile';
import Login from './Login';

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  // Função para efetuar o login e definir os dados do usuário logado
  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  // Função para efetuar o logout
  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div>
      {/* Resto do conteúdo da sua aplicação */}
      {loggedInUser ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <Profile user={loggedInUser} />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {/* Resto do conteúdo da sua aplicação */}
    </div>
  );
};

export default App;

export default App;