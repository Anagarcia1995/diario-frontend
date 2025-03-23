import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/create.css';

const CreateEscritoPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fraseDelDia, setFraseDelDia] = useState('');
  const [necesitoUnRespiroDe, setNecesitoUnRespiroDe] = useState('');
  const navigate = useNavigate();

  const handleCreateEscrito = async () => {
    if (!title || !content) {
      alert("El título y el contenido son obligatorios.");
      return;
    }

    const newEscrito = { title, content, fraseDelDia, necesitoUnRespiroDe };
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay token de autenticación');
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
        alert('Hubo un error al crear el escrito');
      }
    } catch (error) {
      alert('Hubo un error en la solicitud. Inténtalo más tarde.');
    }
  };

  const handleCancel = () => navigate('/list-escritos');

  return (
    <div className="form-create-container">
      <h2>¿Cómo te sientes?</h2>
      <div className="form-content">
        <span>Título:</span>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <span>Contenido:</span>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} required />

        <span>Frase del día:</span>
        <input type="text" value={fraseDelDia} onChange={(e) => setFraseDelDia(e.target.value)} />

        <span>Necesito un respiro de...</span>
        <input type="text" value={necesitoUnRespiroDe} onChange={(e) => setNecesitoUnRespiroDe(e.target.value)} />
      </div>

      <div className="form-btns">
        <button type="button" className="form-btn" onClick={handleCreateEscrito}>Guardar</button>
        <button type="button" className="form-btn" onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default CreateEscritoPage;
