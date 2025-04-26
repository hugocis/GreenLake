"use client";

import { useState, useEffect } from 'react';
import { RestaurantAPI } from '@/lib/api-client';
import { Infrastructure, InfrastructureRestaurant } from '@/lib/types';

type RestaurantWithDetails = {
  id: string;
  name: string;
  priceCategory: string;
  seatingCapacity: number;
  localOrganicIngredients: boolean;
  energyEfficientEquipment: boolean;
  wasteReductionProgram: boolean;
  rating?: number;
  reviewCount?: number;
  image: string;
  cuisine: string;
  description: string;
};

// Función para transformar datos de la API en el formato que espera el componente
const transformApiRestaurants = (apiRestaurants: (Infrastructure & { infrastructure_restaurant: InfrastructureRestaurant })[]): RestaurantWithDetails[] => {
  return apiRestaurants.map(restaurant => ({
    id: restaurant.id,
    name: restaurant.name || "Restaurante sin nombre",
    priceCategory: restaurant.infrastructure_restaurant?.price_category || "$",
    seatingCapacity: restaurant.infrastructure_restaurant?.seating_capacity || 0,
    localOrganicIngredients: restaurant.infrastructure_restaurant?.local_organic_ingredients || false,
    energyEfficientEquipment: restaurant.infrastructure_restaurant?.energy_efficient_kitchen_equipment || false,
    wasteReductionProgram: restaurant.infrastructure_restaurant?.waste_reduction_program || false,
    rating: (restaurant.green_score || 0) / 2, // Convertir green_score a una escala de 5 estrellas
    reviewCount: Math.floor(Math.random() * 100) + 50, // Dato de ejemplo
    image: "/images/restaurants/green-harvest.jpg", // Imagen por defecto
    cuisine: restaurant.subtype || "Variada",
    description: `Restaurante sostenible con puntuación verde de ${restaurant.green_score || 'N/A'}.`
  }));
};

export default function RestaurantSection() {
  const [filter, setFilter] = useState('all');
  const [restaurants, setRestaurants] = useState<RestaurantWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Cargar datos de restaurantes desde la API
  useEffect(() => {
    async function fetchRestaurants() {
      try {
        setLoading(true);
        const response = await RestaurantAPI.getAllRestaurants({ limit: 10 });
        const transformedRestaurants = transformApiRestaurants(response.data);
        setRestaurants(transformedRestaurants);
        setError(null);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError("No se pudieron cargar los restaurantes. Por favor, intenta de nuevo más tarde.");
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRestaurants();
  }, []);
  
  function handleFilterChange(newFilter: 'all' | 'organic' | 'waste' | 'premium') {
    setFilter(newFilter);
    
    // Aplicar filtros a los datos cargados
    if (newFilter === 'all') {
      // Recargar todos los datos
      async function reloadRestaurants() {
        try {
          setLoading(true);
          const response = await RestaurantAPI.getAllRestaurants({ limit: 10 });
          const transformedRestaurants = transformApiRestaurants(response.data);
          setRestaurants(transformedRestaurants);
        } catch (error) {
          console.error("Error reloading restaurants:", error);
          setError("No se pudieron cargar los restaurantes. Por favor, intenta de nuevo más tarde.");
        } finally {
          setLoading(false);
        }
      }
      
      reloadRestaurants();
    } else if (newFilter === 'organic') {
      // Filtrar restaurantes con ingredientes orgánicos
      async function fetchOrganicRestaurants() {
        try {
          setLoading(true);
          const response = await RestaurantAPI.getAllRestaurants({ localOrganicIngredients: true, limit: 10 });
          const transformedRestaurants = transformApiRestaurants(response.data);
          setRestaurants(transformedRestaurants.length > 0 ? transformedRestaurants : []);
        } catch (error) {
          console.error("Error fetching organic restaurants:", error);
          setRestaurants([]);
        } finally {
          setLoading(false);
        }
      }
      
      fetchOrganicRestaurants();
    } else if (newFilter === 'waste') {
      // Filtrar restaurantes con programa de reducción de residuos
      async function fetchWasteReductionRestaurants() {
        try {
          setLoading(true);
          const response = await RestaurantAPI.getAllRestaurants({ wasteReduction: true, limit: 10 });
          const transformedRestaurants = transformApiRestaurants(response.data);
          setRestaurants(transformedRestaurants.length > 0 ? transformedRestaurants : []);
        } catch (error) {
          console.error("Error fetching waste reduction restaurants:", error);
          setRestaurants([]);
        } finally {
          setLoading(false);
        }
      }
      
      fetchWasteReductionRestaurants();
    } else if (newFilter === 'premium') {
      // Filtrar restaurantes premium (categoría de precio $$$$ o $$$)
      async function fetchPremiumRestaurants() {
        try {
          setLoading(true);
          const response = await RestaurantAPI.getAllRestaurants({ priceCategory: "$$$", limit: 10 });
          const transformedRestaurants = transformApiRestaurants(response.data);
          setRestaurants(transformedRestaurants.length > 0 ? transformedRestaurants : []);
        } catch (error) {
          console.error("Error fetching premium restaurants:", error);
          setRestaurants([]);
        } finally {
          setLoading(false);
        }
      }
      
      fetchPremiumRestaurants();
    }
  }
  
  return (
    <section id="restaurants" className="py-16 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#065F46] text-center mb-3">
          Gastronomía Sostenible
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Disfruta de la mejor gastronomía local comprometida con el medio ambiente
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
            onClick={() => handleFilterChange('organic')}
            className={`px-4 py-2 rounded-full border ${filter === 'organic' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
          >
            Ingredientes Orgánicos
          </button>
          <button 
            onClick={() => handleFilterChange('waste')}
            className={`px-4 py-2 rounded-full border ${filter === 'waste' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
          >
            Reducción de Residuos
          </button>
          <button 
            onClick={() => handleFilterChange('premium')}
            className={`px-4 py-2 rounded-full border ${filter === 'premium' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
          >
            Premium
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
        
        {/* Lista de restaurantes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(restaurant => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-[#065F46] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-2 py-1 rounded mr-2">
                    {restaurant.cuisine}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {restaurant.priceCategory}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#065F46] mb-2">{restaurant.name}</h3>
                <p className="text-gray-600 mb-4">
                  {restaurant.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <span className="font-bold text-[#10B981]">{restaurant.rating}</span> ({restaurant.reviewCount} reseñas)
                  </div>
                  <div className="text-[#065F46] font-bold">
                    Capacidad: {restaurant.seatingCapacity}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                  {restaurant.localOrganicIngredients && (
                    <span className="inline-flex items-center text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Ingredientes orgánicos
                    </span>
                  )}
                  {restaurant.wasteReductionProgram && (
                    <span className="inline-flex items-center text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Programa anti-residuos
                    </span>
                  )}
                  {restaurant.energyEfficientEquipment && (
                    <span className="inline-flex items-center text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Equipo eficiente
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-[#065F46] hover:bg-[#047857] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
            Ver Todos los Restaurantes
          </button>
        </div>
      </div>
    </section>
  );
}
