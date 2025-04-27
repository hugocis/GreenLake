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
              className={`bg-[#10B981] hover:bg-[#065F46] text-white py-2 px-4 rounded-lg transition-all duration-300 ${
                pathname === '/map' ? 'ring-2 ring-[#065F46] ring-offset-2' : ''
              }`}
            >
              Mapa Interactivo
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
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-20">
                    <Link 
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <Link 
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Configuración
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/local-login" 
                className="text-gray-600 hover:text-[#10B981] transition-colors duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link 
              href="/" 
              className={`text-gray-600 hover:text-[#10B981] py-2 transition-colors duration-300 ${
                pathname === '/' ? 'text-[#10B981] font-medium' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/statistics" 
              className={`text-gray-600 hover:text-[#10B981] py-2 transition-colors duration-300 ${
                pathname === '/statistics' ? 'text-[#10B981] font-medium' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Estadísticas
            </Link>
            <Link 
              href="/map" 
              className={`bg-[#10B981] hover:bg-[#065F46] text-white py-2 px-4 rounded-lg inline-block transition-all duration-300 ${
                pathname === '/map' ? 'ring-2 ring-[#065F46] ring-offset-2' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Mapa Interactivo
            </Link>
            
            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#10B981] text-white flex items-center justify-center">
                      {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="ml-2">{user?.username || 'Usuario'}</span>
                  </div>
                  <Link 
                    href="/profile"
                    className="text-gray-600 hover:text-[#10B981] py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <Link 
                    href="/settings"
                    className="text-gray-600 hover:text-[#10B981] py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Configuración
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-800 py-2 block w-full text-left"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </>
            ) : (
              <Link 
                href="/local-login" 
                className="text-gray-600 hover:text-[#10B981] py-2 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
