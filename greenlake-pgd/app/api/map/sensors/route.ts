import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface SensorFromDB {
  id: string;
  sensor_type: string;
  location: string | null;
  installed_at: Date | null;
}

export async function GET() {
  try {
    const sensors = await prisma.$queryRaw<SensorFromDB[]>`
      SELECT 
        id,
        sensor_type,
        ST_AsGeoJSON(location) as location,
        installed_at
      FROM sensors
    `;

    // Transform sensors data
    const formattedSensors = sensors.map(sensor => {
      let locationObject;
      try {
        locationObject = sensor.location ? JSON.parse(sensor.location) : null;
      } catch (e) {
        console.error('Error parsing location:', e);
        locationObject = null;
      }

      return {
        id: sensor.id,
        sensor_type: sensor.sensor_type,
        installed_at: sensor.installed_at,
        location: locationObject || {
          type: 'Point',
          coordinates: [
            -70.6483 + (Math.random() - 0.5) * 0.1,
            -33.4489 + (Math.random() - 0.5) * 0.1
          ]
        }
      };
    });

    return NextResponse.json(formattedSensors);
  } catch (error) {
    console.error('Error fetching sensors:', error);
    return NextResponse.json({ 
      error: 'Error fetching sensors',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
