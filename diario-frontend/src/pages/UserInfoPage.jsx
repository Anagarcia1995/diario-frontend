import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserInfoPage = () => {
  const { idUser: idFromParams } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const idUserFromLocalStorage = localStorage.getItem('idUser');
    if (!idUserFromLocalStorage || idUserFromLocalStorage !== idFromParams) {
      navigate('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${idFromParams}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setName(data.name);
          setLastName(data.lastName);
          setEmail(data.email);
          setProfilePicture(data.profilePicture);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
        navigate('/');
      }
    };

    fetchUserData();
  }, [idFromParams, navigate]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/user/${idFromParams}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, lastName, email, profilePicture }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setIsEditing(false);
      } else {
        console.log('Error al actualizar los datos:', data.message);
      }
    } catch (error) {
      console.error('Error al editar la información del usuario:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/${idFromParams}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        localStorage.removeItem('idUser');
        navigate('/');
      } else {
        console.log('Error al eliminar la cuenta');
      }
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div>
      <button onClick={() => navigate("/list-escritos")}>Volver</button>
      <h2>Información del usuario</h2>

      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <div>
            <label>Nombre:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Apellido:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Foto de perfil (opcional):</label>
            <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
          </div>
          <button type="submit">Actualizar información</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
        </form>
      ) : (
        <div>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Apellido:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Foto de perfil:</strong> {user.profilePicture || 'No hay foto de perfil'}</p>
          <button onClick={() => setIsEditing(true)}>Editar información</button>
          <button onClick={handleDeleteAccount}>Eliminar cuenta</button>
        </div>
      )}
    </div>
  );
};

export default UserInfoPage;
