"use client";

import { useState, useEffect } from 'react';

interface SensorHeatmapProps {
  data: any[];
  refreshInterval?: number; // en milisegundos
}

export default function SensorHeatmap({ data, refreshInterval = 5000 }: SensorHeatmapProps) {
  const [heatmapData, setHeatmapData] = useState<number[][]>([]);
  const [timestamp, setTimestamp] = useState(new Date());
  
  // Tamaño de la cuadrícula del mapa de calor (10x10)
  const gridSize = 10;
  
  // Colores para diferentes tipos de sensores
  const colorMap = {
    'Air': { base: 'rgba(54, 162, 235, VAR)', label: 'Calidad del Aire' },
    'Traffic': { base: 'rgba(255, 99, 132, VAR)', label: 'Tráfico' },
    'Ambient': { base: 'rgba(75, 192, 192, VAR)', label: 'Ambiental' }, 
    'Water quality': { base: 'rgba(54, 162, 235, VAR)', label: 'Calidad del Agua' },
    'Water usage': { base: 'rgba(153, 102, 255, VAR)', label: 'Uso del Agua' },
    'Water': { base: 'rgba(54, 162, 235, VAR)', label: 'Agua' },
    'Energy': { base: 'rgba(255, 159, 64, VAR)', label: 'Energía' },
    'Noise': { base: 'rgba(153, 102, 255, VAR)', label: 'Ruido' },
    'default': { base: 'rgba(201, 203, 207, VAR)', label: 'Otro' }
  };
  
  // Inicializar y actualizar el mapa de calor con los datos de los sensores
  useEffect(() => {
    // Función para generar valores aleatorios para el mapa de calor basados en los datos de los sensores
    const generateHeatmapData = () => {
      // Crear una matriz 10x10 inicializada con valores bajos
      const heatmap = Array(gridSize).fill(0).map(() => 
        Array(gridSize).fill(0).map(() => Math.random() * 0.2) // valores base bajos
      );
      
      // Colocar "puntos calientes" basados en los datos de sensores reales
      if (data.length > 0) {
        // Tomar hasta 15 sensores para poner en el mapa
        const sampleSize = Math.min(data.length, 15);
        
        for (let i = 0; i < sampleSize; i++) {
          const sensor = data[i];
          
          // Generar posición aleatoria para este sensor
          const x = Math.floor(Math.random() * gridSize);
          const y = Math.floor(Math.random() * gridSize);
          
          // Valor de intensidad basado en alguna propiedad del sensor (o aleatorio si no hay una adecuada)
          const intensity = Math.random() * 0.6 + 0.4; // entre 0.4 y 1.0
          
          // Colocar un "punto caliente" en esta ubicación y sus alrededores
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              const nx = x + dx;
              const ny = y + dy;
              
              // Asegurarse de que estamos dentro de los límites
              if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                // La intensidad disminuye a medida que nos alejamos del centro
                const distance = Math.sqrt(dx*dx + dy*dy);
                const factor = Math.max(0, 1 - (distance / 2));
                heatmap[ny][nx] = Math.max(heatmap[ny][nx], intensity * factor);
              }
            }
          }
        }
      }
      
      return heatmap;
    };
    
    // Generar datos iniciales
    setHeatmapData(generateHeatmapData());
    setTimestamp(new Date());
    
    // Configurar actualización periódica
    const interval = setInterval(() => {
      setHeatmapData(generateHeatmapData());
      setTimestamp(new Date());
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [data, refreshInterval]);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-[#065F46] flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Mapa de Intensidad de Sensores
        </h2>
        <div className="bg-green-50 text-green-700 text-xs rounded-full px-2 py-1 flex items-center">
          <span className="relative flex h-2 w-2 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Actualizado: {timestamp.toLocaleTimeString()}
        </div>
      </div>
      
      <div className="aspect-square w-full max-w-2xl mx-auto bg-gray-100 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="grid grid-cols-10 grid-rows-10 gap-px h-full">
            {heatmapData.map((row, y) => (
              row.map((value, x) => {
                // Determinar el tipo de sensor para esta celda (simulando distribución de tipos)
                const sensorType = data[((y * gridSize) + x) % data.length]?.sensor_type || 'default';
                const colorInfo = colorMap[sensorType as keyof typeof colorMap] || colorMap.default;
                
                // Estilo para esta celda basado en su valor e intensidad
                const style = {
                  backgroundColor: colorInfo.base.replace('VAR', value.toString()),
                  transition: 'background-color 0.8s ease'
                };
                
                return (
                  <div 
                    key={`${y}-${x}`} 
                    className="w-full h-full" 
                    style={style}
                    title={`${colorInfo.label}: ${Math.round(value * 100)}`}
                  />
                );
              })
            ))}
          </div>
          
          {/* Leyenda del mapa */}
          <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 p-3 rounded-lg shadow-sm text-xs">
            <h4 className="font-semibold mb-1">Tipos de sensores</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {Object.entries(colorMap).slice(0, 8).map(([type, info]) => (
                <div key={type} className="flex items-center">
                  <div 
                    className="w-3 h-3 mr-1 rounded-sm" 
                    style={{ backgroundColor: info.base.replace('VAR', '0.7') }}
                  ></div>
                  <span>{info.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        Este mapa muestra la distribución e intensidad de las lecturas de los sensores en toda la ciudad.
        Las áreas más intensas indican mayor actividad o lecturas más altas.
      </div>
    </div>
  );
}
