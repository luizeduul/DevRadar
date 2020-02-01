import React from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/api';

import './styles.css';
import deleteIcon from '../../assets/delete.png';
import editIcon from '../../assets/edit.png';

function DevItem({ dev }) {
  async function handleDeleteDev() {
    if (window.confirm("Deseja realmente excluir esse dev?")) {
       await api.delete(`/devs/${dev._id}`);
      window.location.reload();
    }
  }

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a target="_blank" rel="noopener noreferrer" href={`http://github.com/${dev.github_username}`}>Acessar perfil do github</a>
      <div className="buttons">
        <Link to={`/devs/${dev._id}`}> <img src={editIcon} alt="Editar" /> </Link>
        <button className="buttonDelete" onClick={handleDeleteDev}> <img src={deleteIcon} alt="Excluir" /></button>
      </div>
    </li>
  )
}

export default DevItem;
