import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET handler to fetch specific city by ID
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const id = params.id;
    
    const city = await prisma.cities.findUnique({
      where: {
        id: id,
      },
      include: {
        states: true,
        // Include infrastructure with subtypes
        infrastructure: {
          include: {
            infrastructure_restaurant: true,
            infrastructure_hotel: true,
            infrastructure_park: true,
            infrastructure_transportation_hub: true,
            // Include other subtypes as needed
          },
          take: 50, // Limit the number to avoid large payloads
        },
        // Include incoming and outgoing transport routes
        transport_routes_transport_routes_destination_city_idTocities: {
          take: 20,
          include: {
            cities_transport_routes_origin_city_idTocities: true,
          },
        },
        transport_routes_transport_routes_origin_city_idTocities: {
          take: 20,
          include: {
            cities_transport_routes_destination_city_idTocities: true,
          },
        },
        // Include summary counts
        _count: {
          select: {
            infrastructure: true,
            people: true,
            transport_routes_transport_routes_destination_city_idTocities: true,
            transport_routes_transport_routes_origin_city_idTocities: true,
          },
        },
      },
    });

    if (!city) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    // Extract some environmental metrics for a dashboard overview
    const environmentalMetrics = {
      name: city.name,
      capital: city.capital,
      hasHarbor: city.has_harbor,
      infrastructureCount: city._count.infrastructure,
    };

    return NextResponse.json({ 
      data: city,
      environmentalMetrics: environmentalMetrics,
    });
  } catch (error) {
    console.error(`Error fetching city with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch city' }, { status: 500 });
  }
}

// PUT handler to update a city
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const id = params.id;
    const body = await req.json();

    // Check if city exists
    const existingCity = await prisma.cities.findUnique({
      where: { id },
    });

    if (!existingCity) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    // Update city
    const updatedCity = await prisma.cities.update({
      where: { id },
      data: {
        name: body.name ?? existingCity.name,
        capital: body.capital ?? existingCity.capital,
        state_id: body.state_id ?? existingCity.state_id,
        has_harbor: body.has_harbor ?? existingCity.has_harbor,
      },
    });
    
    return NextResponse.json({ data: updatedCity });
  } catch (error) {
    console.error(`Error updating city with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to update city' }, { status: 500 });
  }
}

// DELETE handler to remove a city
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const id = params.id;

    // Check if city exists
    const existingCity = await prisma.cities.findUnique({
      where: { id },
    });

    if (!existingCity) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 });
    }

    // Check for dependencies before deletion
    const infrastructureCount = await prisma.infrastructure.count({
      where: { city_id: id },
    });

    if (infrastructureCount > 0) {
      return NextResponse.json({ 
        error: `Cannot delete city with ${infrastructureCount} associated infrastructure records. Delete these records first.` 
      }, { status: 400 });
    }

    // Delete the city
    await prisma.cities.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'City deleted successfully' });
  } catch (error) {
    console.error(`Error deleting city with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to delete city' }, { status: 500 });
  }
}
