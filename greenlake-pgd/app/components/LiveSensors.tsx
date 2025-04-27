"use client";

import { useState, useEffect } from 'react';

interface SensorData {
  id: string;
  type: string;
  value: number;
  unit: string;
  location: string;
  timestamp: Date;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface LiveSensorsProps {
  category?: string; // filtrar por tipo de sensor si se proporciona
}

export default function LiveSensors({ category }: LiveSensorsProps) {
  const [sensors, setSensors] = useState<SensorData[]>([]);
  
  // Crear algunos tipos de sensores predefinidos
  const sensorTypes = [
    { 
      type: 'Air', 
      label: 'Calidad del aire', 
      unit: 'AQI', 
      minValue: 0, 
      maxValue: 500,
      normalRange: [0, 50],
      warningRange: [51, 150],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    },
    { 
      type: 'Water', 
      label: 'Calidad del agua', 
      unit: 'ppm', 
      minValue: 0, 
      maxValue: 1000,
      normalRange: [0, 200],
      warningRange: [201, 500],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    { 
      type: 'Energy', 
      label: 'Consumo energético', 
      unit: 'kWh', 
      minValue: 0, 
      maxValue: 1000,
      normalRange: [0, 400],
      warningRange: [401, 700],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      type: 'Noise', 
      label: 'Nivel de ruido', 
      unit: 'dB', 
      minValue: 0, 
      maxValue: 120,
      normalRange: [0, 60],
      warningRange: [61, 85],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-4.242 4.242m-8.486 0l4.242-4.242" />
        </svg>
      )
    }
  ];
  
  // Seleccionar cuatro tipos de sensores para mostrar
  const displayedSensorTypes = category 
    ? sensorTypes.filter(s => s.type === category) 
    : sensorTypes.slice(0, 4);
  
  // Función para generar un valor aleatorio dentro de un rango
  const randomInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  // Función para determinar el estado del sensor basado en su valor
  const getSensorStatus = (value: number, sensorType: string) => {
    const type = sensorTypes.find(s => s.type === sensorType);
    if (!type) return 'normal';
    
    if (value <= type.normalRange[1]) return 'normal';
    else if (value <= type.warningRange[1]) return 'warning';
    else return 'critical';
  };
  
  // Función para generar un cambio de tendencia
  const getTrend = (oldValue: number, newValue: number): 'up' | 'down' | 'stable' => {
    const diff = newValue - oldValue;
    if (diff > 5) return 'up';
    else if (diff < -5) return 'down';
    else return 'stable';
  };
  
  // Inicializar sensores al cargar el componente
  useEffect(() => {
    // Crear datos iniciales de sensores
    const initialSensors = displayedSensorTypes.map((sensorType, index) => {
      const initialValue = randomInRange(sensorType.minValue, sensorType.maxValue);
      return {
        id: `sensor-${index}`,
        type: sensorType.type,
        value: initialValue,
        unit: sensorType.unit,
        location: `Sector ${String.fromCharCode(65 + index)}`, // A, B, C, D...
        timestamp: new Date(),
        status: getSensorStatus(initialValue, sensorType.type) as 'normal' | 'warning' | 'critical',
        trend: 'stable' as const
      };
    });
    
    setSensors(initialSensors);
    
    // Configurar actualizaciones periódicas para simular datos en tiempo real
    const interval = setInterval(() => {
      setSensors(currentSensors => {
        return currentSensors.map(sensor => {
          // Generar una variación aleatoria en el valor del sensor
          const variation = randomInRange(-15, 15);
          const newValue = Math.max(
            sensorTypes.find(s => s.type === sensor.type)?.minValue || 0,
            Math.min(
              sensor.value + variation,
              sensorTypes.find(s => s.type === sensor.type)?.maxValue || 100
            )
          );
          
          return {
            ...sensor,
            value: newValue,
            timestamp: new Date(),
            status: getSensorStatus(newValue, sensor.type),
            trend: getTrend(sensor.value, newValue)
          };
        });
      });
    }, 3000); // Actualizar cada 3 segundos
    
    return () => clearInterval(interval);
  }, [category]);
  
  // Obtener el icono de tendencia basado en la dirección
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch(trend) {
      case 'up':
        return (
          <span className="text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </span>
        );
      case 'down':
        return (
          <span className="text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </span>
        );
      default:
        return (
          <span className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 10a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </span>
        );
    }
  };
  
  // Obtener el color de fondo basado en el estado del sensor
  const getStatusBackgroundColor = (status: 'normal' | 'warning' | 'critical') => {
    switch(status) {
      case 'normal':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };
  
  // Obtener el color de texto basado en el estado del sensor
  const getStatusTextColor = (status: 'normal' | 'warning' | 'critical') => {
    switch(status) {
      case 'normal':
        return 'text-green-700';
      case 'warning':
        return 'text-yellow-700';
      case 'critical':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-[#065F46] mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
        Sensores en Tiempo Real
        <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <span className="animate-ping absolute h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
          <span className="relative h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
          En vivo
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sensors.map(sensor => {
          const sensorType = sensorTypes.find(s => s.type === sensor.type);
          return (
            <div 
              key={sensor.id} 
              className={`p-4 border rounded-lg shadow-sm transition-all duration-500 ${getStatusBackgroundColor(sensor.status)}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${getStatusTextColor(sensor.status)} bg-opacity-20`}>
                    {sensorType?.icon}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-700">{sensorType?.label || sensor.type}</h3>
                    <p className="text-xs text-gray-500">{sensor.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {getTrendIcon(sensor.trend)}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-end">
                  <span className={`text-3xl font-bold ${getStatusTextColor(sensor.status)}`}>
                    {sensor.value.toFixed(1)}
                  </span>
                  <span className="ml-1 text-sm text-gray-500">
                    {sensor.unit}
                  </span>
                </div>
                
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      sensor.status === 'normal' ? 'bg-green-500' : 
                      sensor.status === 'warning' ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`} 
                    style={{ 
                      width: `${(sensor.value / (sensorType?.maxValue || 100)) * 100}%`,
                      transition: 'width 0.5s ease-in-out'
                    }}
                  ></div>
                </div>
                
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>
                    Actualizado: {sensor.timestamp.toLocaleTimeString()}
                  </span>
                  <span>
                    {sensor.status === 'normal' ? 'Normal' : 
                     sensor.status === 'warning' ? 'Atención' : 
                     'Crítico'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
