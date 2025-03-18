import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListEscritosPage = () => {
  const [escritos, setEscritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEscritos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/escritos');
      const data = await response.json();
      setEscritos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los escritos:', error);
    }
  };

  useEffect(() => {
    fetchEscritos();
  }, []);

  const handleDeleteEscrito = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/escritos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEscritos(escritos.filter((escrito) => escrito._id !== id));
      } else {
        alert('Hubo un error al eliminar el escrito');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditEscrito = (id) => {
    navigate(`/modify-escrito/${id}`);
  };

  const handleVolver = () => {
    navigate('/home');
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString('es-ES', options);
  };

  const sortedEscritos = escritos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <h1>Diario</h1>
      <button onClick={handleVolver}>Volver</button>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          {sortedEscritos.map((escrito) => (
            <div key={escrito._id}>
              <h2>{escrito.title}</h2>
              <h4>{formatDate(escrito.createdAt)}</h4>
              <ul>
                <li>{escrito.content}</li>
                {escrito.fraseDelDia && <li>Frase del día: {escrito.fraseDelDia}</li>}
                {escrito.necesitoUnRespiroDe && <li>Necesito un respiro de: {escrito.necesitoUnRespiroDe}</li>}
              </ul>
              <button onClick={() => handleDeleteEscrito(escrito._id)}>Eliminar</button>
              <button onClick={() => handleEditEscrito(escrito._id)}>Editar</button>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListEscritosPage;
