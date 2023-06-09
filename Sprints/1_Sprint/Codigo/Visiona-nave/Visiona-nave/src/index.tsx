import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';

import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';
import Contato from './components/contact/contato';
import Navbar from './components/navbar/navbar';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/footer';

 

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
      <Navbar />
        <Routes>
           <Route path='/Home' element={<Home />}/>
           <Route path='/Contato' element={<Contato />}/>
           <Route path='/Dashboard' element={<Dashboard />}/>
        </Routes>
       <Footer /> 
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);