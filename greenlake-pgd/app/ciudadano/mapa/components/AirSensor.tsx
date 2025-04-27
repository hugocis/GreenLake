'use client';

import { Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

interface Location {
  type: string;
  coordinates: number[];
}

interface AirSensorProps {
  id: string;
  location: Location;
  installed_at: Date;
  co2_level: number | null;
}



const airSensorIcon = L.divIcon({
  className: 'sensor-marker',
  html: `<div style="width: 12px; height: 12px; background-color: white; border-radius: 50%; border: 2px solid black;"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const getRandomAirQualityColor = (): string => {
  const random = Math.random(); // Valor aleatorio entre 0 y 1

  if (random < 0.6) {
    return 'green';   // 60% de probabilidad verde
  } else if (random < 0.85) {
    return 'yellow';  // 25% de probabilidad amarillo
  } else {
    return 'red';     // 15% de probabilidad rojo
  }
};


export default function AirSensor({ id, location, installed_at, co2_level }: AirSensorProps) {
  if (!location?.coordinates?.length) return null;

  const [lng, lat] = location.coordinates;
  const color = getRandomAirQualityColor();

  return (
    <>
      <Marker
        position={[lat, lng]}
        icon={airSensorIcon}
        zIndexOffset={100}
      >
        <Popup>
          <div>
            <div className="font-bold">Sensor {id}</div>
            <div>Tipo: Air</div>
            <div className="text-sm text-gray-600">
              Instalado: {new Date(installed_at).toLocaleDateString()}
            </div>
            {co2_level !== null && (
              <div>Nivel CO₂: {co2_level} ppm</div>
            )}
          </div>
        </Popup>
      </Marker>
      <Circle
        center={[lat, lng]}
        radius={900} // Cambiado de 400 a 800 metros
        pathOptions={{
          color: color,
          fillColor: color,
          fillOpacity: 0.35,
          weight: 1
        }}
      />
    </>
  );
}
