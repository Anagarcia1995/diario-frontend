import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateEscrito = () => navigate('/create-escrito');
  const handleListEscritos = () => navigate('/list-escritos');
  const handleUserInfo = () => {
    const idUser = localStorage.getItem('idUser');
    if (idUser) {
      navigate(`/user-info/${idUser}`);
    } else {
      navigate('/');
    }
  };

  const goLogin = () => navigate("/");

  return (
    <div>
      <div>
        <button onClick={goLogin}>Salir</button>
      </div>
      <h1>Diario</h1>
      <div>
        <button onClick={handleCreateEscrito}>¿Cómo te sientes?</button>
      </div>
      <div>
        <button onClick={handleListEscritos}>Historial de sentimientos</button>
      </div>
      <div>
        <button onClick={handleUserInfo}>Tu perfil</button>
      </div>
    </div>
  );
};

export default HomePage;
