"use client";

import { useState, useEffect } from 'react';
import { ParkAPI } from '@/lib/api-client';
import { Infrastructure, InfrastructurePark } from '@/lib/types';

type ParkWithDetails = {
  id: string;
  name: string;
  size: string;
  areaKm2: number;
  nativePlantings: boolean;
  wildlifeHabitat: boolean;
  sustainableIrrigation: boolean;
  description: string;
  mainAttractions: string[];
  rating: number;
  reviewCount: number;
};

// Función para transformar datos de la API en el formato que espera el componente
const transformApiParks = (apiParks: (Infrastructure & { infrastructure_park: InfrastructurePark })[]): ParkWithDetails[] => {
  return apiParks.map(park => ({
    id: park.id,
    name: park.name || "Parque sin nombre",
    size: park.infrastructure_park?.size || "Mediano",
    areaKm2: park.infrastructure_park?.area_km2 || 1.0,
    nativePlantings: park.infrastructure_park?.native_plantings || false,
    wildlifeHabitat: park.infrastructure_park?.wildlife_habitat || false,
    sustainableIrrigation: park.infrastructure_park?.sustainable_irrigation || false,
    description: `Parque sostenible con una puntuación verde de ${park.green_score || 'N/A'}.`,
    mainAttractions: generateRandomAttractions(park.name || ""),
    rating: (park.green_score || 0) / 2, // Convertir green_score a una escala de 5 estrellas
    reviewCount: Math.floor(Math.random() * 100) + 50, // Dato de ejemplo
  }));
};

// Función para generar atracciones aleatorias para los parques
function generateRandomAttractions(parkName: string): string[] {
  const possibleAttractions = [
    "Jardín botánico", "Lago artificial", "Senderos ecológicos", 
    "Área de juegos infantiles", "Zona de picnic", "Observatorio de aves", 
    "Huerto comunitario", "Jardín de mariposas", "Área de conservación", 
    "Cascada artificial", "Ciclovía", "Centro de interpretación ambiental"
  ];
  
  // Seleccionar entre 2-4 atracciones aleatorias
  const numAttractions = Math.floor(Math.random() * 3) + 2;
  const attractions: string[] = [];
  
  while (attractions.length < numAttractions) {
    const attraction = possibleAttractions[Math.floor(Math.random() * possibleAttractions.length)];
    if (!attractions.includes(attraction)) {
      attractions.push(attraction);
    }
  }
  
  return attractions;
}

export default function ParkSection() {
  const [filter, setFilter] = useState('all');
  const [parks, setParks] = useState<ParkWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Cargar datos de parques desde la API
  useEffect(() => {
    async function fetchParks() {
      try {
        setLoading(true);
        const response = await ParkAPI.getAllParks({ limit: 6 });
        const transformedParks = transformApiParks(response.data);
        setParks(transformedParks);
        setError(null);
      } catch (error) {
        console.error("Error fetching parks:", error);
        setError("No se pudieron cargar los parques. Por favor, intenta de nuevo más tarde.");
        setParks([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchParks();
  }, []);
  
  function handleFilterChange(newFilter: 'all' | 'native' | 'wildlife' | 'large') {
    setFilter(newFilter);
    
    // Aplicar filtros a los datos cargados
    if (newFilter === 'all') {
      // Recargar todos los datos
      async function reloadParks() {
        try {
          setLoading(true);
          const response = await ParkAPI.getAllParks({ limit: 6 });
          const transformedParks = transformApiParks(response.data);
          setParks(transformedParks);
        } catch (error) {
          console.error("Error reloading parks:", error);
          setError("No se pudieron cargar los parques. Por favor, intenta de nuevo más tarde.");
        } finally {
          setLoading(false);
        }
      }
      
      reloadParks();
    } else if (newFilter === 'native') {
      // Filtrar parques con plantaciones nativas
      async function fetchNativePlantingsParks() {
        try {
          setLoading(true);
          const response = await ParkAPI.getAllParks({ nativePlantings: true, limit: 6 });
          const transformedParks = transformApiParks(response.data);
          setParks(transformedParks.length > 0 ? transformedParks : []);
        } catch (error) {
          console.error("Error fetching parks with native plantings:", error);
          setParks([]);
        } finally {
          setLoading(false);
        }
      }
      
      fetchNativePlantingsParks();
    } else if (newFilter === 'wildlife') {
      // Filtrar parques con hábitat de vida silvestre
      async function fetchWildlifeHabitatParks() {
        try {
          setLoading(true);
          const response = await ParkAPI.getAllParks({ wildlifeHabitat: true, limit: 6 });
          const transformedParks = transformApiParks(response.data);
          setParks(transformedParks.length > 0 ? transformedParks : []);
        } catch (error) {
          console.error("Error fetching parks with wildlife habitat:", error);
          setParks([]);
        } finally {
          setLoading(false);
        }
      }
      
      fetchWildlifeHabitatParks();
    } else if (newFilter === 'large') {
      // Filtrar parques grandes
      async function fetchLargeParks() {
        try {
          setLoading(true);
          const response = await ParkAPI.getAllParks({ minAreaKm2: 2.0, limit: 6 });
          const transformedParks = transformApiParks(response.data);
          setParks(transformedParks.length > 0 ? transformedParks : []);
        } catch (error) {
          console.error("Error fetching large parks:", error);
          setParks([]);
        } finally {
          setLoading(false);
        }
      }
      
      fetchLargeParks();
    }
  }
  
  return (
    <section id="parks" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#065F46] text-center mb-3">
          Parques y Áreas Naturales
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explora nuestros espacios verdes urbanos y áreas de conservación natural
        </p>
        
        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button 
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 rounded-full border ${filter === 'all' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
          >
            Todos
          </button>
          <button 
            onClick={() => handleFilterChange('native')}
            className={`px-4 py-2 rounded-full border ${filter === 'native' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
          >
            Plantaciones Nativas
          </button>
          <button 
            onClick={() => handleFilterChange('wildlife')}
            className={`px-4 py-2 rounded-full border ${filter === 'wildlife' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
          >
            Hábitat Silvestre
          </button>
          <button 
            onClick={() => handleFilterChange('large')}
            className={`px-4 py-2 rounded-full border ${filter === 'large' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
          >
            Parques Grandes
          </button>
        </div>
        
        {/* Estado de carga y error */}
        {loading && (
          <div className="flex justify-center items-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10B981]"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-8 text-center">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {/* Lista de parques */}
        <div className="grid md:grid-cols-2 gap-8">
          {parks.map(park => (
            <div key={park.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row">
              <div className="md:w-2/5 bg-[#065F46] flex items-center justify-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="md:w-3/5 p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-2 py-1 rounded mr-2">
                    {park.size}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {park.areaKm2} km²
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#065F46] mb-2">{park.name}</h3>
                <p className="text-gray-600 mb-4">
                  {park.description}
                </p>
                <div className="text-sm mb-3">
                  <span className="font-bold text-[#10B981]">{park.rating}</span> ({park.reviewCount} reseñas)
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {park.mainAttractions.map((attraction, index) => (
                    <span key={index} className="inline-flex items-center text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                      {attraction}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {park.nativePlantings && (
                    <span className="inline-flex items-center text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Plantaciones nativas
                    </span>
                  )}
                  {park.wildlifeHabitat && (
                    <span className="inline-flex items-center text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Hábitat para vida silvestre
                    </span>
                  )}
                  {park.sustainableIrrigation && (
                    <span className="inline-flex items-center text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Riego sostenible
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-[#065F46] hover:bg-[#047857] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
            Ver Todos los Parques
          </button>
        </div>
      </div>
    </section>
  );
}
