import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET handler to fetch cities
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');
    const stateId = searchParams.get('stateId');
    const minPopulation = searchParams.get('minPopulation') ? parseInt(searchParams.get('minPopulation')!) : null;
    const minGreenScore = searchParams.get('minGreenScore') ? parseInt(searchParams.get('minGreenScore')!) : null;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build filter object
    const filter: any = {};
    
    if (name) {
      filter.name = {
        contains: name,
        mode: 'insensitive', // Case-insensitive search
      };
    }
    
    if (stateId) {
      filter.state_id = stateId;
    }
    
    if (minPopulation !== null) {
      filter.population = {
        gte: minPopulation,
      };
    }
    
    if (minGreenScore !== null) {
      filter.green_score = {
        gte: minGreenScore,
      };
    }

    // Query to get total count for pagination
    const totalCount = await prisma.cities.count({
      where: filter,
    });

    // Main query with pagination
    const cities = await prisma.cities.findMany({
      where: filter,
      include: {
        states: true,
        // Include summary counts of related infrastructure
        _count: {
          select: {
            infrastructure: true,
          },
        },
      },
      skip: offset,
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({
      data: cities,
      pagination: {
        total: totalCount,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
  }
}

// POST handler to create a new city
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.name || !body.state_id) {
      return NextResponse.json({ 
        error: "Name and state_id are required fields" 
      }, { status: 400 });
    }
    
    // Create the city
    const city = await prisma.cities.create({
      data: {
        name: body.name,
        state_id: body.state_id,
        population: body.population || null,
        green_score: body.green_score || null,
        renewable_energy_percentage: body.renewable_energy_percentage || null,
        public_transport_satisfaction: body.public_transport_satisfaction || null,
        cycling_friendliness: body.cycling_friendliness || null,
        waste_recycling_percentage: body.waste_recycling_percentage || null,
        air_quality_score: body.air_quality_score || null,
        water_quality_score: body.water_quality_score || null,
        green_area_per_capita: body.green_area_per_capita || null,
      },
      include: {
        states: true,
      },
    });

    return NextResponse.json({ data: city }, { status: 201 });
  } catch (error) {
    console.error('Error creating city:', error);
    return NextResponse.json({ error: 'Failed to create city' }, { status: 500 });
  }
}
