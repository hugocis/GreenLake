"use client";

import { useState } from 'react';

// Datos de ejemplo basados en infrastructure_hotel del schema
const hotelData = [
  {
    id: "1",
    name: "EcoStay Hotel",
    starRating: 4,
    roomCount: 120,
    energyEfficientLighting: true,
    waterConservationSystems: true,
    organicLinens: true,
    rating: 4.6,
    reviewCount: 92,
    image: "/images/hotels/ecostay.jpg",
    price: 150,
    description: "Un hotel sostenible con iluminación eficiente, sistemas de conservación de agua y ropa de cama orgánica."
  },
  {
    id: "2",
    name: "Green Leaf Inn",
    starRating: 3,
    roomCount: 75,
    energyEfficientLighting: true,
    waterConservationSystems: true,
    organicLinens: false,
    rating: 4.4,
    reviewCount: 68,
    image: "/images/hotels/greenleaf.jpg",
    price: 110,
    description: "Un hospedaje acogedor que implementa prácticas sostenibles para reducir su huella ambiental."
  },
  {
    id: "3",
    name: "Sustainable Suites",
    starRating: 5,
    roomCount: 60,
    energyEfficientLighting: true,
    waterConservationSystems: true,
    organicLinens: true,
    rating: 4.9,
    reviewCount: 105,
    image: "/images/hotels/sustainable-suites.jpg",
    price: 220,
    description: "Suites de lujo que combinan confort premium con el compromiso máximo con la sostenibilidad."
  },
  {
    id: "4",
    name: "Eco Budget Hostel",
    starRating: 2,
    roomCount: 40,
    energyEfficientLighting: true,
    waterConservationSystems: false,
    organicLinens: false,
    rating: 4.3,
    reviewCount: 124,
    image: "/images/hotels/eco-budget.jpg",
    price: 45,
    description: "Una opción económica pero amigable con el ambiente para viajeros conscientes del presupuesto."
  }
];

export default function HotelSection() {
  const [filter, setFilter] = useState('all');
  const [hotels, setHotels] = useState(hotelData);
  
  function handleFilterChange(newFilter) {
    setFilter(newFilter);
    
    if (newFilter === 'all') {
      setHotels(hotelData);
    } else if (newFilter === 'luxury') {
      setHotels(hotelData.filter(h => h.starRating >= 4));
    } else if (newFilter === 'organic') {
      setHotels(hotelData.filter(h => h.organicLinens));
    } else if (newFilter === 'water') {
      setHotels(hotelData.filter(h => h.waterConservationSystems));
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
