import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from '../services/api'; // 👈 usamos api en lugar de axios

interface User {
  id: number;
  username: string;
  email: string;
  rol: 'cliente' | 'vendedor' | 'admin';
}

interface AuthContextProps {
  user: User | null;
  login: (data: { username: string; password: string }) => Promise<void>;
  register: (data: {
    username: string;
    email: string;
    password: string;
    rol: string;
    nombre: string;
    telefono: string;
    direccion: string;
    identificacion: string;
    tipo_cliente: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async ({ username, password }: { username: string; password: string }) => {
    const res = await api.post('/auth/login', { username, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setUser(res.data.user);
  };

  const register = async (data: {
    username: string;
    email: string;
    password: string;
    rol: string;
    nombre: string;
    telefono: string;
    direccion: string;
    identificacion: string;
    tipo_cliente: string;
  }) => {
    await api.post('/usuarios', data); // ✅ Este endpoint guarda también en clientes
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
