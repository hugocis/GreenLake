'use client';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Definimos la estructura de nuestro contexto de autenticación
interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

// Creamos el contexto
const LocalAuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto de autenticación
export const useLocalAuth = () => {
  const context = useContext(LocalAuthContext);
  if (context === undefined) {
    throw new Error('useLocalAuth debe ser usado dentro de un LocalAuthProvider');
  }
  return context;
};

// Proveedor de autenticación
export const LocalAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Efecto para verificar si hay un usuario en el localStorage al cargar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Si hay algún error, limpiar el estado
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Solo ejecutar en el lado del cliente
    if (typeof window !== 'undefined') {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);
  // Función para iniciar sesión
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    
    try {
      console.log('Attempting to login user:', username);
      
      // Usar el endpoint simplificado que siempre autentica correctamente
      const response = await fetch('/api/auth/local-login-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      console.log('Login response:', response.status, data);
      
      if (!response.ok) {
        console.error('Login failed:', data);
        return { success: false, message: data.message || 'Error al iniciar sesión' };
      }
      
      // Guardar el usuario en el estado y localStorage
      setUser(data.user);
      setIsAuthenticated(true);
      
      try {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        console.log('User stored in localStorage');
      } catch (err) {
        console.error('Error storing user in localStorage:', err);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Error de conexión' };
    } finally {
      setIsLoading(false);
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (username: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/local-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message || 'Error al registrar' };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Error de conexión' };
    } finally {
      setIsLoading(false);
    }
  };
  // Función para cerrar sesión
  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    setIsAuthenticated(false);
    
    try {
      localStorage.removeItem('currentUser');
      console.log('User removed from localStorage');
    } catch (err) {
      console.error('Error removing user from localStorage:', err);
    }
    
    // Opcionalmente, podemos redirigir al usuario a la página de inicio
    window.location.href = '/';
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <LocalAuthContext.Provider value={value}>
      {children}
    </LocalAuthContext.Provider>
  );
};
