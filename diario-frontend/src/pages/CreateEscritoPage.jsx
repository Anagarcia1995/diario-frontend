import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEscritoPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fraseDelDia, setFraseDelDia] = useState('');
  const [necesitoUnRespiroDe, setNecesitoUnRespiroDe] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateEscrito = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("El título y el contenido son obligatorios.");
      return;
    }

    const newEscrito = { title, content, fraseDelDia, necesitoUnRespiroDe };
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No hay token de autenticación');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/escritos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'auth-token': token },
        body: JSON.stringify(newEscrito),
      });

      if (response.ok) {
        alert('Escrito creado exitosamente');
        navigate('/list-escritos');
      } else {
        setError('Hubo un error al crear el escrito');
      }
    } catch (error) {
      setError('Hubo un error en la solicitud. Inténtalo más tarde.');
    }
  };

  const handleCancel = () => navigate('/home');

  return (
    <div>
      <h1>Diario</h1>
      <h2>Nueva entrada</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleCreateEscrito}>
        <div>
          <span>Título:</span>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <span>Contenido:</span>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div>
          <span>Frase del día:</span>
          <textarea value={fraseDelDia} onChange={(e) => setFraseDelDia(e.target.value)} />
        </div>
        <div>
          <span>Necesito un respiro de...</span>
          <textarea value={necesitoUnRespiroDe} onChange={(e) => setNecesitoUnRespiroDe(e.target.value)} />
        </div>
        <div>
          <button type="submit">Guardar</button>
        </div>
        <div>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEscritoPage;
