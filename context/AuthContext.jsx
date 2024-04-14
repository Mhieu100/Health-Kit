import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const login = (email, password) => {
    // Here you would typically perform authentication, like calling an API
    // For demonstration purposes, let's just set the user directly
    setUser({ email, password });
  };

  const register = (email, password) => {
    // Here you would typically perform registration, like calling an API
    // For demonstration purposes, let's just set the user directly
    setUser({ email, password });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
