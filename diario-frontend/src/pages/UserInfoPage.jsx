import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/user-info.css'; // Importar el estilo para esta página
import '../styles/edit-user-info.css';

const UserInfoPage = () => {
  const { idUser: idFromParams } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [profilePictureFile, setProfilePictureFile] = useState(null); // Para manejar el archivo de imagen
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
          console.log('Datos del usuario:', data); 
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
  
  if (isEditing) {
    console.log('Valor de email en edición:', email);
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('lastName', lastName);
    formData.append('email', email);
  
    if (profilePictureFile) {
      formData.append('profilePicture', profilePictureFile);
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/user/${idFromParams}`, {
        method: 'PATCH',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error al actualizar los datos:', errorData); 
      } else {
        const data = await response.json();
        setUser(data);
        setIsEditing(false);
        navigate(`/user-info/${idFromParams}`);
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

  const goBack = () => {
    navigate('/list-escritos');
  };

  const handleFileChange = (e) => {
    setProfilePictureFile(e.target.files[0]);
    setProfilePicture(URL.createObjectURL(e.target.files[0])); 
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="user-info-container">
      <div className='user-info-top'>
        <h2>Información del usuario</h2>
        <button className="go-back-btn" onClick={goBack}>Volver</button>
      </div>

      {isEditing ? (
        <div className="form-container">
          <div className="form-group">
            <span>Nombre:</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <span>Apellido:</span>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="form-group">
            <span>Email:</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <span>Foto de perfil (opcional):</span>
            <input 
              type="file" 
              onChange={handleFileChange} 
              accept="image/*"
            />
            
            {profilePicture && !profilePictureFile && (
              <img 
                src={`http://localhost:3000/${profilePicture}`} 
                alt="Vista previa de foto de perfil" 
                className="preview-img"
              />
            )}
            {profilePictureFile && (
              <img 
                src={URL.createObjectURL(profilePictureFile)} 
                alt="Vista previa de foto de perfil seleccionada" 
                className="preview-img"
              />
            )}
          </div>
          <div className='act-del-btn-container'>
            <button className="act-del-btn" onClick={handleEditSubmit}>Actualizar información</button>
            <button className="act-del-btn" type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </div>
      ) : (
        <div className="user-details">
          <p><b>Nombre:</b> {user.name}</p>
          <p><b>Apellido:</b> {user.lastName}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Foto de perfil:</b> 
            {user.profilePicture ? (
              <img 
                src={`http://localhost:3000/${user.profilePicture}`} 
                alt="Foto de perfil" 
                className="profile-img"
              />
            ) : 'No hay foto de perfil'}
          </p>
        </div>
      )}

      {!isEditing && (
        <div>
          <button className="edit-delete-btn" onClick={() => setIsEditing(true)}>Editar información</button>
          <button className="edit-delete-btn" onClick={handleDeleteAccount}>Eliminar cuenta</button>
        </div>
      )}
    </div>
  );
};

export default UserInfoPage;
