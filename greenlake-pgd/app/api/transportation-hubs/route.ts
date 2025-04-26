import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET handler to fetch transportation hub infrastructures
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const cityId = searchParams.get('cityId');
    const hubType = searchParams.get('hubType');
    const hasChargingStation = searchParams.get('hasChargingStation') === 'true';
    const hasBikeParking = searchParams.get('hasBikeParking') === 'true';
    const isPedestrianFriendly = searchParams.get('isPedestrianFriendly') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build filter object for infrastructure table
    const infrastructureFilter: any = {
      type: 'transportation_hub',
    };
    
    if (cityId) {
      infrastructureFilter.city_id = cityId;
    }

    // Build filter object for transportation_hub table
    const transportationHubFilter: any = {};
    
    if (hubType) {
      transportationHubFilter.hub_type = hubType;
    }
    if (hasChargingStation) {
      transportationHubFilter.electric_vehicle_charging_stations = true;
    }
    if (hasBikeParking) {
      transportationHubFilter.bike_parking_spaces = { gt: 0 };
    }
    if (isPedestrianFriendly) {
      transportationHubFilter.pedestrian_friendly_design = true;
    }

    // Fetch transportation hubs with their infrastructure details
    const [transportationHubs, count] = await Promise.all([
      prisma.infrastructure.findMany({
        where: infrastructureFilter,
        include: {
          infrastructure_transportation_hub: {
            where: transportationHubFilter,
          }
        },
        take: limit,
        skip: offset,
      }),
      prisma.infrastructure.count({
        where: {
          ...infrastructureFilter,
          infrastructure_transportation_hub: {
            some: transportationHubFilter
          }
        },
      }),
    ]);

    return NextResponse.json({
      data: transportationHubs.filter(hub => hub.infrastructure_transportation_hub !== null),
      total: count,
      page: offset / limit + 1,
      pageSize: limit,
      totalPages: Math.ceil(count / limit),
    });

  } catch (error) {
    console.error('Error fetching transportation hubs:', error);
    return NextResponse.json({ error: 'Failed to fetch transportation hubs' }, { status: 500 });
  }
}

// POST handler to create a new transportation hub
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      name, cityId, greenScore, hubType, passengerCapacityPerDay,
      electricVehicleChargingStations, bikeParkingSpaces, pedestrianFriendlyDesign 
    } = body;

    // Create infrastructure entry
    const infrastructure = await prisma.infrastructure.create({
      data: {
        type: 'transportation_hub',
        name: name,
        city_id: cityId,
        green_score: greenScore,
        infrastructure_transportation_hub: {
          create: {
            hub_type: hubType,
            passenger_capacity_per_day: passengerCapacityPerDay,
            electric_vehicle_charging_stations: electricVehicleChargingStations || false,
            bike_parking_spaces: bikeParkingSpaces || 0,
            pedestrian_friendly_design: pedestrianFriendlyDesign || false,
          }
        }
      },
      include: {
        infrastructure_transportation_hub: true,
      }
    });

    return NextResponse.json({
      data: infrastructure,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating transportation hub:', error);
    return NextResponse.json({ error: 'Failed to create transportation hub' }, { status: 500 });
  }
}
