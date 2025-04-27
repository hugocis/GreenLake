"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocalAuth } from '../providers/LocalAuthProvider';

export default function LocalNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useLocalAuth();
  const pathname = usePathname();
  
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    // No need to redirect since the useLocalAuth hook will update the state
  };
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-[#065F46] flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>Greenlake City</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`text-gray-600 hover:text-[#10B981] transition-colors duration-300 ${
                pathname === '/' ? 'text-[#10B981] font-medium' : ''
              }`}
            >
              Inicio
            </Link>
            <Link 
              href="/statistics" 
              className={`text-gray-600 hover:text-[#10B981] transition-colors duration-300 ${
                pathname === '/statistics' ? 'text-[#10B981] font-medium' : ''
              }`}
            >
              Estadísticas
            </Link>
            <Link 
              href="/map" 
              className={` text-gray-600 hover:text-[#10B981] transition-colors duration-300 ${
                pathname === '/map' ? 'text-[#10B981] font-medium' : ''
              }`}
            >
              Mapa Interactivo
            </Link>
            <Link 
              href="/config" 
              className={`text-gray-600 hover:text-[#10B981] transition-colors duration-300 ${
                pathname === '/config' ? 'text-[#10B981] font-medium' : ''
              }`}
            >
              Configuración
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-gray-700 hover:text-[#10B981] focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-[#10B981] text-white flex items-center justify-center">
                    {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="ml-2">{user?.username || 'Usuario'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`ml-1 h-5 w-5 transition-transform duration-200 ${isUserMenuOpen ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* User dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Perfil
                    </Link>
                    <Link href="/config"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Configuración
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/local-login"
                  className="text-[#065F46] border border-[#065F46] px-3 py-1.5 rounded-lg hover:bg-[#F0FDF9] transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  href="/local-register"
                  className="bg-[#10B981] text-white px-3 py-1.5 rounded-lg hover:bg-[#0EA271] transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-[#10B981] focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200">
            <Link
              href="/"
              className={`block px-4 py-2 text-gray-700 hover:bg-[#F0FDF9] hover:text-[#10B981] ${
                pathname === '/' ? 'bg-[#F0FDF9] text-[#10B981]' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/statistics"
              className={`block px-4 py-2 text-gray-700 hover:bg-[#F0FDF9] hover:text-[#10B981] ${
                pathname === '/statistics' ? 'bg-[#F0FDF9] text-[#10B981]' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Estadísticas
            </Link>
            <Link
              href="/map"
              className={`block px-4 py-2 text-gray-700 hover:bg-[#F0FDF9] hover:text-[#10B981] ${
                pathname === '/map' ? 'bg-[#F0FDF9] text-[#10B981]' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Mapa Interactivo
            </Link>
            <Link
              href="/config"
              className={`block px-4 py-2 text-gray-700 hover:bg-[#F0FDF9] hover:text-[#10B981] ${
                pathname === '/config' ? 'bg-[#F0FDF9] text-[#10B981]' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Configuración
            </Link>
            
            {isAuthenticated ? (
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="px-4 py-2 text-sm text-gray-500">
                  Conectado como <span className="font-medium text-[#065F46]">{user?.username || 'Usuario'}</span>
                </div>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#F0FDF9] hover:text-[#10B981]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-[#F0FDF9]"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 mt-2 pt-2">
                <Link
                  href="/local-login"
                  className="block px-4 py-2 text-[#065F46] hover:bg-[#F0FDF9]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/local-register"
                  className="block px-4 py-2 text-[#065F46] font-medium hover:bg-[#F0FDF9]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
