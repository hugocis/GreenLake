import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

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
    const offset = parseInt(searchParams.get('offset') || '0');    // Build filter object
    const where: any = {
      infrastructure_transportation_hub: {}
    };
    
    if (cityId) {
      where.city_id = cityId;
    }

    // Add specific filters for transportation hub
    if (hubType) {
      where.infrastructure_transportation_hub.hub_type = hubType;
    }
    if (hasChargingStation) {
      where.infrastructure_transportation_hub.electric_vehicle_charging = true;
    }
    if (hasBikeParking) {
      where.infrastructure_transportation_hub.bike_sharing_station = true;
    }
    if (isPedestrianFriendly) {
      where.infrastructure_transportation_hub.public_transportation_access = true;
    }

    // Fetch transportation hubs with their infrastructure details
    const [transportationHubs, count] = await Promise.all([
      prisma.infrastructure.findMany({
        where,
        include: {
          infrastructure_transportation_hub: true
        },
        take: limit,
        skip: offset,
      }),      prisma.infrastructure.count({
        where,
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
  try {    const body = await req.json();
    const { 
      name, cityId, greenScore, 
      electricVehicleCharging, publicTransportationAccess, bikeSharingStation 
    } = body;    // Create infrastructure entry
    const infrastructure = await prisma.infrastructure.create({
      data: {
        id: body.id || crypto.randomUUID(), // Asegurarse de que haya un ID
        type: 'transportation_hub',
        name: name,
        city_id: cityId,
        green_score: greenScore,
        infrastructure_transportation_hub: {
          create: {
            electric_vehicle_charging: electricVehicleCharging || false,
            public_transportation_access: publicTransportationAccess || false,
            bike_sharing_station: bikeSharingStation || false,
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
