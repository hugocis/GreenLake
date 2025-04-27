"use client";

import React, { useState } from 'react';
import SimpleFooter from "../components/SimpleFooter";
import Link from "next/link";
import LocalNavbar from "../components/LocalNavbar";

export default function MapPage() {
  const [mapType, setMapType] = useState('attractions');

  return (
    <div className="min-h-screen flex flex-col">
      <LocalNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-[#10B981] hover:text-[#065F46] flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a la página principal
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-[#065F46] mb-6">Mapa Interactivo de Greenlake City</h1>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <button 
              onClick={() => setMapType('attractions')}
              className={`px-4 py-2 rounded-full border ${mapType === 'attractions' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
            >
              Atracciones
            </button>
            <button 
              onClick={() => setMapType('restaurants')}
              className={`px-4 py-2 rounded-full border ${mapType === 'restaurants' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
            >
              Restaurantes
            </button>
            <button 
              onClick={() => setMapType('hotels')}
              className={`px-4 py-2 rounded-full border ${mapType === 'hotels' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
            >
              Hoteles
            </button>
            <button 
              onClick={() => setMapType('transport')}
              className={`px-4 py-2 rounded-full border ${mapType === 'transport' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
            >
              Transporte
            </button>
          </div>
          
          {/* Placeholder for map component - would be replaced with actual map implementation */}
          <div className="bg-[#D1FAE5] h-[500px] rounded-xl flex items-center justify-center">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#065F46] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-[#065F46] text-xl font-bold">Mapa de {mapType === 'attractions' ? 'Atracciones' : 
                mapType === 'restaurants' ? 'Restaurantes' : 
                mapType === 'hotels' ? 'Hoteles' : 'Transporte'} en Greenlake City</p>
              <p className="text-[#10B981] mt-2">Aquí se integraría un componente de mapa interactivo</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#065F46] mb-4">Leyenda del Mapa</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="h-4 w-4 bg-[#34D399] rounded-full mr-2"></span>
                  <span>Parques y áreas naturales</span>
                </li>
                <li className="flex items-center">
                  <span className="h-4 w-4 bg-[#10B981] rounded-full mr-2"></span>
                  <span>Restaurantes sostenibles</span>
                </li>
                <li className="flex items-center">
                  <span className="h-4 w-4 bg-[#065F46] rounded-full mr-2"></span>
                  <span>Alojamientos ecoamigables</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="h-4 w-4 bg-[#047857] rounded-full mr-2"></span>
                  <span>Estaciones de transporte</span>
                </li>
                <li className="flex items-center">
                  <span className="h-4 w-4 border-2 border-[#34D399] rounded-full mr-2"></span>
                  <span>Punto de interés turístico</span>
                </li>
                <li className="flex items-center">
                  <span className="h-4 w-4 border-2 border-dashed border-[#10B981] rounded-full mr-2"></span>
                  <span>Rutas de senderismo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>      {/* Simple Footer Component */}
      <SimpleFooter />
    </div>
  );
}
