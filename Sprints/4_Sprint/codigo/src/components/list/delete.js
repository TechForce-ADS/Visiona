import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';




function Delete({ isOpen, onDeleteConfirm, onDeleteCancel }) {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="deleteContainer">
        <div className="deleteUserModal">
          <div className="deleteSessao1">
          <h3 id='excluir'>Excluindo usuário</h3>
            <FontAwesomeIcon icon={faTriangleExclamation} size="4x" color='red'/>
            
            <p>Tem certeza de que deseja excluir o usuário?</p>
          </div>
          <div className="deleteSessao2">
            <button id="deleteButtonSim" onClick={onDeleteConfirm}>
              Sim
            </button>
            <button id="deleteButton" onClick={onDeleteCancel}>
              Não
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Delete;
  