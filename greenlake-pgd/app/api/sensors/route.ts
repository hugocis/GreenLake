import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

// GET handler to fetch sensor data
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const sensorType = searchParams.get('sensorType');
    const cityId = searchParams.get('cityId');
    const stateId = searchParams.get('stateId');
    const roadId = searchParams.get('roadId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const format = searchParams.get('format') || 'json';

    // Build filter object based on query parameters
    const filter: any = {};
      if (sensorType) {
      filter.sensor_type = {
        equals: sensorType,
        mode: 'insensitive', // Búsqueda case-insensitive
      };
      console.log(`Aplicando filtro por tipo de sensor: ${sensorType}`);
    }
    
    if (cityId) {
      filter.city_id = cityId;
      console.log(`Aplicando filtro por ciudad: ${cityId}`);
    }
    
    if (stateId) {
      filter.state_id = stateId;
    }
      if (roadId) {
      filter.road_id = roadId;
    }
    
    // Add industrial zone filter
    const industrialZone = searchParams.get('industrialZone');
    if (industrialZone === 'true' || industrialZone === 'false') {
      filter.industrial_zone = industrialZone === 'true';
    }

    // Query to get total count for pagination
    const totalCount = await prisma.sensors.count({
      where: filter,
    });

    // Main query with pagination
    const sensors = await prisma.sensors.findMany({
      where: filter,
      include: {
        cities: true,
        roads: true,
        states: true,
      },
      skip: offset,
      take: limit,
    });

    // Create response object
    const response = {
      data: sensors,
      total: totalCount,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      totalPages: Math.ceil(totalCount / limit),
    };    // Handle different formats
    if (format === 'csv') {
      // Generate CSV string with better format and escaping
      let csv = "id,sensor_type,installed_at,city_id,city_name,state_id,road_id,km_point,industrial_zone\n";
      
      sensors.forEach(sensor => {
        // Format date properly and escape fields with commas
        const installedAt = sensor.installed_at ? new Date(sensor.installed_at).toISOString() : '';
        const cityName = sensor.cities?.name ? `"${sensor.cities.name.replace(/"/g, '""')}"` : '';
        
        csv += `"${sensor.id}",${sensor.sensor_type},${installedAt},"${sensor.city_id || ''}",${cityName},"${sensor.state_id || ''}","${sensor.road_id || ''}",${sensor.km_point || ''},${sensor.industrial_zone || false}\n`;
      });
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=greenlake_sensors.csv'
        }
      });
    } else if (format === 'excel') {
      // For Excel, we return a JSON that will be processed by the frontend
      return NextResponse.json(response, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } else {      // Default JSON response
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      // Solo añadimos Content-Disposition para forzar la descarga si el formato es json
      if (format === 'json') {
        headers['Content-Disposition'] = 'attachment; filename=greenlake_sensors.json';
      }
      
      return NextResponse.json(response, { headers });
    }
  } catch (error: any) {
    console.error('Error fetching sensors:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
