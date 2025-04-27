"use client";

import ClientMap from './ClientMap';
import LocalNavbar from '../../components/LocalNavbar';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar integrado */}
      <LocalNavbar />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header con estilo consistente */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[#065F46]">Mapa de la Ciudad</h1>
          <p className="text-gray-600">Visualización interactiva de los datos de la ciudad</p>
        </div>
        
        {/* Layout mejorado con filtros arriba y mapa centrado */}
        <main className="flex flex-col gap-4 items-center">          {/* Panel de filtros horizontal encima del mapa */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm w-full max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipo de datos</label>
                <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981]">
                  <option>Todos</option>
                  <option>Sensores de aire</option>
                  <option>Sensores de tráfico</option>
                  <option>Infraestructura</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Zona</label>
                <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981]">
                  <option>Toda la ciudad</option>
                  <option>Centro</option>
                  <option>Norte</option>
                  <option>Sur</option>
                </select>
              </div>
              <button className="bg-[#10B981] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0EA271] transition-colors w-full md:self-end">
                Aplicar filtros
              </button>
            </div>
          </div>          {/* Contenedor del mapa centrado y con mejor diseño - tamaño aumentado */}
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md w-full max-w-5xl h-[650px]">
            <ClientMap />
          </div>          {/* Leyenda del mapa debajo */}
          <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm w-full max-w-5xl">
            <h3 className="text-sm font-semibold mb-2 text-[#065F46] text-center">Leyenda</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span>Sensores aire</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span>Sensores agua</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                <span>Sensores tráfico</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                <span>Infraestructura</span>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer simple */}
        <footer className="mt-6 text-center text-sm text-gray-500">
          <p className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Greenlake Smart City © 2025
          </p>
        </footer>
      </div>
    </div>
  );
}
