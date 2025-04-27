'use client';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import AirSensor from './components/AirSensor';

// Interfaces para los datos
interface Location {
  type: string;
  coordinates: number[];
}

interface State {
  id: string;
  name: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

interface City {
  id: string;
  name: string;
  location: Location;
}

interface BaseSensor {
  id: string;
  sensor_type: string;
  location: Location;
  installed_at: Date;
}

interface AirSensor extends BaseSensor {
  sensor_type: 'air';
  co2_level: number | null;
}

interface OtherSensor extends BaseSensor {
  sensor_type: Exclude<string, 'air'>;
}

type Sensor = AirSensor | OtherSensor;

interface Road {
  id: string;
  name: string;
  geometry: {
    type: string;
    coordinates: number[][];
  };
  origin_city: {
    name: string;
  };
  target_city: {
    name: string;
  };
  length_km: number | null;
  toll: number | null;
  traffic_congestion: number | null;
}

// Configuración del icono para ciudades
const cityIcon = L.divIcon({
  className: 'city-marker',
  html: `<div class="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// Función para determinar el color de la carretera
const getRoadColor = (road: Road): string => {
  if (road.traffic_congestion !== null && road.traffic_congestion > 0.6) {
    return '#ef4444'; // Rojo para carreteras congestionadas
  }
  if (road.toll !== null && road.toll > 0) {
    return '#FFD700'; // Amarillo para carreteras con peaje
  }
  return '#3388ff'; // Azul para carreteras normales
};

const getAirQualityColor = (co2Level: number): string => {
  if (co2Level >= 350 && co2Level <= 500) return 'green';     // Buena
  if (co2Level > 500 && co2Level <= 800) return 'yellow';      // Moderada
  if (co2Level > 800) return 'red';        // Baja
  return 'gray'; // Nivel desconocido o fuera de rango
};


// Configuración del icono para sensores
const getSensorIcon = (type: string) => {
  let bgColor = '';
  switch (type) {
    case 'ambient': bgColor = '#22c55e'; break;  // Verde
    case 'Air': bgColor = '#ffffff'; break;      // Blanco
    case 'traffic': bgColor = '#ef4444'; break;  // Rojo
    case 'water': bgColor = '#3b82f6'; break;    // Azul
    default: bgColor = '#6b7280';
  }
  return L.divIcon({
    className: 'sensor-marker',
    html: `<div style="width: 12px; height: 12px; background-color: ${bgColor}; border-radius: 50%; border: 2px solid black;"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

// Componente para manejar el zoom a un estado
function StateZoomHandler({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds);
  }, [bounds, map]);
  return null;
}

export default function MapComponent() {  const [cities, setCities] = useState<City[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [roads, setRoads] = useState<Road[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar estados
        const statesRes = await fetch('/api/map/states');
        if (!statesRes.ok) {
          throw new Error(`Error fetching states: ${statesRes.statusText}`);
        }
        const statesData = await statesRes.json();
        if (Array.isArray(statesData)) {
          setStates(statesData);
        }

        // Cargar ciudades
        const citiesRes = await fetch('/api/map/cities');
        if (!citiesRes.ok) {
          throw new Error(`Error fetching cities: ${citiesRes.statusText}`);
        }
        const citiesData = await citiesRes.json();
        if (Array.isArray(citiesData)) {
          setCities(citiesData);
        }

        // Cargar sensores
        const sensorsRes = await fetch('/api/map/sensors');
        if (!sensorsRes.ok) {
          throw new Error(`Error fetching sensors: ${sensorsRes.statusText}`);
        }
        const sensorsData = await sensorsRes.json();
        if (Array.isArray(sensorsData)) {
          setSensors(sensorsData);
        }

        // Cargar carreteras
        const roadsRes = await fetch('/api/map/roads');
        if (!roadsRes.ok) {
          throw new Error(`Error fetching roads: ${roadsRes.statusText}`);
        }
        const roadsData = await roadsRes.json();
        if (Array.isArray(roadsData)) {
          setRoads(roadsData);
        }
      } catch (error) {
        console.error('Error cargando datos del mapa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Centro del mapa (usamos la primera ciudad o coordenadas por defecto)
  const defaultCenter: [number, number] = cities.length > 0
    ? [cities[0].location.coordinates[1], cities[0].location.coordinates[0]]
    : [-33.4489, -70.6693]; // Santiago de Chile como coordenadas por defecto

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />      {/* Renderizar estados (capa más inferior) */}
      {states.filter(state => 
        state && 
        state.geometry && 
        Array.isArray(state.geometry.coordinates) && 
        state.geometry.coordinates.length > 0 &&
        Array.isArray(state.geometry.coordinates[0])
      ).map((state) => (
        <Polygon
          key={state.id}
          positions={state.geometry.coordinates[0].map((coord: number[]) => 
            Array.isArray(coord) && coord.length >= 2 ? [coord[1], coord[0]] : [0, 0]
          )}
          pathOptions={{
            color: '#2c3e50',
            weight: 2,
            fillColor: '#3498db',
            fillOpacity: 0.2
          }}
        >
          <Popup>
            <div className="font-bold text-lg">{state.name}</div>
          </Popup>
        </Polygon>
      ))}{/* Renderizar carreteras primero (capa inferior) */}      {roads.filter(road => road && road.geometry && Array.isArray(road.geometry.coordinates) && road.geometry.coordinates.length > 0).map((road) => {
        console.log('Road geometry:', road.geometry); // Debug
        return (
          <Polyline
            key={road.id}            positions={road.geometry.coordinates.map(coord => 
              Array.isArray(coord) && coord.length >= 2 ? [coord[1], coord[0]] : [0, 0]
            )}            pathOptions={{
              color: getRoadColor(road),
              weight: 3,
              opacity: 0.8
            }}
          ><Popup>
              <div>
                <div className="font-bold">Carretera</div>
                <div>Desde: {road.origin_city.name}</div>
                <div>Hasta: {road.target_city.name}</div>
                {road.length_km && (
                  <div>Distancia: {road.length_km.toFixed(1)} km</div>
                )}                {road.toll !== null && road.toll > 0 && (
                  <div>Peaje: ${road.toll.toFixed(2)}</div>
                )}
                {road.traffic_congestion !== null && (
                  <div>Índice de congestión: {road.traffic_congestion.toFixed(2)}</div>
                )}
              </div>
            </Popup>
          </Polyline>
        );
      })}      {/* Renderizar ciudades (capa media) */}
      {cities.map((city) => {
        console.log('City location:', city.location); // Debug
        // Skip cities without valid location
        if (!city.location?.coordinates?.length) {
          return null;
        }
        return (
          <Marker
            key={city.id}
            position={[city.location.coordinates[1], city.location.coordinates[0]]}
            icon={cityIcon}
            zIndexOffset={200}
          >
            <Popup>
              <div>
                <div className="font-bold">{city.name}</div>
              </div>
            </Popup>
          </Marker>
        );
      })}      {/* Renderizar sensores (capa superior) */}
      {sensors.map((sensor) => {
        if (!sensor.location?.coordinates?.length) return null;

        if (sensor.sensor_type === 'air') {
          return (
            <AirSensor
              key={sensor.id}
              id={sensor.id}
              location={sensor.location}
              installed_at={sensor.installed_at}
              co2_level={(sensor as AirSensor).co2_level}
            />
          );
        }

        return (
          <Marker
            key={sensor.id}
            position={[sensor.location.coordinates[1], sensor.location.coordinates[0]]}
            icon={getSensorIcon(sensor.sensor_type)}
            zIndexOffset={100}
          >
            <Popup>
              <div>
                <div className="font-bold">Sensor {sensor.id}</div>
                <div>Tipo: {sensor.sensor_type}</div>
                <div className="text-sm text-gray-600">
                  Instalado: {new Date(sensor.installed_at).toLocaleDateString()}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* Renderizar ciudades al final */}
      {cities.map((city) => (
        <Marker
          key={city.id}
          position={[city.location.coordinates[1], city.location.coordinates[0]]}
          icon={cityIcon}
          zIndexOffset={1000} // Mayor valor para asegurar que esté por encima
        >
          <Popup>
            <div className="font-bold">{city.name}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
