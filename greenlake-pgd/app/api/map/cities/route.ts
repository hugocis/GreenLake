import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Get cities with their locations
    const cities = await prisma.$queryRaw`
      SELECT 
        c.id,
        c.name,
        ST_AsGeoJSON(c.location::geometry)::json as location
      FROM cities c
      WHERE c.location IS NOT NULL
    `;

    console.log('Raw cities data:', cities[0]); // Log first city for debugging

    const formattedCities = cities.map((city: any) => ({
      id: city.id,
      name: city.name || 'Ciudad sin nombre',
      location: city.location || {
        type: 'Point',
        coordinates: [-70.6483, -33.4489] // Santiago coordinates as default
      }
    }));

    return NextResponse.json(formattedCities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json({ 
      error: 'Error fetching cities',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
