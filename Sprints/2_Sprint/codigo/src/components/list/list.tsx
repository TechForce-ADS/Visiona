import React from 'react';
import '../../App.css'

const Listagem: React.FC = () => {
  return (
    <>
        <div>
          <h1 className='title'> Listagem de Funcionário</h1>
        </div>

        <div className='Pesquisar'>
          <input type="text" id="txtPesquisa" placeholder="Pesquisa"/>
          <button id="btnPesquisar">Pesquisar</button>
          <button id='btnAdicionar'> Adicionar</button>
    
        </div>
        <br></br>
        <hr />

        <div>
          <h4>Descobrir como puxar as Informações do banco dentro da tabela</h4>

          
        </div>
    </>
  )  
}

export default Listagem;