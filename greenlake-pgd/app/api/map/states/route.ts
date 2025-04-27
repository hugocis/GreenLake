import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface StateFromDB {
  id: string;
  name: string;
  vertices: string | null;
  area_km2: string | null;
  bounding_box: string[] | null;
}

export async function GET() {
  try {
    // Get states with their borders using raw SQL to properly handle the geometry
    const states = await prisma.$queryRaw<StateFromDB[]>`
      SELECT 
        s.id,
        s.name,
        sb.vertices::text as vertices,
        sb.area_km2,
        sb.bounding_box
      FROM states s
      LEFT JOIN state_borders sb ON s.id = sb.state_id
    `;

    console.log('Raw states data:', states[0]); // Debug log

    // Transform states data into GeoJSON format
    const formattedStates = states.map(state => {
      let vertices;
      try {
        // Only try to parse if vertices is a non-empty string
        vertices = state.vertices && typeof state.vertices === 'string' && state.vertices.trim() 
          ? JSON.parse(state.vertices.trim())
          : null;
      } catch (e) {
        console.error(`Error parsing vertices for state ${state.name}:`, e);
        console.error('Invalid vertices value:', state.vertices);
        vertices = null;
      }

      return {
        id: state.id,
        name: state.name,
        geometry: vertices ? {
          type: 'Polygon',
          coordinates: [vertices] // Wrap vertices in array for Polygon type
        } : null,
        properties: state.area_km2 || state.bounding_box ? {
          area_km2: state.area_km2 ? Number(state.area_km2) : null,
          bounding_box: state.bounding_box ? state.bounding_box.map(Number) : null
        } : null
      };
    });

    return NextResponse.json(formattedStates);
  } catch (error) {
    console.error('Error fetching states:', error);
    return NextResponse.json({ 
      error: 'Error fetching states',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
