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
    });    // Main query with pagination
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
    
    // Create response object
    const response = {
      data: routes,
      total: totalCount,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      totalPages: Math.ceil(totalCount / limit),
    };
    
    // Get format parameter for downloads
    const format = searchParams.get('format') || 'json';
    
    // Handle different formats
    if (format === 'csv') {
      // Generate CSV string
      let csv = "route_id,route_name,transport_type,origin_city,destination_city,distance_km,travel_minutes,price,efficiency_score,carbon_footprint_kg\n";
      
      routes.forEach(route => {
        // Format fields and escape text with potential commas
        const routeName = route.route_name ? `"${route.route_name.replace(/"/g, '""')}"` : '';
        const transportType = route.transport_type ? `"${route.transport_type.replace(/"/g, '""')}"` : '';
        const originCity = route.cities_transport_routes_origin_city_idTocities?.name ? 
          `"${route.cities_transport_routes_origin_city_idTocities.name.replace(/"/g, '""')}"` : '';
        const destCity = route.cities_transport_routes_destination_city_idTocities?.name ? 
          `"${route.cities_transport_routes_destination_city_idTocities.name.replace(/"/g, '""')}"` : '';
        
        csv += `"${route.route_id}",${routeName},${transportType},${originCity},${destCity},${route.distance_km || ''},${route.travel_minutes || ''},${route.price || ''},${route.efficiency_score || ''},${route.carbon_footprint_kg || ''}\n`;
      });
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=greenlake_transport_routes.csv'
        }
      });
    } else if (format === 'excel') {
      // For Excel, we return a JSON that will be processed by the frontend
      return NextResponse.json(response, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      // Default JSON response
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      // Solo añadimos Content-Disposition para forzar la descarga si el formato es json
      if (format === 'json') {
        headers['Content-Disposition'] = 'attachment; filename=greenlake_transport_routes.json';
      }
      
      return NextResponse.json(response, { headers });
    }
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
