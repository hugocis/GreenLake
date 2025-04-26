import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET handler to fetch specific transport route by ID
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const id = params.id;
    
    const route = await prisma.transport_routes.findUnique({
      where: {
        route_id: id,
      },
      include: {
        cities_transport_routes_origin_city_idTocities: true,
        cities_transport_routes_destination_city_idTocities: true,
        infrastructure_transport_routes_origin_hub_idToinfrastructure: true,
        infrastructure_transport_routes_destination_hub_idToinfrastructure: true,
        tourism_trips: {
          include: {
            people: true
          },
          take: 10, // Limit the number of related trips to avoid large payloads
        },
      },
    });

    if (!route) {
      return NextResponse.json({ error: 'Transport route not found' }, { status: 404 });
    }

    return NextResponse.json({ data: route });
  } catch (error) {
    console.error(`Error fetching transport route with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch transport route' }, { status: 500 });
  }
}

// PUT handler to update a transport route
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const id = params.id;
    const body = await req.json();

    // Check if route exists
    const existingRoute = await prisma.transport_routes.findUnique({
      where: { route_id: id },
    });

    if (!existingRoute) {
      return NextResponse.json({ error: 'Transport route not found' }, { status: 404 });
    }

    // Update transport route
    const updatedRoute = await prisma.transport_routes.update({
      where: { route_id: id },
      data: {
        transport_type: body.transport_type ?? existingRoute.transport_type,
        route_name: body.route_name ?? existingRoute.route_name,
        origin_city_id: body.origin_city_id ?? existingRoute.origin_city_id,
        origin_hub_id: body.origin_hub_id ?? existingRoute.origin_hub_id,
        destination_city_id: body.destination_city_id ?? existingRoute.destination_city_id,
        destination_hub_id: body.destination_hub_id ?? existingRoute.destination_hub_id,
        distance_km: body.distance_km ?? existingRoute.distance_km,
        travel_time: body.travel_time ?? existingRoute.travel_time,
        travel_minutes: body.travel_minutes ?? existingRoute.travel_minutes,
        frequency: body.frequency ?? existingRoute.frequency,
        departure_times: body.departure_times ?? existingRoute.departure_times,
        capacity: body.capacity ?? existingRoute.capacity,
        price: body.price ?? existingRoute.price,
        utilization_percent: body.utilization_percent ?? existingRoute.utilization_percent,
        efficiency_score: body.efficiency_score ?? existingRoute.efficiency_score,
        carbon_footprint_kg: body.carbon_footprint_kg ?? existingRoute.carbon_footprint_kg,
      },
      include: {
        cities_transport_routes_origin_city_idTocities: true,
        cities_transport_routes_destination_city_idTocities: true,
      },
    });

    return NextResponse.json({ data: updatedRoute });
  } catch (error) {
    console.error(`Error updating transport route with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to update transport route' }, { status: 500 });
  }
}

// DELETE handler to remove a transport route
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const id = params.id;

    // Check if route exists
    const existingRoute = await prisma.transport_routes.findUnique({
      where: { route_id: id },
    });

    if (!existingRoute) {
      return NextResponse.json({ error: 'Transport route not found' }, { status: 404 });
    }

    // Delete the transport route
    await prisma.transport_routes.delete({
      where: { route_id: id },
    });

    return NextResponse.json({ message: 'Transport route deleted successfully' });
  } catch (error) {
    console.error(`Error deleting transport route with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to delete transport route' }, { status: 500 });
  }
}
