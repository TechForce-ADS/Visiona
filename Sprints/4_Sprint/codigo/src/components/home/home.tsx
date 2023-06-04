
import satelitegif from '../../imagens/satelite.gif';
import React, { useEffect } from 'react';
import five from '../../imagens/five.jpg';
import './home.css'
import Navbar from '../navbar/navbar';



const Home: React.FC = () => { 

    useEffect(() => {
        // Verificar se há um usuário logado
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn ) {
          window.location.href = 'http://localhost:3000/';
        }
      }, []);
    
      useEffect(() => {
        // Verificar se há um usuário é admin
        const adm = localStorage.getItem('adm');
        if (adm !== 'true') {
          window.location.href = 'http://localhost:3000/HomeC';
        }
      }, []);
    
    return (
        <>
        
           <Navbar />
            <div className="banner">
                <h2>A integradora <b>Brasileira</b> de sistemas espaciais</h2>
                <h3>Resultante de uma iniciativa única do Governo Brasileiro de estimular a criação de uma empresa integradora na
                    indústria espacial, a Visiona é uma joint-venture entre a Embraer Defesa & Segurança e a Telebras.</h3>
            </div>
<div className='homeContainer'>
            <div className="five">
                <img src={five} alt="Áreas">
                </img>

                <h3>Quem somos?</h3>
                <br>
                </br>

                <p> Visiona Tecnologia Espacial é uma joint-venture entre a Embraer Defesa & Segurança e a Telebras,
                    voltada para a integração de sistemas espaciais. Criada em 2012 para atender os objetivos do Programa
                    Naciona
                    l de Atividades Espaciais (PNAE) e do Programa Estratégico de Sistemas Espaciais (PESE). A empresa foi a
                    responsável pelo Programa do Satélite Geoestacionário de Defesa e Comunicações Estratégicas, o SGDC, lançado
                    em 2017. Em 2018, a Visiona anunciou o programa do primeiro satélite projetado integralmente pela indústria
                    nacional, o VCUB1, e concluiu com êxito o primeiro Sistema de Controle de Órbita e Atitude de satélites
                    desenvolvido no Brasil. A Visiona também fornece produtos e serviços de Sensoriamento Remoto e
                    Telecomunicações
                    por satélite, bem como Aerolevantamento SAR nas Bandas X e P...
                    
                    
                </p>
                <br>
                </br>
            
                <h3>Missão</h3>
                <br>
                </br>

                <p> Ser a empresa brasileira integradora de soluções baseadas em sistemas espaciais, satisfazendo
                    as necessidades de clientes nacionais e internacionais,
                    trazendo retorno aos acionistas e à sociedade em geral.</p>

                <br>
                </br>

                <h3>Visão</h3>
                <br></br>

                <p> Tornar-se a empresa brasileira, com atuação internacional, de referência em soluções espaciais integradas,
                    com independência tecnológica,
                    utilizando a cadeia fornecedora nacional e contribuindo para o desenvolvimento e para a soberania do país.
                </p>
                <br></br>

                <h3>Valores</h3>
                <br></br>
                <p>A prática dos nossos Valores Empresariais nos unem e modelam nossas atitudes,
                    potencializando nossos resultados e assegurando a perpetuidade da Empresa.
                </p>
                <br></br>

                <img src={satelitegif} alt="Satélite animado" id="gif"></img>
            </div>
            </div>

        </>
    )
}






export default Home;