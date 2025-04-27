import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Check if PostGIS is enabled
    const postgisCheck = await prisma.$queryRaw`SELECT PostGIS_version();`;
    console.log('PostGIS version:', postgisCheck);

    // Get roads with their geometry and city names
    const roads = await prisma.$queryRaw`
      SELECT 
        r.id,
        ST_AsGeoJSON(r.geometry::geometry)::json as geometry,
        r.length_km,
        r.toll,
        o.name as origin_city_name,
        t.name as target_city_name
      FROM roads r
      LEFT JOIN cities o ON r.origin_city_id = o.id
      LEFT JOIN cities t ON r.target_city_id = t.id
    `;
    
    console.log('Raw roads data:', roads[0]); // Log first road for debugging
    
    const formattedRoads = roads.map((road: any) => ({
      id: road.id,
      geometry: road.geometry || {
        type: 'LineString',
        coordinates: []
      },
      length_km: road.length_km,
      toll: road.toll,
      origin_city: {
        name: road.origin_city_name || 'Ciudad Origen'
      },
      target_city: {
        name: road.target_city_name || 'Ciudad Destino'
      }
    }));

    return NextResponse.json(formattedRoads);
  } catch (error) {
    console.error('Error fetching roads:', error);
    return NextResponse.json({ 
      error: 'Error fetching roads',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
