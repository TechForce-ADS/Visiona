import React from 'react';
import logo from '../../imagens/logo.png';
import icon from '../../imagens/icon.png';



import '../navbar/navbar.css'

//import styled from 'styled-components';
import { Link } from 'react-router-dom';





const Home: React.FC = () => { 
    return (
        <>
            <div className="nav-bar">
                <div className="logo-nav">
                    <img src={logo} alt="Logo Visiona"></img>
                    
                </div>
               {/* <div className="linha">
                    <div className="linha-cor">
                    </div>
                </div>
                 */}
                <Link to="/Home" className='nav-text'><div className="nav-text" id="home">Pagina inicial</div></Link>
                <Link to="/Dashboard" className='nav-text'><div className="nav-text" id="dash"> Dashbord </div></Link>
                <Link to="/Listagem" className='nav-text'><div className="nav-text" id="list">Listagem</div></Link>
                <Link to="/logout" className='nav-text'><div className="nav-text" id="perf">Logout</div></Link>
                <div className="icon-nav">
                    <img src={icon} alt="Icon"></img>
                </div>
            </div>
            <hr></hr>

            <div className="menu">
                <h4 id="Mhome">Pagina inicial</h4>
                <h4 id="Mdash">Dashbord</h4>
                <h4 id="Mlistagem">Listagem</h4>
                <h4 id="Mcont">Contato</h4>
                <h4 id="Mperf">Meu Perfil</h4>
                <h4 id="MLogin">Login</h4>
            </div>
            
        </>
    )
}






export default Home;