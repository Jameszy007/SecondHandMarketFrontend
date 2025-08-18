import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setAuthed(authToken !== null);
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('authToken', token);
    setAuthed(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem('authToken');
    setAuthed(false);
  };

  return (
    <AuthContext.Provider value={{ authed, handleLoginSuccess, handleLogOut }}>
      {children}
    </AuthContext.Provider>
  );
};
