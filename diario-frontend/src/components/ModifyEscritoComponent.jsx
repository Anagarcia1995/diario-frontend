import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/modify.css';

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

  const handleActualizar = async () => {
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

  const handleCancelar = () => {
    navigate('/list-escritos');
  };

  return (
    <div className='form-modify-container'>
      <h2>Editar Escrito</h2>
      <div>
        <div className="form-modify-content">
          <span className="form-modify-item">Título:</span>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

          <span className="form-modify-item">Contenido:</span>
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)} required />

          <span className="form-modify-item">Frase del día:</span>
          <input type="text" value={fraseDelDia} onChange={(e) => setFraseDelDia(e.target.value)} />

          <span className="form-modify-item">Necesito un respiro de:</span>
          <input type="text" value={necesitoUnRespiroDe} onChange={(e) => setNecesitoUnRespiroDe(e.target.value)} />
        </div>

        <div className='form-btn-modify'>
          <button className="form-btn" onClick={handleActualizar}>Actualizar</button>
          <button className="form-btn" onClick={handleCancelar}>Cancelar</button> 
        </div>
      </div>
    </div>
  );
};

export default ModifyEscrito;
