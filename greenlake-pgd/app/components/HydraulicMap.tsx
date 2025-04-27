"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Definir el tipo para los datos de eficiencia hidráulica
type Point = {
  sensor_id: string;
  lat: number;
  lng: number;
  power_watts: number;
};

interface HydraulicMapProps {
  points: Point[];
  mapCenter: [number, number];
  zoom: number;
}

// Función para obtener color según potencia generada
const getPowerColor = (power: number): string => {
  if (power > 100000000) return '#d73027'; // Muy alto (rojo)
  if (power > 95000000) return '#fc8d59';  // Alto (naranja)
  if (power > 90000000) return '#fee08b';  // Medio (amarillo)
  if (power > 85000000) return '#d9ef8b';  // Bajo (verde claro)
  return '#91cf60'; // Muy bajo (verde)
};

export default function HydraulicMap({ points, mapCenter, zoom }: HydraulicMapProps) {
  // Arregla el problema de los iconos de Leaflet en Next.js
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  // Función para renderizar marcadores en el mapa
  const renderMarkers = () => {
    return points.map((point) => {
      // Verificar que lat y lng son válidos
      if (isNaN(point.lat) || isNaN(point.lng)) return null;
      
      // Calcular radio proporcional a la potencia, con límite máximo
      // Ajuste para potencias en millones
      const normalizedPower = point.power_watts / 10000000; // Dividir por 10 millones para normalizar
      const radius = Math.min(Math.sqrt(normalizedPower) * 2 + 5, 20);
      
      return (
        <CircleMarker 
          key={point.sensor_id}
          center={[point.lat, point.lng]}
          pathOptions={{
            fillColor: getPowerColor(point.power_watts),
            fillOpacity: 0.7,
            stroke: true,
            weight: 1,
            color: "#333"
          }}
          radius={radius}
        >
          <Popup>
            <div className="p-2">
              <h3 className="text-lg font-semibold text-[#065F46]">Sensor: {point.sensor_id.substring(0, 8)}...</h3>
              <p className="font-bold text-lg">Potencia: {(point.power_watts / 1000000).toFixed(2)} MW</p>
              <p className="text-sm text-gray-600">Coordenadas: {point.lat.toFixed(5)}, {point.lng.toFixed(5)}</p>
            </div>
          </Popup>
        </CircleMarker>
      );
    });
  };

  return (
    <div className="h-[500px] relative" style={{ zIndex: 0 }}>
      <MapContainer 
        center={mapCenter}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        key={`map-key-${mapCenter[0]}-${mapCenter[1]}-${points.length}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderMarkers()}
      </MapContainer>
    </div>
  );
}
