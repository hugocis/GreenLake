"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link href="/#attractions" className="text-gray-600 hover:text-[#10B981] transition-colors duration-300">
              Atracciones
            </Link>
            <Link href="/#events" className="text-gray-600 hover:text-[#10B981] transition-colors duration-300">
              Eventos
            </Link>
            <Link href="/#transport" className="text-gray-600 hover:text-[#10B981] transition-colors duration-300">
              Transporte
            </Link>
            <Link href="/#restaurants" className="text-gray-600 hover:text-[#10B981] transition-colors duration-300">
              Restaurantes
            </Link>
            <Link href="/#hotels" className="text-gray-600 hover:text-[#10B981] transition-colors duration-300">
              Hospedaje
            </Link>
            <Link 
              href="/statistics" 
              className="text-gray-600 hover:text-[#10B981] transition-colors duration-300"
            >
              Estadísticas
            </Link>
            <Link 
              href="/map" 
              className="bg-[#10B981] hover:bg-[#065F46] text-white py-2 px-4 rounded-lg transition-all duration-300"
            >
              Mapa Interactivo
            </Link>
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
              href="/#attractions" 
              className="text-gray-600 hover:text-[#10B981] py-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Atracciones
            </Link>
            <Link 
              href="/#events" 
              className="text-gray-600 hover:text-[#10B981] py-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link 
              href="/#transport" 
              className="text-gray-600 hover:text-[#10B981] py-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Transporte
            </Link>
            <Link 
              href="/#restaurants" 
              className="text-gray-600 hover:text-[#10B981] py-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Restaurantes
            </Link>
            <Link 
              href="/#hotels" 
              className="text-gray-600 hover:text-[#10B981] py-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Hospedaje
            </Link>
            <Link 
              href="/statistics" 
              className="text-gray-600 hover:text-[#10B981] py-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Estadísticas
            </Link>
            <Link 
              href="/map" 
              className="bg-[#10B981] hover:bg-[#065F46] text-white py-2 px-4 rounded-lg inline-block transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Mapa Interactivo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
