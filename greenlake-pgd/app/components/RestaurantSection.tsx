"use client";

import { useState, useEffect } from 'react';

// Datos de ejemplo basados en infrastructure_restaurant del schema
const restaurantData = [
  {
    id: "1",
    name: "Green Harvest",
    priceCategory: "$$$",
    seatingCapacity: 120,
    localOrganicIngredients: true,
    energyEfficientEquipment: true,
    wasteReductionProgram: true,
    rating: 4.7,
    reviewCount: 85,
    image: "/images/restaurants/green-harvest.jpg",
    cuisine: "Orgánica",
    description: "Un restaurante comprometido con ingredientes locales y orgánicos que ofrece una experiencia culinaria sostenible y deliciosa."
  },
  {
    id: "2",
    name: "EcoMediterráneo",
    priceCategory: "$$",
    seatingCapacity: 80,
    localOrganicIngredients: true,
    energyEfficientEquipment: true,
    wasteReductionProgram: true,
    rating: 4.8,
    reviewCount: 110,
    image: "/images/restaurants/eco-mediterraneo.jpg",
    cuisine: "Mediterránea",
    description: "Disfruta de la auténtica cocina mediterránea elaborada con ingredientes locales y técnicas sostenibles."
  },
  {
    id: "3",
    name: "Green Sushi",
    priceCategory: "$$$",
    seatingCapacity: 60,
    localOrganicIngredients: true,
    energyEfficientEquipment: false,
    wasteReductionProgram: true,
    rating: 4.6,
    reviewCount: 72,
    image: "/images/restaurants/green-sushi.jpg",
    cuisine: "Japonesa",
    description: "Sushi elaborado con pescado de pesca sostenible y verduras orgánicas cultivadas localmente."
  },
  {
    id: "4",
    name: "Veggie Haven",
    priceCategory: "$$",
    seatingCapacity: 90,
    localOrganicIngredients: true,
    energyEfficientEquipment: true,
    wasteReductionProgram: true,
    rating: 4.9,
    reviewCount: 156,
    image: "/images/restaurants/veggie-haven.jpg",
    cuisine: "Vegetariana",
    description: "Un paraíso para amantes de la comida vegetariana con ingredientes frescos de huertos urbanos de Greenlake City."
  }
];

export default function RestaurantSection() {
  const [filter, setFilter] = useState('all');
  const [restaurants, setRestaurants] = useState(restaurantData);
  
  function handleFilterChange(newFilter) {
    setFilter(newFilter);
    
    if (newFilter === 'all') {
      setRestaurants(restaurantData);
    } else if (newFilter === 'organic') {
      setRestaurants(restaurantData.filter(r => r.localOrganicIngredients));
    } else if (newFilter === 'sustainable') {
      setRestaurants(restaurantData.filter(r => r.wasteReductionProgram));
    }
  }
  
  return (
    <section id="restaurants" className="py-16 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#065F46] text-center mb-3">
          Restaurantes Sostenibles
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Disfruta de la gastronomía local con ingredientes orgánicos y prácticas sostenibles
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
            onClick={() => handleFilterChange('sustainable')}
            className={`px-4 py-2 rounded-full border ${filter === 'sustainable' ? 'bg-[#10B981] text-white' : 'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
          >
            Reducción de Residuos
          </button>
        </div>
        
        {/* Lista de restaurantes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(restaurant => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-[#34D399] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-2 py-1 rounded mr-2">
                    {restaurant.cuisine}
                  </span>
                  <span className="text-gray-500 text-sm">{restaurant.priceCategory}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#065F46] mb-2">{restaurant.name}</h3>
                <p className="text-gray-600 mb-4">
                  {restaurant.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <span className="font-bold text-[#10B981]">{restaurant.rating}</span> ({restaurant.reviewCount} reseñas)
                  </div>
                  <button className="bg-[#34D399] hover:bg-[#10B981] text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Ver Menú
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                  {restaurant.localOrganicIngredients && (
                    <span className="inline-flex items-center text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Ingredientes locales
                    </span>
                  )}
                  {restaurant.wasteReductionProgram && (
                    <span className="inline-flex items-center text-xs bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Reducción de residuos
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
