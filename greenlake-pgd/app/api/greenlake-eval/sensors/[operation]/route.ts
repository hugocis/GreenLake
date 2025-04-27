import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

// Define el mapeo de unidades para cada métrica según el tipo de sensor
const UNIT_MAPPING: Record<string, Record<string, string>> = {
  air: {
    pm10: 'µg/m³',
    co: 'ppm',
    co2: 'ppm',
    no2: 'ppb',
    o3: 'ppb',
    so2: 'ppb'
  },
  ambient: {
    temperature: '°C',
    humidity: '%',
    solar_radiation: 'W/m²'
  },
  traffic: {
    vehicle_density: 'vehicles/km',
    avg_speed: 'km/h',
    flow_rate: 'vehicles/h',
    occupancy: '%',
    congestion_index: 'index'
  },
  water_quality: {
    water_temperature: '°C',
    ph_level: 'pH',
    turbidity: 'NTU',
    dissolved_oxygen: 'mg/L',
    conductivity: 'μS/cm'
  },
  water_usage: {
    usage_liters: 'L'
  }
};

// Función helper para obtener el nombre de la tabla de métricas según el tipo de sensor
function getSensorMetricTable(sensorType: string): string {
  switch (sensorType) {
    case 'air':
      return 'sensor_metrics_air';
    case 'ambient':
      return 'sensor_metrics_ambient';
    case 'traffic':
      return 'sensor_metrics_traffic';
    case 'water_quality':
      return 'sensor_metrics_water_quality';
    case 'water_usage':
      return 'sensor_metrics_water_usage';
    default:
      throw new Error(`Unsupported sensor type: ${sensorType}`);
  }
}

// GET handler para datos agregados de sensores
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ operation: string }> }
) {
  // Desestructuramos tras await para que TypeScript acepte bien el tipo
  const { operation } = await params;
  const validOperations = ['average', 'min', 'max'];

  if (!validOperations.includes(operation)) {
    return NextResponse.json(
      {
        metadata: {
          status: 'error',
          timestamp: new Date().toISOString(),
          message: `Invalid operation: ${operation}. Allowed operations are: ${validOperations.join(', ')}`
        }
      },
      { status: 400 }
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const cityId     = searchParams.get('city_id');
  const sensorType = searchParams.get('sensor_type');
  const dateStr    = searchParams.get('date');

  // Validación de parámetros obligatorios
  if (!cityId || !sensorType || !dateStr) {
    return NextResponse.json(
      {
        metadata: {
          status: 'error',
          timestamp: new Date().toISOString(),
          message: 'Missing required parameters: city_id, sensor_type, and date are required'
        }
      },
      { status: 400 }
    );
  }

  // Validación de sensor_type
  const validSensorTypes = ['air', 'ambient', 'traffic', 'water_quality', 'water_usage'];
  if (!validSensorTypes.includes(sensorType)) {
    return NextResponse.json(
      {
        metadata: {
          status: 'error',
          timestamp: new Date().toISOString(),
          message: `Invalid sensor_type: ${sensorType}. Allowed types are: ${validSensorTypes.join(', ')}`
        }
      },
      { status: 400 }
    );
  }

  // Validación de formato de fecha (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) {
    return NextResponse.json(
      {
        metadata: {
          status: 'error',
          timestamp: new Date().toISOString(),
          message: 'Invalid date format. Use YYYY-MM-DD'
        }
      },
      { status: 400 }
    );
  }

  // Rango completo del día
  const startDate = new Date(`${dateStr}T00:00:00Z`);
  const endDate   = new Date(`${dateStr}T23:59:59.999Z`);

  // Recuperar los IDs de sensores del tipo solicitado
  const sensors = await prisma.sensors.findMany({
    where: {
      city_id:     cityId,
      sensor_type: sensorType
    },
    select: { id: true }
  });

  if (sensors.length === 0) {
    return NextResponse.json(
      {
        metadata: {
          status: 'error',
          timestamp: new Date().toISOString(),
          message: `No ${sensorType} sensors found for the specified city`
        }
      },
      { status: 404 }
    );
  }

  const sensorIds = sensors.map(s => s.id);
  const tableName = getSensorMetricTable(sensorType);

  // Elegir la función de agregación
  let aggregationFn: string;
  switch (operation) {
    case 'average': aggregationFn = 'AVG'; break;
    case 'min':     aggregationFn = 'MIN'; break;
    case 'max':     aggregationFn = 'MAX'; break;
    default:        aggregationFn = 'AVG';
  }

  // Construir la parte SELECT con las columnas adecuadas
  let metricsQuery = '';
  switch (sensorType) {
    case 'air':
      metricsQuery = `
        ${aggregationFn}(pm10) as pm10,
        ${aggregationFn}(co) as co,
        ${aggregationFn}(co2) as co2,
        ${aggregationFn}(no2) as no2,
        ${aggregationFn}(o3) as o3,
        ${aggregationFn}(so2) as so2
      `;
      break;
    case 'ambient':
      metricsQuery = `
        ${aggregationFn}(temperature) as temperature,
        ${aggregationFn}(humidity) as humidity,
        ${aggregationFn}(solar_radiation) as solar_radiation
      `;
      break;
    case 'traffic':
      metricsQuery = `
        ${aggregationFn}(vehicle_density) as vehicle_density,
        ${aggregationFn}(avg_speed) as avg_speed,
        ${aggregationFn}(flow_rate) as flow_rate,
        ${aggregationFn}(occupancy) as occupancy,
        ${aggregationFn}(congestion_index) as congestion_index
      `;
      break;
    case 'water_quality':
      metricsQuery = `
        ${aggregationFn}(water_temperature) as water_temperature,
        ${aggregationFn}(ph_level) as ph_level,
        ${aggregationFn}(turbidity) as turbidity,
        ${aggregationFn}(dissolved_oxygen) as dissolved_oxygen,
        ${aggregationFn}(conductivity) as conductivity
      `;
      break;
    case 'water_usage':
      metricsQuery = `
        ${aggregationFn}(usage_liters) as usage_liters
      `;
      break;
  }

  // Ejecución de la consulta cruda
  const rawResult = await prisma.$queryRawUnsafe<Record<string, any>[]>(`
    SELECT ${metricsQuery}
    FROM ${tableName}
    WHERE sensor_id IN (${sensorIds.map(id => `'${id}'`).join(',')})
      AND event_time BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'
  `);

  // Formatear resultado
  const firstResult = rawResult[0] || {};
  const entries     = Object.entries(firstResult)
    .filter(([_, v]) => v !== null)
    .map(([metric, value]) => ({
      metric,
      unit:  UNIT_MAPPING[sensorType][metric] || '',
      value: parseFloat(Number(value).toFixed(2))
    }));

  return NextResponse.json(
    {
      metadata: {
        status: 'success',
        timestamp: new Date().toISOString()
      },
      results: entries
    },
    { status: 200 }
  );
}
