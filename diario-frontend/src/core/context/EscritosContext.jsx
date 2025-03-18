import React, { createContext, useState, useEffect } from 'react';

export const EscritosContext = createContext();

export const EscritosProvider = ({ children }) => {
  const [escritos, setEscritos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEscritos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/escritos');
      const data = await response.json();
      setEscritos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los escritos: ", error);
    }
  };

  useEffect(() => {
    fetchEscritos();
  }, []);

  return (
    <EscritosContext.Provider value={{ escritos, loading, fetchEscritos }}>
      {children}
    </EscritosContext.Provider>
  );
};
