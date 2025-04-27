'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalAuth } from './LocalAuthProvider';

// Create a context for the LocalNavbar component
export const LocalNavbarContext = createContext({
  isAuthenticated: false,
  user: null,
  logout: () => {},
});

// Provider component for the Navbar
export function LocalNavbarProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useLocalAuth();
  
  return (
    <LocalNavbarContext.Provider value={{ isAuthenticated, user, logout }}>
      {children}
    </LocalNavbarContext.Provider>
  );
}

// Custom hook for using the context
export const useLocalNavbar = () => useContext(LocalNavbarContext);
