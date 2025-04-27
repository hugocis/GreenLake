import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

export const dynamic = 'force-dynamic';

interface RoadFromDB {
  id: string;
  geometry: any;
  length_km: number | null;
  origin_city_name: string | null;
  target_city_name: string | null;
  toll: number | null;
  traffic_congestion: number | null;
}

export async function GET() {
  try {
    // Get roads with their geometry, city names, and latest traffic sensor data
    const roads = await prisma.$queryRaw<RoadFromDB[]>`
      WITH latest_traffic_metrics AS (
        SELECT 
          s.road_id,
          stm.congestion_index
        FROM sensors s
        JOIN sensor_metrics_traffic stm ON s.id = stm.sensor_id
        WHERE s.sensor_type = 'traffic'
        AND stm.event_time >= NOW() - INTERVAL '1 hour'
        AND stm.congestion_index IS NOT NULL
      )
      SELECT 
        r.id,
        ST_AsGeoJSON(r.geometry::geometry)::json as geometry,
        r.length_km,
        r.toll,
        o.name as origin_city_name,
        t.name as target_city_name,
        ltm.congestion_index as traffic_congestion
      FROM roads r
      LEFT JOIN cities o ON r.origin_city_id = o.id
      LEFT JOIN cities t ON r.target_city_id = t.id
      LEFT JOIN latest_traffic_metrics ltm ON r.id = ltm.road_id
      WHERE r.geometry IS NOT NULL
    `;
    
    console.log('Raw roads data:', roads[0]); // Log first road for debugging
    
    const formattedRoads = roads.map((road) => ({
      id: road.id,
      geometry: road.geometry || {
        type: 'LineString',
        coordinates: []
      },
      length_km: road.length_km,
      toll: road.toll,
      traffic_congestion: road.traffic_congestion,
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
