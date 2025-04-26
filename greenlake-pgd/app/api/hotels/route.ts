import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET handler to fetch hotel infrastructures
export async function GET(req: NextRequest) {
  try {
    // Asegurémonos de que nextUrl está disponible
    if (!req.nextUrl) {
      console.error('nextUrl is not available on request object');
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }
    
    const searchParams = req.nextUrl.searchParams;
    const cityId = searchParams.get('cityId');
    const minStarRating = searchParams.get('minStarRating') ? parseInt(searchParams.get('minStarRating')!) : null;
    const hasEnergyEfficientLighting = searchParams.get('energyEfficientLighting') === 'true';
    const hasWaterConservation = searchParams.get('waterConservation') === 'true';
    const hasOrganicLinens = searchParams.get('organicLinens') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    console.log('Parámetros de búsqueda:', { 
      cityId, 
      minStarRating, 
      hasEnergyEfficientLighting, 
      hasWaterConservation, 
      hasOrganicLinens, 
      limit, 
      offset 
    });    // Buscamos infraestructuras que tengan una relación con infrastructure_hotel
    // Este enfoque nos asegura que encontramos todos los hoteles, independientemente del valor de "type"
    const where: any = {
      infrastructure_hotel: {
        // Solo agregamos cada filtro si se especificó
        ...(minStarRating !== null && { star_rating: { gte: minStarRating } }),
        ...(searchParams.has('energyEfficientLighting') && { energy_efficient_lighting: hasEnergyEfficientLighting }),
        ...(searchParams.has('waterConservation') && { water_conservation_systems: hasWaterConservation }),
        ...(searchParams.has('organicLinens') && { organic_linens: hasOrganicLinens })
      }
    };
    
    if (cityId) {
      where.city_id = cityId;
    }
    
    console.log('Filtro final:', JSON.stringify(where, null, 2));

    // Query to get total count for pagination
    const totalCount = await prisma.infrastructure.count({ where });
    
    console.log('Total count con filtros:', totalCount);

    // Main query with pagination and filters
    const hotels = await prisma.infrastructure.findMany({
      where,
      include: {
        cities: true,
        infrastructure_hotel: true,
      },
      skip: offset,
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });
    
    console.log('Hoteles encontrados:', hotels.length);
    
    return NextResponse.json({
      data: hotels,
      total: totalCount,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json({ error: 'Failed to fetch hotels' }, { status: 500 });
  }
}

// POST handler to create a new hotel
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Begin transaction to create both infrastructure and hotel records
    const result = await prisma.$transaction(async (prisma) => {
      // First create the base infrastructure record
      const infrastructure = await prisma.infrastructure.create({
        data: {
          id: body.id, // Include the ID if provided in the request
          type: 'hotel',
          subtype: body.subtype || null,
          name: body.name || null,
          opening_date: body.opening_date ? new Date(body.opening_date) : null,
          green_score: body.green_score || null,
          carbon_footprint_kg_per_year: body.carbon_footprint_kg_per_year || null,
          energy_efficiency_score: body.energy_efficiency_score || null,
          water_efficiency_score: body.water_efficiency_score || null,
          waste_management_score: body.waste_management_score || null,
          renewable_energy_percentage: body.renewable_energy_percentage || null,
          green_certification: body.green_certification || null,
          city_id: body.city_id || null,
        },
      });

      // Then create the hotel-specific details
      const hotel = await prisma.infrastructure_hotel.create({
        data: {
          infra_id: infrastructure.id,
          star_rating: body.star_rating || null,
          room_count: body.room_count || null,
          energy_efficient_lighting: body.energy_efficient_lighting || null,
          water_conservation_systems: body.water_conservation_systems || null,
          organic_linens: body.organic_linens || null,
        },
      });

      // Return both records
      return { infrastructure, hotel };
    });

    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    console.error('Error creating hotel:', error);
    return NextResponse.json({ error: 'Failed to create hotel' }, { status: 500 });
  }
}
