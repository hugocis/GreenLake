"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import LocalNavbar from "../components/LocalNavbar";
import SimpleFooter from "../components/SimpleFooter";
import Link from "next/link";

// Cargar el componente del mapa solo en el cliente, sin SSR
const HydraulicMap = dynamic(() => import("../components/HydraulicMap"), { 
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex justify-center items-center bg-gray-100 rounded-xl">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#10B981]"></div>
        <p className="mt-4 text-gray-600">Cargando mapa...</p>
      </div>
    </div>
  )
});

// Definir el tipo para los datos de eficiencia hidráulica
type Point = {
  sensor_id: string;
  lat: number;
  lng: number;
  power_watts: number;
};

export default function HydraulicMapPage() {
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.416, -3.703]); // Madrid como predeterminado
  const [zoom, setZoom] = useState(5);

  // Obtener datos de eficiencia hidráulica
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/hydraulic-efficiency');
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data: Point[] = await response.json();
        console.log("Datos recibidos:", data);
        
        if (data && Array.isArray(data) && data.length > 0) {
          // Filtrar puntos con coordenadas válidas
          const validData = data.filter(point => 
            !isNaN(point.lat) && 
            !isNaN(point.lng) && 
            Math.abs(point.lat) <= 90 && 
            Math.abs(point.lng) <= 180 &&
            point.power_watts > 0
          );
          
          console.log(`Puntos recibidos: ${data.length}, puntos válidos: ${validData.length}`);
          setPoints(validData);
          
          // Calcular centro del mapa si hay puntos válidos
          if (validData.length > 0) {
            const latitudes = validData.map(p => p.lat);
            const longitudes = validData.map(p => p.lng);
            
            const avgLat = latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
            const avgLng = longitudes.reduce((sum, lng) => sum + lng, 0) / longitudes.length;
            
            if (!isNaN(avgLat) && !isNaN(avgLng)) {
              setMapCenter([avgLat, avgLng]);
              setZoom(validData.length > 1 ? 3 : 5); // Reducido a 3 para ver mejor un área amplia
            }
          }
        } else {
          setError("No se han recibido datos de sensores válidos.");
        }
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError("Error al cargar los datos de eficiencia hidráulica.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Función para formatear valores de potencia en formato legible
  const formatPower = (watts: number) => {
    if (watts >= 1000000) {
      return `${(watts / 1000000).toFixed(2)} MW`;
    } else if (watts >= 1000) {
      return `${(watts / 1000).toFixed(2)} kW`;
    } else {
      return `${watts.toFixed(2)} W`;
    }
  };

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
        
        <h1 className="text-3xl font-bold text-[#065F46] mb-6">Mapa de Eficiencia Hidráulica</h1>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#065F46] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-[#065F46] text-xl font-bold">Distribución de Sensores Hidráulicos</p>
            </div>
          </div>
          
          {/* Estado de carga */}
          {loading ? (
            <div className="h-[500px] flex justify-center items-center bg-gray-50 rounded-xl">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#10B981]"></div>
                <p className="mt-4 text-gray-600">Cargando datos de sensores...</p>
              </div>
            </div>
          ) : error ? (
            <div className="h-[500px] flex justify-center items-center bg-red-50 rounded-xl">
              <div className="flex flex-col items-center text-center max-w-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 text-xl font-bold mb-2">Error al cargar los datos</p>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          ) : (
            <HydraulicMap 
              points={points} 
              mapCenter={mapCenter} 
              zoom={zoom} 
            />
          )}
        </div>
        
        {/* Leyenda */}
        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#065F46] mb-4">Leyenda</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Potencia Generada</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="h-4 w-4 bg-[#d73027] rounded-full mr-2"></span>
                    <span>Muy alta (&gt; 100 MW)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-4 w-4 bg-[#fc8d59] rounded-full mr-2"></span>
                    <span>Alta (95-100 MW)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-4 w-4 bg-[#fee08b] rounded-full mr-2"></span>
                    <span>Media (90-95 MW)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-4 w-4 bg-[#d9ef8b] rounded-full mr-2"></span>
                    <span>Baja (85-90 MW)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-4 w-4 bg-[#91cf60] rounded-full mr-2"></span>
                    <span>Muy baja (&lt; 85 MW)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Tamaño del Marcador</h3>
                <p className="text-gray-700 mb-2">
                  El tamaño de cada círculo es proporcional a la potencia generada por el sensor.
                </p>
                <p className="text-gray-700">
                  Los sensores se muestran ordenados por potencia generada, con los más eficientes en la parte superior del listado.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Información adicional */}
        {!loading && !error && points.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold text-[#065F46] mb-4">Resumen de Sensores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Total de sensores</h3>
                <p className="text-2xl font-bold text-[#065F46]">{points.length}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Potencia promedio</h3>
                <p className="text-2xl font-bold text-[#065F46]">
                  {formatPower(points.reduce((sum, p) => sum + p.power_watts, 0) / points.length)}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Potencia máxima</h3>
                <p className="text-2xl font-bold text-[#065F46]">
                  {formatPower(Math.max(...points.map(p => p.power_watts)))}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Potencia mínima</h3>
                <p className="text-2xl font-bold text-[#065F46]">
                  {formatPower(Math.min(...points.map(p => p.power_watts)))}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <SimpleFooter />
      </div>
    </div>
  );
}
