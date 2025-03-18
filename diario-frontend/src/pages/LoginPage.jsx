import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('token_refresh', data.token_refresh);
        localStorage.setItem('idUser', data.idUser);
        navigate('/home');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error durante el login:', err);
      setError('Hubo un error al intentar iniciar sesión');
    }
  };

  const handleToRegister = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h1>Diario</h1>
      <h2>Inicia Sesión</h2>
      <div>
        <span>Email</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <span>Contraseña</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p>{error}</p>}
      <button onClick={handleLogin}>Iniciar sesión</button>
      <div>
        <span>¿No tienes cuenta?</span>
        <button onClick={handleToRegister}>Regístrate aquí</button>
      </div>
    </div>
  );
};

export default LoginPage;
