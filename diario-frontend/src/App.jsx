import React from 'react';
import './styles/global.css';
import './styles/header.css';
import './styles/footer.css';

import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

        <Route
          path="/create-escrito"element={
            <>
              <HeaderComponent /> <CreateEscritoPage />
            </>
          }
        />
        <Route
          path="/list-escritos"element={
            <>
              <HeaderComponent /> <ListEscritosPage />
            </>
          }
        />
        <Route
          path="/modify-escrito/:id"element={
            <>
              <HeaderComponent /> <ModifyEscritoComponent />
            </>
          }
        />
        <Route
          path="/user-info/:idUser" element={
            <>
              <HeaderComponent /> <UserInfoPage />
            </>
          }
        />
      </Routes>

      <FooterComponent />
    </Router>
  );
}

export default App;
