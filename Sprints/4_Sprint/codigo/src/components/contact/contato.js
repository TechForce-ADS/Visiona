import React, { useState } from 'react';
import local from '../../imagens/local.png';
import './contato.css';
import Navbar from '../navbar/navbarComum';
import { useEffect } from 'react';

function Contact() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('');

  const handleEnviarEmail = () => {
    const emailDestino = 'suportevisiona@gmail.com';
    const assunto = 'Contato pelo site';
    const corpoEmail = `Nome: ${nome}\nEmail: ${email}\nCidade: ${cidade}\nEstado: ${estado}\nPaís: ${pais}`;
    const link = `mailto:${emailDestino}?subject=${assunto}&body=${encodeURIComponent(corpoEmail)}`;
    window.location.href = link;
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
    <>
      <Navbar />
      <div className='contTitulo'>
        <h1>Contato</h1>
      </div>
      <div className="ContContent">
          <div className="contato-input">
          <div className="contato-text">
          <h2 id="formulario">Caso tenha alguma questão preencha o formulário abaixo:</h2>

          </div>
            <span>
              <label>
                <h3>Nome Completo</h3>
              </label>
              <input type="text" placeholder="" value={nome} onChange={(e) => setNome(e.target.value)}></input>
            </span>
            <span>
              <label>
                <h3>Email</h3>
              </label>
              <input type="text" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </span>
            <span>
              <label>
                <h3>Cidade</h3>
              </label>
              <input type="text" placeholder="" value={cidade} onChange={(e) => setCidade(e.target.value)}></input>
            </span>
            <span>
              <label>
                <h3>Estado</h3>
              </label>
              <input type="text" placeholder="" value={estado} onChange={(e) => setEstado(e.target.value)}></input>
            </span>
            <span>
              <label>
                <h3>País</h3>
              </label>
              <input type="text" placeholder="" value={pais} onChange={(e) => setPais(e.target.value)}></input>
            </span>
            <button className="btn-contact" onClick={handleEnviarEmail}>Enviar</button>
          </div>
          <div className="contato-text">
            <h2>ENDEREÇO</h2>
            <h3>Visiona Tecnologia espacial S.A</h3>
            <h3>Estrada Dr. Altino Bondesan, 500</h3>
            <h3>Distrito de Eugênio de Melo - CEP:12247-016</h3>
            <h3>São José dos Campos - São Paulo - Brasil</h3>
            <img src={local} alt="Mapa" id="local"></img>
            <br></br>
          </div>
        </div>


    </>
  )
}

export default Contact;