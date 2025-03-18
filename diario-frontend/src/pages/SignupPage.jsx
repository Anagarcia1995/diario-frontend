import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupFormComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, lastName, profilePicture }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('token_refresh', data.token_refresh);
        localStorage.setItem('idUser', data.user._id);
        navigate('/home');
      } else {
        setError(data.message || 'Error al crear la cuenta. Intenta nuevamente.');
      }
    } catch (err) {
      console.error('Error durante el registro:', err);
      setError('Hubo un error al intentar registrarte');
    }
  };

  const handleToLogin = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Diario</h1>
      <h2>Regístrate</h2>
      <div>
        <span>Nombre</span>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <span>Apellidos</span>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>
      <div>
        <span>Foto de perfil</span>
        <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <span>Contraseña</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p>{error}</p>}
      <button onClick={handleSignup}>Crear cuenta</button>
      <div>
        <span>¿Tienes cuenta?</span>
        <button onClick={handleToLogin}>Inicia sesión aquí</button>
      </div>
    </div>
  );
};

export default SignupFormComponent;
