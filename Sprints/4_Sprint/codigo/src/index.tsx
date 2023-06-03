import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';

import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';
import Contato from './components/contact/contato';
import HomeC from './components/home/homeComum';
import Login from './components/login/Login';
import Perfil from './components/profile/profile';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/footer';
import Listagem from './components/list/list';
import Logout from './components/logout/logout';
import Recuperar from './components/recuperar/recuperar';

 

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
      
        <Routes>
           <Route path='/Home' element={<Home />}/>
           <Route path='/HomeC' element={<HomeC />}/>
           <Route path='/Listagem' element={<Listagem />}/>
           <Route path='/Perfil' element={<Perfil />}/>
           <Route path='/Logout' element={<Logout />}/>
           <Route path='/Contato' element={<Contato />}/>
           <Route path='/Dashboard' element={<Dashboard />}/>
           <Route path='/' element={<Login />}/>
           <Route path='/Recuperar' element={<Recuperar/>}/>
        </Routes>

      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);