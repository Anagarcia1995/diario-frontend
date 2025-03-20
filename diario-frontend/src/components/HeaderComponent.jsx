import React from 'react';
import '../styles/header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem('idUser');
    navigate('/');
  }

  // Obtener el idUser del localStorage
  const idUser = localStorage.getItem('idUser');

  return (
    <header className="header">
      <div className='top-bar'>
        <h1>Diario</h1>
        <button className='logout' onClick={logout}>Cerrar sesión</button>
      </div>

      <nav>
        <ul>
          <li><a href="/create-escrito">¿Cómo te sientes?</a></li>
          <li><a href="/list-escritos">Historial de sentimientos</a></li>
          {idUser && <li><a href={`/user-info/${idUser}`}>Mi perfil</a></li>} 
        </ul>
      </nav>
    </header>
  );
};

export default Header;
