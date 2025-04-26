"use client";

import { useState } from 'react';

// Datos de ejemplo basados en transport_routes y electric_rental_vehicle del schema
const transportData = {
  routes: [
    {
      id: "1",
      routeName: "Ruta Verde 1",
      transportType: "Autobús Eléctrico",
      originCity: "Centro",
      destinationCity: "Parque Industrial",
      distanceKm: 12.5,
      travelMinutes: 25,
      frequency: "Cada 15 minutos",
      departureTimes: "6:00 - 22:00",
      capacity: 60,
      price: 2.50,
      utilizationPercent: 75.5,
      efficiencyScore: 8.7,
      carbonFootprintKg: 0.5,
    },
    {
      id: "2",
      routeName: "Ruta Verde 2",
      transportType: "Tranvía",
      originCity: "Centro",
      destinationCity: "Zona Turística",
      distanceKm: 8.2,
      travelMinutes: 18,
      frequency: "Cada 10 minutos",
      departureTimes: "6:00 - 23:30",
      capacity: 120,
      price: 3.00,
      utilizationPercent: 85.2,
      efficiencyScore: 9.4,
      carbonFootprintKg: 0.3,
    },
    {
      id: "3",
      routeName: "Ruta Azul",
      transportType: "Ferry Eléctrico",
      originCity: "Zona Turística",
      destinationCity: "Isla Verde",
      distanceKm: 5.8,
      travelMinutes: 22,
      frequency: "Cada 30 minutos",
      departureTimes: "7:00 - 21:00",
      capacity: 80,
      price: 4.50,
      utilizationPercent: 68.5,
      efficiencyScore: 8.2,
      carbonFootprintKg: 0.8,
    }
  ],
  rentalVehicles: [
    {
      id: "1",
      make: "Tesla",
      model: "Model 3",
      modelYear: 2023,
      electricRange: 350,
      rentalCostPerHour: 12.50,
      capacity: 5,
      type: "Sedan",
    },
    {
      id: "2",
      make: "Nissan",
      model: "Leaf",
      modelYear: 2022,
      electricRange: 240,
      rentalCostPerHour: 8.75,
      capacity: 5,
      type: "Compacto",
    },
    {
      id: "3",
      make: "Hyundai",
      model: "Kona Electric",
      modelYear: 2023,
      electricRange: 280,
      rentalCostPerHour: 10.25,
      capacity: 5,
      type: "SUV",
    },
    {
      id: "4",
      make: "E-Bike",
      model: "City Cruiser",
      modelYear: 2023,
      electricRange: 80,
      rentalCostPerHour: 4.50,
      capacity: 1,
      type: "Bicicleta Eléctrica",
    }
  ]
};

export default function TransportSection() {
  const [activeTab, setActiveTab] = useState('public');
  
  return (
    <section id="transport" className="py-16 bg-[#D1FAE5]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#065F46] text-center mb-3">
          Transporte Sostenible
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Muévete por Greenlake City de manera respetuosa con el medio ambiente
        </p>
        
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setActiveTab('public')}
              className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                activeTab === 'public' 
                  ? 'bg-[#10B981] text-white' 
                  : 'bg-white text-[#065F46] hover:bg-gray-100'
              }`}
            >
              Transporte Público
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rental')}
              className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                activeTab === 'rental' 
                  ? 'bg-[#10B981] text-white' 
                  : 'bg-white text-[#065F46] hover:bg-gray-100'
              }`}
            >
              Vehículos de Alquiler
            </button>
          </div>
        </div>
        
        {/* Public Transport Content */}
        {activeTab === 'public' && (
          <div>
            <div className="overflow-hidden bg-white shadow-md rounded-xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#065F46]">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Ruta
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Tipo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Origen - Destino
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Frecuencia
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Precio
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Huella de Carbono
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transportData.routes.map((route) => (
                    <tr key={route.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{route.routeName}</div>
                        <div className="text-sm text-gray-500">{route.travelMinutes} min</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#D1FAE5] text-[#065F46]">
                          {route.transportType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{route.originCity} → {route.destinationCity}</div>
                        <div className="text-xs text-gray-500">{route.distanceKm} km</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {route.frequency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#10B981]">
                        ${route.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-[#34D399] h-2.5 rounded-full" 
                              style={{ width: `${Math.min(100, (1 - route.carbonFootprintKg/2) * 100)}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-600">{route.carbonFootprintKg} kg</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Descarga nuestra app para ver todas las rutas y horarios en tiempo real
              </p>
              <button className="bg-[#065F46] hover:bg-[#047857] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
                Ver Mapa de Rutas
              </button>
            </div>
          </div>
        )}
        
        {/* Rental Vehicles Content */}
        {activeTab === 'rental' && (
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {transportData.rentalVehicles.map(vehicle => (
                <div key={vehicle.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="h-40 bg-[#047857] flex items-center justify-center">
                    {vehicle.type === "Bicicleta Eléctrica" ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-2 py-1 rounded mr-2">
                        {vehicle.type}
                      </span>
                      <span className="text-gray-500 text-sm">{vehicle.modelYear}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#065F46] mb-2">{vehicle.make} {vehicle.model}</h3>
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {vehicle.electricRange} km
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {vehicle.capacity}
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <p className="font-bold text-[#065F46]">${vehicle.rentalCostPerHour}/hora</p>
                      <button className="bg-[#34D399] hover:bg-[#10B981] text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Recoge y devuelve tus vehículos en cualquiera de nuestras 15 estaciones en la ciudad
              </p>
              <button className="bg-[#065F46] hover:bg-[#047857] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
                Ver Todos los Vehículos
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
