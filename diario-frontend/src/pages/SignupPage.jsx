import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css'; 
const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
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
        navigate('/list-escritos');
      } else {
        alert(data.message || 'Error al crear la cuenta. Intenta nuevamente.');
      }
    } catch (err) {
      console.error('Error durante el registro:', err);
      alert('Hubo un error al intentar registrarte');
    }
  };

  const handleToLogin = () => {
    navigate('/');
  };

  return (
    <div className="login">
      <div className="header">
        <h4 className='login-top'>Bienvenido.</h4>
      </div>
      <form>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required 
        />
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Apellidos" required 
        />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required 
        />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required 
        />
        <input type="button" value="Crear cuenta" onClick={handleSignup} 
        />
        <span className='login-text'>
          ¿Tienes cuenta? 
          <a href="#" onClick={handleToLogin}>Inicia sesión aquí</a>
        </span>
      </form>
    </div>
  );
};

export default SignupPage;
