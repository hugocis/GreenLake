/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */
"use client";

import { useState, useEffect } from 'react';

interface SensorMetric {
  sensor_id: string;
  event_time: string;
  [key: string]: any;
}

interface SensorMetricsCardProps {
  title: string;
  type: 'air' | 'ambient' | 'traffic' | 'water_quality' | 'water_usage';
  icon: React.ReactNode;
  color: string;
}

export default function SensorMetricsCard({ title, type, icon, color }: SensorMetricsCardProps) {
  const [metrics, setMetrics] = useState<SensorMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchMetrics = async () => {
    try {
      const response = await fetch(`/api/sensors/metrics?type=${type}&limit=5`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setMetrics(data.data || []);
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${type} metrics:`, err);
      setError('Error al cargar los datos del sensor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    // Actualizar cada 10 segundos
    const interval = setInterval(() => {
      fetchMetrics();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [type]);

  const getKeyMetric = (metric: SensorMetric): { label: string; value: string | number; unit: string } => {
    // Devuelve la métrica principal según el tipo
    switch (type) {
      case 'air':
        return { 
          label: 'CO2', 
          value: metric.co2 !== null ? Number(metric.co2).toFixed(2) : 'N/A',
          unit: 'ppm'
        };
      case 'ambient':
        return { 
          label: 'Temperatura', 
          value: metric.temperature !== null ? Number(metric.temperature).toFixed(1) : 'N/A',
          unit: '°C'
        };
      case 'traffic':
        return { 
          label: 'Densidad', 
          value: metric.vehicle_density !== null ? Number(metric.vehicle_density).toFixed(0) : 'N/A',
          unit: 'veh/km'
        };
      case 'water_quality':
        return { 
          label: 'pH', 
          value: metric.ph_level !== null ? Number(metric.ph_level).toFixed(1) : 'N/A',
          unit: ''
        };
      case 'water_usage':
        return { 
          label: 'Uso', 
          value: metric.usage_liters !== null ? Number(metric.usage_liters).toFixed(0) : 'N/A',
          unit: 'L'
        };
      default:
        return { label: 'Valor', value: 'N/A', unit: '' };
    }
  };

  const getSecondaryMetric = (metric: SensorMetric): { label: string; value: string | number; unit: string } => {
    // Devuelve una métrica secundaria según el tipo
    switch (type) {
      case 'air':
        return { 
          label: 'NO2', 
          value: metric.no2 !== null ? Number(metric.no2).toFixed(2) : 'N/A',
          unit: 'ppm'
        };
      case 'ambient':
        return { 
          label: 'Humedad', 
          value: metric.humidity !== null ? Number(metric.humidity).toFixed(1) : 'N/A',
          unit: '%'
        };
      case 'traffic':
        return { 
          label: 'Velocidad', 
          value: metric.avg_speed !== null ? Number(metric.avg_speed).toFixed(0) : 'N/A',
          unit: 'km/h'
        };
      case 'water_quality':
        return { 
          label: 'Turbidez', 
          value: metric.turbidity !== null ? Number(metric.turbidity).toFixed(2) : 'N/A',
          unit: 'NTU'
        };
      case 'water_usage':
        // Water usage no tiene métricas secundarias en este modelo
        return { label: '', value: '', unit: '' };
      default:
        return { label: '', value: '', unit: '' };
    }
  };
  
  const formatTime = (date: string) => {
    try {
      const d = new Date(date);
      return d.toLocaleTimeString();
    } catch {
      return '';
    }
  };

  // Determinar el estado del sensor según el tipo y los valores
  const getSensorStatus = (metric: SensorMetric): 'normal' | 'warning' | 'critical' => {
    if (!metric) return 'normal';
    
    switch (type) {
      case 'air':
        const co2 = Number(metric.co2);
        if (co2 > 1000) return 'critical';
        if (co2 > 700) return 'warning';
        return 'normal';
        
      case 'ambient':
        const temp = Number(metric.temperature);
        if (temp > 35 || temp < 0) return 'critical';
        if (temp > 30 || temp < 5) return 'warning';
        return 'normal';
        
      case 'traffic':
        const density = Number(metric.vehicle_density);
        if (density > 100) return 'critical';
        if (density > 70) return 'warning';
        return 'normal';
        
      case 'water_quality':
        const ph = Number(metric.ph_level);
        if (ph < 6 || ph > 9) return 'critical';
        if (ph < 6.5 || ph > 8.5) return 'warning';
        return 'normal';
        
      case 'water_usage':
        const usage = Number(metric.usage_liters);
        if (usage > 10000) return 'critical';
        if (usage > 5000) return 'warning';
        return 'normal';
        
      default:
        return 'normal';
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-md border border-${color}-200 bg-white dark:bg-gray-800`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-800 mr-3`}>
            {icon}
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
          Tiempo real
        </span>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : metrics.length === 0 ? (
        <div className="text-center text-gray-500 py-4">No hay datos de sensores disponibles</div>
      ) : (
        <div className="space-y-3">
          {metrics.slice(0, 4).map((metric) => {
            const keyMetric = getKeyMetric(metric);
            const secondaryMetric = getSecondaryMetric(metric);
            const status = getSensorStatus(metric);
            
            return (
              <div 
                key={metric.sensor_id} 
                className={`
                  p-3 rounded-lg
                  ${status === 'normal' ? 'bg-green-50 dark:bg-green-900/20' : 
                    status === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' : 
                    'bg-red-50 dark:bg-red-900/20'}
                  transition-all duration-500 ease-in-out
                `}
              >
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ID: {metric.sensor_id.substring(0, 8)}...
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatTime(metric.event_time)}
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{keyMetric.label}</span>
                    <div className="text-xl font-bold">
                      {keyMetric.value} 
                      <span className="text-xs ml-1">{keyMetric.unit}</span>
                    </div>
                  </div>
                  
                  {secondaryMetric.label && (
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{secondaryMetric.label}</span>
                      <div className="text-xl font-bold">
                        {secondaryMetric.value}
                        <span className="text-xs ml-1">{secondaryMetric.unit}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className={`
                    flex items-center justify-center rounded-full w-6 h-6
                    ${status === 'normal' ? 'bg-green-500' : 
                      status === 'warning' ? 'bg-yellow-500' : 
                      'bg-red-500'}
                  `}>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
