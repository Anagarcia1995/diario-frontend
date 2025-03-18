import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ModifyEscrito = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fraseDelDia, setFraseDelDia] = useState('');
  const [necesitoUnRespiroDe, setNecesitoUnRespiroDe] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchEscrito = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/escritos/${id}`);
      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);
      setFraseDelDia(data.fraseDelDia || '');
      setNecesitoUnRespiroDe(data.necesitoUnRespiroDe || '');
    } catch (error) {
      console.error('Error al obtener el escrito:', error);
    }
  };

  useEffect(() => {
    fetchEscrito();
  }, [id]);

  const handleActualizar = async (e) => {
    e.preventDefault();
    const updatedEscrito = { title, content, fraseDelDia, necesitoUnRespiroDe };

    try {
      const response = await fetch(`http://localhost:3000/api/escritos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEscrito),
      });

      if (response.ok) {
        alert('Escrito actualizado exitosamente');
        navigate('/list-escritos');
      } else {
        alert('Hubo un error al actualizar el escrito');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Editar Escrito</h2>
      <form onSubmit={handleActualizar}>
        <div>
          <label>Título:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Contenido:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div>
          <label>Frase del día:</label>
          <textarea value={fraseDelDia} onChange={(e) => setFraseDelDia(e.target.value)} />
        </div>
        <div>
          <label>Necesito un respiro de:</label>
          <textarea value={necesitoUnRespiroDe} onChange={(e) => setNecesitoUnRespiroDe(e.target.value)} />
        </div>
        <div>
          <button type="submit">Actualizar</button>
        </div>
      </form>
      <button onClick={() => navigate('/list-escritos')}>Cancelar</button>
    </div>
  );
};

export default ModifyEscrito;
