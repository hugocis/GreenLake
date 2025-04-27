"use client";

import { useState, useEffect } from 'react';

interface SensorAlert {
  id: string;
  type: string;
  location: string;
  value: number;
  threshold: number;
  unit: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  acknowledged: boolean;
}

interface SensorAlertsProps {
  data: any[];
}

export default function SensorAlerts({ data }: SensorAlertsProps) {
  const [alerts, setAlerts] = useState<SensorAlert[]>([]);
  
  // Definir tipos de sensores y sus umbrales
  const sensorTypes = {
    'Air': { unit: 'AQI', threshold: 100, label: 'Calidad del Aire' },
    'Traffic': { unit: 'veh/h', threshold: 500, label: 'Tráfico' },
    'Water quality': { unit: 'ppm', threshold: 400, label: 'Calidad del Agua' },
    'Water usage': { unit: 'm³/h', threshold: 30, label: 'Uso del Agua' },
    'Water': { unit: 'ppm', threshold: 400, label: 'Agua' },
    'Energy': { unit: 'kWh', threshold: 500, label: 'Consumo Energético' },
    'Noise': { unit: 'dB', threshold: 75, label: 'Nivel de Ruido' },
    'Ambient': { unit: '°C', threshold: 28, label: 'Temperatura' },
    'default': { unit: 'unidades', threshold: 50, label: 'Sensor' }
  };
  
  // Función para generar alertas basadas en datos reales o simuladas
  const generateAlerts = (sensorData: any[]) => {
    if (!sensorData || sensorData.length === 0) return [];
    
    // Determinar cuántas alertas generar (entre 2 y 5)
    const alertCount = Math.floor(Math.random() * 4) + 2;
    const newAlerts: SensorAlert[] = [];
    
    // Generar alertas basadas en sensores reales
    for (let i = 0; i < Math.min(alertCount, sensorData.length); i++) {
      const sensor = sensorData[i];
      const sensorType = sensor.sensor_type || 'default';
      const typeInfo = sensorTypes[sensorType as keyof typeof sensorTypes] || sensorTypes.default;
      
      // Generar un valor que supere el umbral
      const threshold = typeInfo.threshold;
      const exceedFactor = Math.random() * 0.5 + 1.05; // Entre 5% y 55% por encima del umbral
      const value = threshold * exceedFactor;
      
      // Determinar la gravedad según cuánto supera el umbral
      let severity: 'low' | 'medium' | 'high';
      if (exceedFactor < 1.15) severity = 'low';
      else if (exceedFactor < 1.35) severity = 'medium';
      else severity = 'high';
      
      // Generar timestamp entre los últimos 30 minutos
      const timestamp = new Date();
      timestamp.setMinutes(timestamp.getMinutes() - Math.floor(Math.random() * 30));
      
      // Crear la alerta
      newAlerts.push({
        id: `alert-${i}-${Date.now()}`,
        type: sensorType,
        location: sensor.location || `Sector ${String.fromCharCode(65 + Math.floor(Math.random() * 10))}`,
        value: Math.round(value * 10) / 10,
        threshold: threshold,
        unit: typeInfo.unit,
        timestamp: timestamp,
        severity: severity,
        acknowledged: Math.random() > 0.7 // 30% de probabilidad de que esté reconocida
      });
    }
    
    // Ordenar las alertas por gravedad y luego por timestamp (las más recientes primero)
    return newAlerts.sort((a, b) => {
      const severityOrder = { high: 0, medium: 1, low: 2 };
      const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
      if (severityDiff !== 0) return severityDiff;
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  };
  
  // Inicializar y actualizar alertas
  useEffect(() => {
    setAlerts(generateAlerts(data));
    
    // Actualizar alertas periódicamente
    const interval = setInterval(() => {
      setAlerts(prevAlerts => {
        // Mantener algunas alertas existentes y añadir nuevas
        const keptAlerts = prevAlerts
          .filter(alert => alert.acknowledged || Math.random() > 0.3) // 70% de las alertas reconocidas se mantienen
          .slice(0, 3); // Mantener máximo 3 alertas antiguas
        
        const newAlerts = generateAlerts(data).slice(0, 2); // Añadir hasta 2 alertas nuevas
        
        return [...keptAlerts, ...newAlerts];
      });
    }, 8000); // Actualizar cada 8 segundos
    
    return () => clearInterval(interval);
  }, [data]);
  
  // Manejar el reconocimiento de una alerta
  const acknowledgeAlert = (id: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  };
  
  // Obtener un ícono basado en el tipo de sensor
  const getIconForSensorType = (type: string) => {
    switch(type) {
      case 'Air':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
      case 'Water':
      case 'Water quality':
      case 'Water usage':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'Energy':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'Noise':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-4.242 4.242m-8.486 0l4.242-4.242" />
          </svg>
        );
      case 'Traffic':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
    }
  };
  
  // Obtener color basado en la gravedad
  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch(severity) {
      case 'low':
        return 'border-yellow-300 bg-yellow-50';
      case 'medium':
        return 'border-orange-400 bg-orange-50';
      case 'high':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };
  
  // Obtener texto basado en la gravedad
  const getSeverityText = (severity: 'low' | 'medium' | 'high') => {
    switch(severity) {
      case 'low':
        return 'text-yellow-700';
      case 'medium':
        return 'text-orange-700';
      case 'high':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-[#065F46] flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Alertas de Sensores
          {alerts.filter(a => !a.acknowledged).length > 0 && (
            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {alerts.filter(a => !a.acknowledged).length} nuevas
            </span>
          )}
        </h2>
        <div className="text-xs text-gray-500">
          Se muestran alertas de las últimas 24 horas
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {alerts.length === 0 ? (
          <div className="py-4 text-center text-gray-500">
            No hay alertas activas en este momento
          </div>
        ) : (
          alerts.map(alert => {
            const typeInfo = sensorTypes[alert.type as keyof typeof sensorTypes] || sensorTypes.default;
            return (
              <div 
                key={alert.id} 
                className={`py-3 px-2 ${
                  !alert.acknowledged ? `${getSeverityColor(alert.severity)} border-l-4` : ''
                } transition-all duration-300`}
              >
                <div className="flex items-start">
                  <div className={`rounded-full p-1.5 mr-3 ${
                    !alert.acknowledged ? getSeverityText(alert.severity) : 'text-gray-400'
                  }`}>
                    {getIconForSensorType(alert.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className={`text-sm font-medium ${
                        !alert.acknowledged ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {typeInfo.label} - {alert.location}
                      </p>
                      <p className="text-xs text-gray-500">
                        {alert.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Valor: <span className={`font-medium ${getSeverityText(alert.severity)}`}>{alert.value} {alert.unit}</span> 
                      <span className="mx-1">•</span>
                      Umbral: {alert.threshold} {alert.unit}
                    </p>
                  </div>
                  
                  {!alert.acknowledged && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="ml-3 bg-white text-gray-700 hover:bg-gray-100 text-xs px-2 py-1 rounded border border-gray-300"
                    >
                      Reconocer
                    </button>
                  )}
                </div>
                {!alert.acknowledged && alert.severity === 'high' && (
                  <div className="mt-2 ml-10 text-xs text-red-700">
                    Acción requerida: Revisar sensor inmediatamente
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      
      {alerts.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button 
            onClick={() => setAlerts(alerts.map(a => ({ ...a, acknowledged: true })))}
            className="text-sm text-[#10B981] hover:text-[#065F46] flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Reconocer todas
          </button>
        </div>
      )}
    </div>
  );
}
