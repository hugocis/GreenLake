import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the unit mapping for different metrics based on sensor type
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

// Helper function to get the appropriate table name based on sensor type
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

// GET handler for aggregated sensor data
export async function GET(
  req: NextRequest,
  { params }: { params: { operation: string } }
) {
  try {
    const operation = params.operation;
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
    const cityId = searchParams.get('city_id');
    const sensorType = searchParams.get('sensor_type');
    const dateStr = searchParams.get('date');

    // Validate required parameters
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

    // Validate sensor type
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

    // Parse and validate the date format
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

    // Create date range for the specified day (from 00:00:00 to 23:59:59)
    const startDate = new Date(`${dateStr}T00:00:00Z`);
    const endDate = new Date(`${dateStr}T23:59:59.999Z`);
    
    // Get sensor IDs for the city and sensor type
    const sensors = await prisma.sensors.findMany({
      where: {
        city_id: cityId,
        sensor_type: sensorType
      },
      select: {
        id: true
      }
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

    const sensorIds = sensors.map(sensor => sensor.id);
    
    // Get the table name based on the sensor type
    const tableName = getSensorMetricTable(sensorType);
    
    // Build the raw SQL query based on the operation
    let aggregationFn: string;
    switch (operation) {
      case 'average':
        aggregationFn = 'AVG';
        break;
      case 'min':
        aggregationFn = 'MIN';
        break;
      case 'max':
        aggregationFn = 'MAX';
        break;
      default:
        aggregationFn = 'AVG'; // Default to average
    }    // Define a different approach based on sensor type
    // We'll create specific SQL based on the metrics for each sensor type
    let metricsQuery = '';
    
    // Build the appropriate metrics columns based on the sensor type
    switch(sensorType) {
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
    
    // Execute the query with the appropriate metrics
    const rawResult = await prisma.$queryRawUnsafe<Record<string, any>[]>(`
      SELECT ${metricsQuery}
      FROM ${tableName}
      WHERE sensor_id IN (${sensorIds.map(id => `'${id}'`).join(',')})
        AND event_time BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'
    `);
    
    // Process the result into the format we need
    const firstResult = rawResult[0];
    const result = Object.entries(firstResult || {})
      .filter(([_, value]) => value !== null)
      .map(([key, value]) => ({
        metric: key,
        value: value
      }));

    // Format the response
    const formattedResult = result.map((item: any) => {
      const metric = item.metric;
      return {
        metric: metric,
        unit: UNIT_MAPPING[sensorType][metric] || '',
        value: parseFloat(parseFloat(item.value).toFixed(2))
      };
    });

    return NextResponse.json(
      {
        metadata: {
          status: 'success',
          timestamp: new Date().toISOString()
        },
        results: formattedResult
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error in sensor ${params.operation} endpoint:`, error);
    return NextResponse.json(
      {
        metadata: {
          status: 'error',
          timestamp: new Date().toISOString(),
          message: 'Internal server error while fetching sensor data'
        }
      },
      { status: 500 }
    );
  }
}
