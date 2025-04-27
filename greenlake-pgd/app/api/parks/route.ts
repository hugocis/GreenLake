import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

// GET handler to fetch park infrastructures
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const cityId = searchParams.get('cityId');
    const size = searchParams.get('size');
    const hasNativePlantings = searchParams.get('nativePlantings') === 'true';
    const hasWildlifeHabitat = searchParams.get('wildlifeHabitat') === 'true';
    const hasSustainableIrrigation = searchParams.get('sustainableIrrigation') === 'true';
    const minAreaKm2 = searchParams.get('minAreaKm2') ? parseFloat(searchParams.get('minAreaKm2')!) : null;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');    // Build filter object
    const where: any = {
      infrastructure_park: {}
    };
    
    if (cityId) {
      where.city_id = cityId;
    }

    // Añadir filtros específicos para parques
    if (size) {
      where.infrastructure_park.size = size;
    }
    
    if (searchParams.has('nativePlantings')) {
      where.infrastructure_park.native_plantings = hasNativePlantings;
    }
    
    if (searchParams.has('wildlifeHabitat')) {
      where.infrastructure_park.wildlife_habitat = hasWildlifeHabitat;
    }
    
    if (searchParams.has('sustainableIrrigation')) {
      where.infrastructure_park.sustainable_irrigation = hasSustainableIrrigation;
    }
    
    if (minAreaKm2 !== null) {
      where.infrastructure_park.area_km2 = {
        gte: minAreaKm2,
      };
    }    // Query to get total count for pagination
    const totalCount = await prisma.infrastructure.count({
      where,
    });

    // Main query with pagination and filters
    const parks = await prisma.infrastructure.findMany({
      where,
      include: {
        cities: true,
        infrastructure_park: true,
      },
      skip: offset,
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({
      data: parks,
      pagination: {
        total: totalCount,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Error fetching parks:', error);
    return NextResponse.json({ error: 'Failed to fetch parks' }, { status: 500 });
  }
}

// POST handler to create a new park
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Begin transaction to create both infrastructure and park records
    const result = await prisma.$transaction(async (prisma) => {
      // First create the base infrastructure record
      const infrastructure = await prisma.infrastructure.create({
        data: {
          id: body.id || undefined, // Adding id field to allow custom ID or let Prisma auto-generate it
          type: 'park',
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

      // Then create the park-specific details
      const park = await prisma.infrastructure_park.create({
        data: {
          infra_id: infrastructure.id,
          size: body.size || null,
          area_km2: body.area_km2 || null,
          native_plantings: body.native_plantings || null,
          wildlife_habitat: body.wildlife_habitat || null,
          sustainable_irrigation: body.sustainable_irrigation || null,
        },
      });

      // Return both records
      return { infrastructure, park };
    });

    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    console.error('Error creating park:', error);
    return NextResponse.json({ error: 'Failed to create park' }, { status: 500 });
  }
}
