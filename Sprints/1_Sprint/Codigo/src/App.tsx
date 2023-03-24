import React from 'react';
import logo from './logo.png';
import satelitegif from './satelite.gif';
//import caro from './caro.jpg';
import espal from './espal.jpg';
import five from './five.jpg';
import icon from './icon.png';
//import insta from './insta.png';
import local from './local.png';

import './App.css';



function App() {
  return (
    <>
      <div className="nav-bar">
          <div className="logo-nav">
              <img src={logo} alt="Logo Visiona"></img>
          </div>
          <div className="linha">
              <div className="linha-cor">
              </div>
          </div>
          <div className="nav-text" id="home">Pagina inicial</div>
          <div className="nav-text" id="dash">Dashbord</div>
          <div className="nav-text" id="list">Listagem</div>
          <div className="nav-text" id="cont">Contato</div>
          <div className="nav-text" id="perf">Meu Perfil</div>
          <div className="icon-nav">
              <img src={icon} alt="Icon"></img>
          </div>
      </div>
      <hr></hr>

      <div className="menu">
          <h4 id="Mhome">Pagina inicial</h4>
          <h4 id="Mdash">Dashbord</h4>
          <h4 id="Mlist">Listagem</h4>
          <h4 id="Mcont">Contato</h4>
          <h4 id="Mperf">Meu Perfil</h4>
      </div>
      <div className="banner">
          <h2>A integradora <b>Brasileira</b> de sistemas espaciais</h2>
          <h3>Resultante de uma iniciativa única do Governo brasileiro de estimular a criação de uma empresa integradora na 
              indústria espacial, a Visiona é uma joint-venture entre a Embraer Defesa & Segurança e a Telebras.</h3>
          <img  src={espal} alt="Fundo do Espaço"></img>

      </div>

      <div className="five">
          <img src={five} alt="Áreas"></img>
          <hr id="line"></hr>
          
          <h3>Quem somos?</h3>
          
          <p> Visiona Tecnologia Espacial é uma joint-venture entre a Embraer Defesa & Segurança e a Telebras,
              voltada para a integração de sistemas espaciais. Criada em 2012 para atender os objetivos do Programa
              Naciona
              l de Atividades Espaciais (PNAE) e do Programa Estratégico de Sistemas Espaciais (PESE). A empresa foi a
              responsável pelo Programa do Satélite Geoestacionário de Defesa e Comunicações Estratégicas, o SGDC, lançado
              em 2017. Em 2018, a Visiona anunciou o programa do primeiro satélite projetado integralmente pela indústria
              nacional, o VCUB1, e concluiu com êxito o primeiro Sistema de Controle de Órbita e Atitude de satélites
              desenvolvido no Brasil. A Visiona também fornece produtos e serviços de Sensoriamento Remoto e
              Telecomunicações
              por satélite, bem como Aerolevantamento SAR nas Bandas X e P...</p>
          
          <hr></hr>

          
          <h3>Missão</h3>
          

          <p> Ser a empresa brasileira integradora de soluções baseadas em sistemas espaciais, satisfazendo
              as necessidades de clientes nacionais e internacionais,
              trazendo retorno aos acionistas e à sociedade em geral.</p>

          

          <h3>Visão</h3>
          
          <p> Tornar-se a empresa brasileira, com atuação internacional, de referência em soluções espaciais integradas,
              com independência tecnológica,
              utilizando a cadeia fornecedora nacional e contribuindo para o desenvolvimento e para a soberania do país.
          </p>
          <h3>Valores</h3>
          <p>A prática dos nossos Valores Empresariais nos unem e modelam nossas atitudes,
              potencializando nossos resultados e assegurando a perpetuidade da Empresa.
          </p>

          <img src={satelitegif} alt="Satélite animado" id="gif"></img>
      </div>


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

      <div className="container">
          <div className="cubo"></div>
          <div className="cubo"></div>
          <div className="cubo"></div>
          <div className="cubo"></div>
          <div className="cubao"></div>
      </div>

      <div className="footer">
          <div className="footer-text">
              <h2>Visiona Tecnologia espacial S.A</h2>
              <h2>2023© Todos os direitos reservados</h2>
          </div>
          <div className="footer-icons">
              <h3>Visiona Tecnologia espacial S.A</h3>
              <h3>Visiona Tecnologia espacial S.A</h3>
          </div>
          <div className="footer-icons2">
              <h3>@Visiona Espacial </h3>
              <h3>contato@visionaespacial.com.br</h3>
          </div>
      </div>
    </>    
  );
}
export default App;
