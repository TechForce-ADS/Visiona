import React from 'react';
import './logout.css'

function Logout() {


  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('email');
  window.location.href = 'http://localhost:3000/';
  
  return (
    <div>
      <h1>Saindo da conta...</h1>
    </div>
  );
}

export default Logout;