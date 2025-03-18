import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateEscritoPage from './pages/CreateEscritoPage';
import ListEscritosPage from './pages/ListEscritosPage';
import ModifyEscritoComponent from './components/ModifyEscritoComponent';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserInfoPage from './pages/UserInfoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-escrito" element={<CreateEscritoPage />} />
        <Route path="/list-escritos" element={<ListEscritosPage />} />
        <Route path="/modify-escrito/:id" element={<ModifyEscritoComponent />} />
        <Route path="/user-info/:idUser" element={<UserInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
