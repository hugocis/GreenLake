'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Define the SimpleAuth context type
interface SimpleAuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the context with default values
const SimpleAuthContext = createContext<SimpleAuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
});

// Custom hook to use the auth context
export const useSimpleAuth = () => useContext(SimpleAuthContext);

// Provider component
export default function SimpleAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('simple_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Clear any corrupted state
        localStorage.removeItem('simple_user');
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // For our simplified demo, we accept any credentials
      const newUser = {
        id: `user-${Date.now()}`,
        username,
        name: username,
        email: `${username}@example.com`,
        settings: {
          preferredView: 'map',
          darkMode: false,
          language: 'es',
        }
      };
      
      // Store in localStorage
      localStorage.setItem('simple_user', JSON.stringify(newUser));
      
      // Update state
      setUser(newUser);
      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('simple_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Context provider value
  const value: SimpleAuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <SimpleAuthContext.Provider value={value}>
      {children}
    </SimpleAuthContext.Provider>
  );
}
