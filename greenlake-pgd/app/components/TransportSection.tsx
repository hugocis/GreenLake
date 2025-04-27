"use client";
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

import { useState, useEffect } from 'react';
import { TransportRouteAPI, TransportationHubAPI, ElectricVehicleAPI } from '@/lib/api-client';
import { TransportRoute, Infrastructure, InfrastructureTransportationHub, ElectricRentalVehicle } from '@/lib/types';

type TransportRouteWithDetails = {
  id: string;
  routeName: string;
  transportType: string;
  originCity: string;
  destinationCity: string;
  distanceKm: number;
  travelMinutes: number;
  frequency: string;
  departureTimes: string;
  capacity: number;
  price: number;
  utilizationPercent: number;
  efficiencyScore: number;
  carbonFootprintKg: number;
};

type RentalVehicleWithDetails = {
  id: string;
  vehicleType: string;
  brand: string;
  model: string;
  batteryRange: number;
  pricePerHour: number;
  pricePerDay: number;
  locationName: string;
  availableVehicles: number;
};

// Función para transformar datos de la API en el formato que espera el componente
const transformApiRoutes = (apiRoutes: TransportRoute[]): TransportRouteWithDetails[] => {
  return apiRoutes.map(route => ({
    id: route.route_id,
    routeName: route.route_name,
    transportType: route.transport_type,
    originCity: route.cities_transport_routes_origin_city_idTocities?.name || "Ciudad origen",
    destinationCity: route.cities_transport_routes_destination_city_idTocities?.name || "Ciudad destino",
    distanceKm: route.distance_km,
    travelMinutes: route.travel_minutes,
    frequency: route.frequency,
    departureTimes: route.departure_times,
    capacity: route.capacity,
    price: typeof route.price === 'number' ? route.price : parseFloat(route.price) || 0,
    utilizationPercent: typeof route.utilization_percent === 'number' ? route.utilization_percent : parseFloat(route.utilization_percent) || 0,
    efficiencyScore: typeof route.efficiency_score === 'number' ? route.efficiency_score : parseFloat(route.efficiency_score) || 0,
    carbonFootprintKg: typeof route.carbon_footprint_kg === 'number' ? route.carbon_footprint_kg : parseFloat(route.carbon_footprint_kg) || 0
  }));
};

// Función para transformar datos de vehículos eléctricos de la API
const transformElectricVehicles = (apiVehicles: ElectricRentalVehicle[]): RentalVehicleWithDetails[] => {
  return apiVehicles.map(vehicle => ({
    id: vehicle.id || String(Math.random()),
    vehicleType: vehicle.type || "Vehículo Eléctrico",
    brand: vehicle.make || "Marca desconocida",
    model: vehicle.model || "Modelo desconocido",
    batteryRange: vehicle.electric_range || 0,
    pricePerHour: vehicle.rental_cost_per_hour || 0,
    pricePerDay: (vehicle.rental_cost_per_hour || 0) * 8, // Estimación de costo por día
    locationName: vehicle.cities?.name || "Ubicación desconocida",
    availableVehicles: Math.floor(Math.random() * 10) + 1, // Dato simulado por ahora
  }));
};

export default function TransportSection() {
  const [activeTab, setActiveTab] = useState('public');
  const [transportRoutes, setTransportRoutes] = useState<TransportRouteWithDetails[]>([]);
  const [rentalVehicles, setRentalVehicles] = useState<RentalVehicleWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Cargar datos de rutas de transporte desde la API
  useEffect(() => {
    async function fetchTransportRoutes() {
      try {
        setLoading(true);
        const response = await TransportRouteAPI.getAllTransportRoutes({ limit: 10 });
        const transformedRoutes = transformApiRoutes(response.data);
        setTransportRoutes(transformedRoutes.length > 0 ? transformedRoutes : []);
        setError(null);
      } catch (error) {
        console.error("Error fetching transport routes:", error);
        setError("No se pudieron cargar las rutas de transporte.");
        setTransportRoutes([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTransportRoutes();
  }, []);
  
  // Cargar datos de vehículos eléctricos de alquiler desde la API
  useEffect(() => {
    async function fetchRentalVehicles() {
      try {
        if (activeTab === 'rental') {
          setLoading(true);
          const response = await ElectricVehicleAPI.getAllVehicles({ limit: 8 });
          const transformedVehicles = transformElectricVehicles(response.data);
          setRentalVehicles(transformedVehicles.length > 0 ? transformedVehicles : []);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching rental vehicles:", error);
        setError("No se pudieron cargar los vehículos de alquiler.");
        setRentalVehicles([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRentalVehicles();
  }, [activeTab]);
  
  return (
    <section id="transport" className="py-16 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#065F46] text-center mb-3">
          Transporte Sostenible
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Muévete por la ciudad de forma eficiente y respetuosa con el medio ambiente
        </p>
        
        {/* Pestañas */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setActiveTab('public')}
              className={`px-6 py-2 rounded-full ${activeTab === 'public' ? 'bg-[#10B981] text-white' : 'text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
            >
              Transporte Público
            </button>
            <button
              onClick={() => setActiveTab('rental')}
              className={`px-6 py-2 rounded-full ${activeTab === 'rental' ? 'bg-[#10B981] text-white' : 'text-[#10B981] hover:bg-[#D1FAE5]'} transition-all duration-300`}
            >
              Vehículos de Alquiler
            </button>
          </div>
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
        
        {/* Contenido de pestaña de transporte público */}
        {activeTab === 'public' && (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-[#D1FAE5] text-[#065F46]">
                <tr>
                  <th className="py-3 px-4 text-left">Ruta</th>
                  <th className="py-3 px-4 text-left">Tipo</th>
                  <th className="py-3 px-4 text-left">Origen - Destino</th>
                  <th className="py-3 px-4 text-left">Tiempo</th>
                  <th className="py-3 px-4 text-left">Frecuencia</th>
                  <th className="py-3 px-4 text-right">Precio</th>
                  <th className="py-3 px-4 text-right">Eco Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transportRoutes.map(route => (
                  <tr key={route.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-[#065F46]">{route.routeName}</td>
                    <td className="py-3 px-4">{route.transportType}</td>
                    <td className="py-3 px-4">{route.originCity} → {route.destinationCity}</td>
                    <td className="py-3 px-4">{route.travelMinutes} min.</td>
                    <td className="py-3 px-4">{route.frequency}</td>
                    <td className="py-3 px-4 text-right">
                      ${typeof route.price === 'number' ? route.price.toFixed(2) : route.price}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {typeof route.efficiencyScore === 'number' ? route.efficiencyScore.toFixed(1) : route.efficiencyScore}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Contenido de pestaña de vehículos de alquiler */}
        {activeTab === 'rental' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rentalVehicles.map(vehicle => (
              <div key={vehicle.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-40 bg-[#065F46] flex items-center justify-center">
                  {vehicle.vehicleType.includes('Coche') && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {vehicle.vehicleType.includes('Moto') && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {vehicle.vehicleType.includes('Bicicleta') && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {vehicle.vehicleType.includes('Scooter') && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-2 py-1 rounded mr-2">
                      {vehicle.vehicleType}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#065F46] mb-1">{vehicle.brand} {vehicle.model}</h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {vehicle.locationName} • {vehicle.availableVehicles} disponibles
                  </p>
                  <div className="flex items-center text-sm mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-gray-600">Autonomía: <span className="font-medium">{vehicle.batteryRange} km</span></span>
                  </div>
                  <div className="flex justify-between border-t pt-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500">Por hora</p>
                      <p className="text-[#065F46] font-bold">
                        ${typeof vehicle.pricePerHour === 'number' ? vehicle.pricePerHour.toFixed(2) : vehicle.pricePerHour}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Por día</p>
                      <p className="text-[#065F46] font-bold">
                        ${typeof vehicle.pricePerDay === 'number' ? vehicle.pricePerDay.toFixed(2) : vehicle.pricePerDay}
                      </p>
                    </div>
                    <button className="bg-[#10B981] hover:bg-[#047857] text-white text-sm px-3 py-1 rounded transition-all duration-300">
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <button className="bg-[#065F46] hover:bg-[#047857] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
            Ver Todas las Opciones
          </button>
        </div>
      </div>
    </section>
  );
}
