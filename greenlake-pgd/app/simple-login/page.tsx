'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DebugAuthInfo from '../components/DebugAuthInfo';

// Simple client-side authentication for demo purposes
export default function SimpleLoginPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState<string | null>(null);
  const [loginInProgress, setLoginInProgress] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('simple_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Por favor, introduzca un nombre de usuario y contraseña');
      return;
    }
    
    setLoginInProgress(true);
    setError(null);
    
    try {
      // Simple authentication - accept any credentials
      const newUser = {
        id: `user-${Date.now()}`,
        username: formData.username,
        name: formData.username,
        email: `${formData.username}@example.com`,
        settings: {
          preferredView: 'map',
          darkMode: false,
          language: 'es',
        }
      };
      
      // Store user in localStorage
      localStorage.setItem('simple_user', JSON.stringify(newUser));
      
      // Update state
      setUser(newUser);
      setIsAuthenticated(true);
      
      // Show success message
      alert(`¡Bienvenido/a ${formData.username}! Inicio de sesión exitoso.`);
      
      // Redirect to home page
      setTimeout(() => {
        router.push('/');
      }, 500);
      
    } catch (error) {
      console.error('Error during login:', error);
      setError('Ocurrió un error al iniciar sesión');
    } finally {
      setLoginInProgress(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('simple_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // If already logged in, show a different UI
  if (isAuthenticated && user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-green-50">
        <DebugAuthInfo />
        
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <div className="h-20 w-20 rounded-full bg-[#10B981] text-white text-2xl mx-auto flex items-center justify-center">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <h1 className="mt-4 text-2xl font-bold">¡Hola, {user.username}!</h1>
            <p className="mt-2 text-gray-600">Ya has iniciado sesión</p>
          </div>
          
          <div className="mt-8 space-y-4">
            <button
              onClick={() => router.push('/')}
              className="w-full py-2 px-4 bg-[#10B981] text-white rounded-lg hover:bg-[#065F46] transition-colors"
            >
              Ir a la página principal
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-green-50">
      <DebugAuthInfo />
      
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg transform transition-all hover:shadow-2xl duration-300">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#065F46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <h1 className="mt-4 text-3xl font-extrabold text-center text-gray-900">
            Inicio de Sesión Simplificado
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Introduce cualquier nombre de usuario y contraseña para continuar
          </p>
        </div>
        
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border-l-4 border-red-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                  placeholder="usuario123"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 px-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loginInProgress}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-[#10B981] hover:bg-[#065F46] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10B981] transform transition-all duration-150 ease-in-out ${loginInProgress ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
            >
              {loginInProgress ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  Iniciar sesión
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Para esta demo, puedes usar cualquier usuario y contraseña
          </p>
        </div>
      </div>
      
      <footer className="mt-8 text-center text-gray-500 text-xs">
        &copy; 2025 Greenlake City. Todos los derechos reservados.
      </footer>
    </div>
  );
}
