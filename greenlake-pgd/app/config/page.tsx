"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import SimpleFooter from '../components/SimpleFooter';
import LocalNavbar from '../components/LocalNavbar';

type UserRole = 'citizen' | 'researcher' | 'entrepreneur';

export default function ConfigPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('citizen');
  const [name, setName] = useState<string>('');
  const [saved, setSaved] = useState(false);
  // Cargar la configuración almacenada al iniciar la página
  useEffect(() => {
    const savedRole = localStorage.getItem('user-role');
    const savedName = localStorage.getItem('user-name');
    
    if (savedRole === 'citizen' || savedRole === 'researcher' || savedRole === 'entrepreneur') {
      setRole(savedRole);
    }
    
    if (savedName) {
      setName(savedName);
    }
  }, []);

  // Guardar configuración
  const handleSave = () => {
    localStorage.setItem('user-role', role);
    localStorage.setItem('user-name', name);
    setSaved(true);
    
    // Ocultar el mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };
  // Ir a la página inicial según el rol seleccionado
  const goToHome = () => {
    let path = '/map'; // Por defecto

    if (role === 'researcher') {
      path = '/statistics';
    } else if (role === 'entrepreneur') {
      path = '/hydraulic-map';
    }
    
    router.push(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LocalNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-[#065F46] mb-6">Configuración de Perfil</h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
          <div className="space-y-8">
            {/* Nombre */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="mt-1 text-sm text-gray-500">Este nombre se usará para personalizar tu experiencia</p>
            </div>
            
            {/* Selección de rol */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Selecciona tu perfil</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Opción Ciudadano */}
                <div
                  className={`border rounded-lg p-5 cursor-pointer transition-all ${
                    role === 'citizen' 
                      ? 'border-[#10B981] ring-2 ring-[#10B981]/20 bg-[#F0FDF9]' 
                      : 'border-gray-200 hover:border-[#10B981]/50'
                  }`}
                  onClick={() => setRole('citizen')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="citizen"
                      checked={role === 'citizen'}
                      onChange={() => setRole('citizen')}
                      className="h-4 w-4 text-[#10B981] border-gray-300 focus:ring-[#10B981]"
                    />
                    <label 
                      htmlFor="citizen" 
                      className="ml-2 block text-lg font-medium text-gray-800 cursor-pointer"
                    >
                      Ciudadano
                    </label>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 pl-6">
                    Como ciudadano, verás primero el mapa interactivo para explorar tu ciudad. 
                    Enfocado en información práctica sobre servicios y lugares de interés.
                  </p>
                </div>
                
                {/* Opción Investigador */}
                <div
                  className={`border rounded-lg p-5 cursor-pointer transition-all ${
                    role === 'researcher' 
                      ? 'border-[#10B981] ring-2 ring-[#10B981]/20 bg-[#F0FDF9]' 
                      : 'border-gray-200 hover:border-[#10B981]/50'
                  }`}
                  onClick={() => setRole('researcher')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="researcher"
                      checked={role === 'researcher'}
                      onChange={() => setRole('researcher')}
                      className="h-4 w-4 text-[#10B981] border-gray-300 focus:ring-[#10B981]"
                    />
                    <label 
                      htmlFor="researcher" 
                      className="ml-2 block text-lg font-medium text-gray-800 cursor-pointer"
                    >
                      Investigador
                    </label>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 pl-6">
                    Como investigador, verás primero las estadísticas y visualizaciones de datos. 
                    Ideal para análisis de sostenibilidad y toma de decisiones basada en datos.
                  </p>
                </div>

                {/* Opción Analista Hidráulico */}
                <div
                  className={`border rounded-lg p-5 cursor-pointer transition-all ${
                    role === 'entrepreneur' 
                      ? 'border-[#10B981] ring-2 ring-[#10B981]/20 bg-[#F0FDF9]' 
                      : 'border-gray-200 hover:border-[#10B981]/50'
                  }`}
                  onClick={() => setRole('entrepreneur')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="hydraulic-analyst"
                      checked={role === 'entrepreneur'}
                      onChange={() => setRole('entrepreneur')}
                      className="h-4 w-4 text-[#10B981] border-gray-300 focus:ring-[#10B981]"
                    />
                    <label 
                      htmlFor="hydraulic-analyst" 
                      className="ml-2 block text-lg font-medium text-gray-800 cursor-pointer"
                    >
                      Analista Hidráulico
                    </label>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 pl-6">
                    Como empresario, verás primero el mapa de eficiencia hidráulica.
                    Ideal para monitorear y optimizar la generación de energía de los recursos hídricos.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-[#F0FDFA] border border-[#D1FAE5] rounded-md p-4">
                <h3 className="font-medium text-[#065F46] flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ¿Qué significa esto?
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Esta configuración determina qué página verás primero al ingresar a Greenlake City. Puedes cambiar 
                  entre vistas en cualquier momento usando el menú de navegación.
                </p>
              </div>
            </div>
            
            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2.5 bg-[#10B981] text-white rounded-lg hover:bg-[#0EA271] transition-colors"
              >
                Guardar Configuración
              </button>
              
              <button
                type="button"
                onClick={goToHome}
                className="px-6 py-2.5 bg-[#065F46] text-white rounded-lg hover:bg-[#054F36] transition-colors"
              >
                Ir a Inicio
              </button>
            </div>
            
            {/* Mensaje de éxito */}
            {saved && (
              <div className="mt-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Configuración guardada correctamente
              </div>
            )}
          </div>
        </div>
      </main>
      
      <SimpleFooter />
    </div>
  );
}
