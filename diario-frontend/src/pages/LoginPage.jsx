import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login-signup.css';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        navigate('/list-escritos');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error durante el login:', err);
      alert('Hubo un error al intentar iniciar sesión');
    }
  };

  const handleToRegister = () => {
    navigate('/signup');
  };

  return (
    <div className="login">
      <div className="header">
        <h4 className='login-top'>Hola de nuevo.</h4>
      </div>
      <form>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required 
        />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required 
        />
        <input type="button" value="Iniciar sesión" onClick={handleLogin} 
        />
        <span className='login-text'>
          ¿No tienes cuenta? 
          <a href="#" onClick={handleToRegister}>Regístrate aquí</a>
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
