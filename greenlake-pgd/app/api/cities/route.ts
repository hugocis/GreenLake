import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

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
    
    // These filters need to be adjusted as these fields don't exist in the schema
    // Removing the population and green_score filters as they aren't in the schema

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
    
    // Validate location data if provided
    if (body.location && typeof body.location !== 'object') {
      return NextResponse.json({
      error: "Location must be a valid geometry object"
      }, { status: 400 });
    }
    
    // Check if state_id exists
    if (body.state_id) {
      const state = await prisma.states.findUnique({
      where: { id: body.state_id }
      });
      if (!state) {
      return NextResponse.json({ 
        error: "Invalid state_id provided" 
      }, { status: 400 });
      }
    }
    // Create the city
    const city = await prisma.cities.create({
      data: {
        name: body.name,
        state_id: body.state_id,
        capital: body.capital || null,
        has_harbor: body.has_harbor || null,
      },
    });

    return NextResponse.json({ data: city }, { status: 201 });
  } catch (error) {
    console.error('Error creating city:', error);
    return NextResponse.json({ error: 'Failed to create city' }, { status: 500 });
  }
}
