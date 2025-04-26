import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET handler to fetch transport routes
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const originCityId = searchParams.get('originCityId');
    const destinationCityId = searchParams.get('destinationCityId');
    const transportType = searchParams.get('transportType');
    const minEfficiencyScore = searchParams.get('minEfficiencyScore') ? parseFloat(searchParams.get('minEfficiencyScore')!) : null;
    const maxCarbonFootprint = searchParams.get('maxCarbonFootprint') ? parseFloat(searchParams.get('maxCarbonFootprint')!) : null;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build filter object
    const filter: any = {};
    
    if (originCityId) {
      filter.origin_city_id = originCityId;
    }
    
    if (destinationCityId) {
      filter.destination_city_id = destinationCityId;
    }
    
    if (transportType) {
      filter.transport_type = transportType;
    }
    
    if (minEfficiencyScore !== null) {
      filter.efficiency_score = {
        gte: minEfficiencyScore,
      };
    }
    
    if (maxCarbonFootprint !== null) {
      filter.carbon_footprint_kg = {
        lte: maxCarbonFootprint,
      };
    }

    // Query to get total count for pagination
    const totalCount = await prisma.transport_routes.count({
      where: filter,
    });

    // Main query with pagination
    const routes = await prisma.transport_routes.findMany({
      where: filter,
      include: {
        cities_transport_routes_origin_city_idTocities: true,
        cities_transport_routes_destination_city_idTocities: true,
        infrastructure_transport_routes_origin_hub_idToinfrastructure: true,
        infrastructure_transport_routes_destination_hub_idToinfrastructure: true,
      },
      skip: offset,
      take: limit,
      orderBy: {
        route_name: 'asc',
      },
    });

    return NextResponse.json({
      data: routes,
      pagination: {
        total: totalCount,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Error fetching transport routes:', error);
    return NextResponse.json({ error: 'Failed to fetch transport routes' }, { status: 500 });
  }
}

// POST handler to create a new transport route
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate required fields
    const requiredFields = [
      'transport_type', 'route_name', 'origin_city_id', 'origin_hub_id', 
      'destination_city_id', 'destination_hub_id', 'distance_km',
      'travel_time', 'travel_minutes', 'frequency', 'departure_times',
      'capacity', 'price', 'utilization_percent', 'efficiency_score', 
      'carbon_footprint_kg'
      // Note: route_id is not in required fields as it can be auto-generated
    ];
    
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      }, { status: 400 });
    }
    // Create the transport route
    const route = await prisma.transport_routes.create({
      data: {
        route_id: body.route_id || undefined, // Add route_id field, allowing it to be auto-generated if not provided
        transport_type: body.transport_type,
        route_name: body.route_name,
        distance_km: body.distance_km,
        travel_time: body.travel_time,
        travel_minutes: body.travel_minutes,
        frequency: body.frequency,
        departure_times: body.departure_times,
        capacity: body.capacity,
        price: body.price,
        utilization_percent: body.utilization_percent,
        efficiency_score: body.efficiency_score,
        carbon_footprint_kg: body.carbon_footprint_kg,
        origin_city_id: body.origin_city_id,
        origin_hub_id: body.origin_hub_id,
        destination_city_id: body.destination_city_id,
        destination_hub_id: body.destination_hub_id,
        cities_transport_routes_origin_city_idTocities: {
          connect: { id: body.origin_city_id }
        },
        cities_transport_routes_destination_city_idTocities: {
          connect: { id: body.destination_city_id }
        },
        infrastructure_transport_routes_origin_hub_idToinfrastructure: {
          connect: { id: body.origin_hub_id }
        },
        infrastructure_transport_routes_destination_hub_idToinfrastructure: {
          connect: { id: body.destination_hub_id }
        },
      },
      include: {
        cities_transport_routes_origin_city_idTocities: true,
        cities_transport_routes_destination_city_idTocities: true,
        infrastructure_transport_routes_origin_hub_idToinfrastructure: true,
        infrastructure_transport_routes_destination_hub_idToinfrastructure: true,
      },
    });

    return NextResponse.json({ data: route }, { status: 201 });
  } catch (error) {
    console.error('Error creating transport route:', error);
    return NextResponse.json({ error: 'Failed to create transport route' }, { status: 500 });
  }
}
