import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

export const dynamic = 'force-dynamic';

interface SensorMetrics {
  id: string;
  sensor_type: string;
  location: any;
  installed_at: Date;
  co2_level?: number | null;
  last_reading?: Date | null;
}

export async function GET() {
  try {
    const query = `
      WITH latest_air_metrics AS (
        SELECT DISTINCT ON (sensor_id)
          sensor_id,
          co2,
          event_time
        FROM sensor_metrics_air
        WHERE event_time >= NOW() - INTERVAL '1 hour'
        ORDER BY sensor_id, event_time DESC
      )
      SELECT 
        s.id,
        s.sensor_type,
        s.installed_at,
        ST_AsGeoJSON(s.location::geometry)::json as location,
        lam.co2 as co2_level,
        lam.event_time as last_reading
      FROM sensors s
      LEFT JOIN latest_air_metrics lam ON s.id = lam.sensor_id
      WHERE s.location IS NOT NULL
    `;

    const sensors: SensorMetrics[] = await prisma.$queryRawUnsafe(query);

    console.log('Raw sensors data:', sensors[0]); // Debug log

    const formattedSensors = sensors.map(sensor => ({
      id: sensor.id,
      sensor_type: sensor.sensor_type.toLowerCase(),
      location: sensor.location,
      installed_at: sensor.installed_at,
      ...(sensor.sensor_type.toLowerCase() === 'air' ? {
        co2_level: sensor.co2_level,
        last_reading: sensor.last_reading
      } : {})
    }));

    return NextResponse.json(formattedSensors);
  } catch (error) {
    console.error('Error fetching sensors:', error);
    return NextResponse.json({ 
      error: 'Error fetching sensors',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

