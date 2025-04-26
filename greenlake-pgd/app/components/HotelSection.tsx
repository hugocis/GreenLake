"use client";

import { useState, useEffect } from 'react';
import { HotelAPI } from '@/lib/api-client';
import { Infrastructure, InfrastructureHotel } from '@/lib/types';

type HotelWithDetails = {
  id: string;
  name: string;
  starRating: number;
  roomCount: number;
  energyEfficientLighting: boolean;
  waterConservationSystems: boolean;
  organicLinens: boolean;
  rating?: number;
  reviewCount?: number;
  image: string;
  price: number;
  description: string;
};

// Función para transformar datos de la API en el formato que espera el componente
const transformApiHotels = (apiHotels: (Infrastructure & { infrastructure_hotel: InfrastructureHotel })[]): HotelWithDetails[] => {
  return apiHotels.map(hotel => ({
    id: hotel.id,
    name: hotel.name || "Hotel sin nombre",
    starRating: hotel.infrastructure_hotel?.star_rating || 0,
    roomCount: hotel.infrastructure_hotel?.room_count || 0,
    energyEfficientLighting: hotel.infrastructure_hotel?.energy_efficient_lighting || false,
    waterConservationSystems: hotel.infrastructure_hotel?.water_conservation_systems || false,
    organicLinens: hotel.infrastructure_hotel?.organic_linens || false,
    rating: (hotel.green_score || 0) / 2, // Convertir green_score a una escala de 5 estrellas
    reviewCount: Math.floor(Math.random() * 100) + 50, // Dato de ejemplo
    image: "/images/hotels/ecostay.jpg", // Imagen por defecto
    price: 100 + (hotel.infrastructure_hotel?.star_rating || 0) * 25, // Precio basado en estrellas
    description: `Hotel sostenible con puntuación verde de ${hotel.green_score || 'N/A'}.`
  }));
};

export default function HotelSection() {
  const [filter, setFilter] = useState('all');
  const [hotels, setHotels] = useState<HotelWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Cargar datos de hoteles desde la API  
  useEffect(() => {
    async function fetchHotels() {
      try {
        setLoading(true);
        console.log("Fetching hotels...");
        
        // Llamada directa al endpoint
        const response = await fetch('/api/hotels?limit=10');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
          const jsonData = await response.json();
        console.log("Hotels API response:", jsonData);
        
        // Comprobar la estructura de la respuesta
        if (jsonData && jsonData.data && Array.isArray(jsonData.data)) {
          console.log("Cantidad de hoteles recibidos:", jsonData.data.length);
          if (jsonData.data.length === 0) {
            console.warn("La API devolvió un array vacío de hoteles");
            setError("No hay hoteles disponibles que coincidan con los criterios de búsqueda.");
            setHotels([]);
          } else {
            const transformedHotels = transformApiHotels(jsonData.data);
            console.log("Hoteles transformados:", transformedHotels);
            setHotels(transformedHotels);
            setError(null);
          }
        } else {
          console.error("Invalid API response format:", jsonData);
          throw new Error("Invalid API response format");
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("No se pudieron cargar los hoteles. Por favor, intenta de nuevo más tarde.");
        setHotels([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchHotels();
  }, []);
  
  function handleFilterChange(newFilter: 'all' | 'luxury' | 'organic' | 'water') {
    setFilter(newFilter);
    
    // Aplicar filtros a los datos cargados
    if (newFilter === 'all') {
      // Recargar todos los datos
      async function reloadHotels() {
        try {
          setLoading(true);
          const response = await HotelAPI.getAllHotels({ limit: 10 });
          const transformedHotels = transformApiHotels(response.data);
          setHotels(transformedHotels);
        } catch (error) {
          console.error("Error reloading hotels:", error);
          setError("No se pudieron cargar los hoteles. Por favor, intenta de nuevo más tarde.");
        } finally {
          setLoading(false);
        }
      }
      
      reloadHotels();
    } else if (newFilter === 'luxury') {
      // Filtrar hoteles de 4-5 estrellas
      async function fetchLuxuryHotels() {
        try {
          setLoading(true);
          const response = await HotelAPI.getAllHotels({ minStarRating: 4, limit: 10 });
          const transformedHotels = transformApiHotels(response.data);
          setHotels(transformedHotels);
        } catch (error) {
          console.error("Error fetching luxury hotels:", error);
          setError("No se pudieron cargar los hoteles de lujo. Por favor, intenta de nuevo más tarde.");
        } finally {
          setLoading(false);
        }
      }
      
      fetchLuxuryHotels();
    } else if (newFilter === 'organic') {
      // Filtrar hoteles con ropa orgánica
      async function fetchOrganicHotels() {
        try {
          setLoading(true);
          const response = await HotelAPI.getAllHotels({ organicLinens: true, limit: 10 });
          const transformedHotels = transformApiHotels(response.data);
          setHotels(transformedHotels);
        } catch (error) {
          console.error("Error fetching organic hotels:", error);
          setError("No se pudieron cargar los hoteles con ropa orgánica. Por favor, intenta de nuevo más tarde.");
        } finally {
          setLoading(false);
        }
      }
      
      fetchOrganicHotels();
    } else if (newFilter === 'water') {
      // Filtrar hoteles con sistemas de conservación de agua
      async function fetchWaterConservationHotels() {
        try {
          setLoading(true);
          const response = await HotelAPI.getAllHotels({ waterConservation: true, limit: 10 });
          const transformedHotels = transformApiHotels(response.data);
          setHotels(transformedHotels);
        } catch (error) {
          console.error("Error fetching water conservation hotels:", error);
          setError("No se pudieron cargar los hoteles con ahorro de agua. Por favor, intenta de nuevo más tarde.");
        } finally {
          setLoading(false);
        }
      }
      
      fetchWaterConservationHotels();
    }
  }
  
  return (
    <section id="hotels" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#065F46] text-center mb-3">
          Alojamiento Sostenible
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Descansa con tranquilidad en nuestros alojamientos comprometidos con el medio ambiente
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
            onClick={() => handleFilterChange('luxury')}
            className={`px-4 py-2 rounded-full border ${filter === 'luxury' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
          >
            4-5 Estrellas
          </button>
          <button 
            onClick={() => handleFilterChange('organic')}
            className={`px-4 py-2 rounded-full border ${filter === 'organic' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
          >
            Ropa Orgánica
          </button>
          <button 
            onClick={() => handleFilterChange('water')}
            className={`px-4 py-2 rounded-full border ${filter === 'water' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
          >
            Ahorro de Agua
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
        
        {/* Lista de hoteles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map(hotel => (
            <div key={hotel.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-[#065F46] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-2 py-1 rounded mr-2">
                    HOTEL
                  </span>
                  <span className="text-gray-500 text-sm">
                    {Array(hotel.starRating).fill('★').map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#065F46] mb-2">{hotel.name}</h3>
                <p className="text-gray-600 mb-4">
                  {hotel.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <span className="font-bold text-[#10B981]">{hotel.rating}</span> ({hotel.reviewCount} reseñas)
                  </div>
                  <div className="text-[#065F46] font-bold">
                    ${hotel.price}/noche
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                  {hotel.energyEfficientLighting && (
                    <span className="inline-flex items-center text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Iluminación eficiente
                    </span>
                  )}
                  {hotel.waterConservationSystems && (
                    <span className="inline-flex items-center text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Ahorro de agua
                    </span>
                  )}
                  {hotel.organicLinens && (
                    <span className="inline-flex items-center text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Ropa de cama orgánica
                    </span>
                  )}
                </div>
                <button className="mt-4 w-full bg-[#34D399] hover:bg-[#10B981] text-white py-2 rounded-lg text-sm font-medium">
                  Reservar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-[#065F46] hover:bg-[#047857] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
            Ver Todos los Alojamientos
          </button>
        </div>
      </div>
    </section>
  );
}
