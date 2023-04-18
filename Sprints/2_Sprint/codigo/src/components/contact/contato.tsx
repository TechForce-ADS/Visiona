import React from 'react';
import local from '../../imagens/local.png';

import '../../App.css'


//import insta from '../../imagens/insta.png';




const Contact: React.FC = () => {
  return (
    <>
      <div className="bannerCont"></div>
      <div className="ContContent">
        <h1>Nossos Contatos</h1>

        <div className="contato">
          <div className="contato-input">
            <span>
              <label>
                <h3>Nome Completo</h3>
              </label>
              <input type="text" placeholder=""></input>
            </span>
            <span>
              <label>
                <h3>Email</h3>
              </label>
              <input type="text" placeholder=""></input>
            </span>
            <span>
              <label>
                <h3>Cidade</h3>
              </label>
              <input type="text" placeholder=""></input>
            </span>
            <span>
              <label>
                <h3>Estado</h3>
              </label>
              <input type="text" placeholder=""></input>
            </span>
            <span>
              <label>
                <h3>País</h3>
              </label>
              <input type="text" placeholder=""></input>
            </span>

          </div>
          <div className="contato-text">
            <h2>Endereço</h2>
            <h3>Visiona Tecnologia espacial S.A</h3>
            <h3>Estrada Dr. Altino Bondesan, 500</h3>
            <h3>Distrito de Eugênio de Melo - CEP:12247-016</h3>
            <h3>São José dos Campos - São Paulo - Brasil</h3>
            <img src={local} alt="Mapa" id="local"></img>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact;