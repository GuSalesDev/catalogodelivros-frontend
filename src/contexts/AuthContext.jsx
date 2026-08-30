import { createContext, useContext, useState } from 'react';
import { login as loginApi, registrar as registrarApi } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (username, password) => {
    const response = await loginApi({ username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
  };

  const registrar = async (username, password) => {
    const response = await registrarApi({ username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const value = {
    token,
    isAuthenticated: !!token,
    login,
    registrar,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}