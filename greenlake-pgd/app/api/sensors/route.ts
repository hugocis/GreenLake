import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
      filter.sensor_type = sensorType;
    }
    
    if (cityId) {
      filter.city_id = cityId;
    }
    
    if (stateId) {
      filter.state_id = stateId;
    }
    
    if (roadId) {
      filter.road_id = roadId;
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
    };

    // Handle different formats
    if (format === 'csv') {
      // Generate CSV string
      let csv = "id,sensor_type,installed_at,city_id,state_id,road_id,km_point,industrial_zone\n";
      
      sensors.forEach(sensor => {
        csv += `${sensor.id},${sensor.sensor_type},${sensor.installed_at},${sensor.city_id},${sensor.state_id},${sensor.road_id},${sensor.km_point},${sensor.industrial_zone}\n`;
      });
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=sensors.csv'
        }
      });
    } else if (format === 'excel') {
      // For Excel, we return a JSON that will be processed by the frontend
      // The actual Excel conversion will happen in the browser using a library
      return NextResponse.json(response);
    } else {
      // Default JSON response
      return NextResponse.json(response);
    }
  } catch (error: any) {
    console.error('Error fetching sensors:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
