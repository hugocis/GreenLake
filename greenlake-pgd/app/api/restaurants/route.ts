import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

// GET handler to fetch restaurant infrastructures
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const cityId = searchParams.get('cityId');
    const priceCategory = searchParams.get('priceCategory');
    const hasLocalOrganicIngredients = searchParams.get('localOrganicIngredients') === 'true';
    const hasWasteReduction = searchParams.get('wasteReduction') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');    // Build filter object
    const where: any = {
      infrastructure_restaurant: {}
    };
    
    if (cityId) {
      where.city_id = cityId;
    }
    
    // Añadir filtros específicos de restaurante
    if (priceCategory) {
      where.infrastructure_restaurant.price_category = priceCategory;
    }
    
    if (searchParams.has('localOrganicIngredients')) {
      where.infrastructure_restaurant.local_organic_ingredients = hasLocalOrganicIngredients;
    }
    
    if (searchParams.has('wasteReduction')) {
      where.infrastructure_restaurant.waste_reduction_program = hasWasteReduction;
    }

    // Query to get total count for pagination
    const totalCount = await prisma.infrastructure.count({
      where,
    });

    // Main query with pagination and filters
    const restaurants = await prisma.infrastructure.findMany({
      where,
      include: {
        cities: true,
        infrastructure_restaurant: true,
      },
      skip: offset,
      take: limit,
    });

    return NextResponse.json({
      data: restaurants,
      pagination: {
        total: totalCount,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
}

// POST handler to create a new restaurant
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Begin transaction to create both infrastructure and restaurant records
    const result = await prisma.$transaction(async (prisma) => {
      // First create the base infrastructure record
      const infrastructure = await prisma.infrastructure.create({
        data: {
          id: body.id || undefined, // Adding id field to allow custom ID or let Prisma auto-generate it
          type: 'restaurant',
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

      // Then create the restaurant-specific details
      const restaurant = await prisma.infrastructure_restaurant.create({
        data: {
          infra_id: infrastructure.id,
          price_category: body.price_category || null,
          seating_capacity: body.seating_capacity || null,
          local_organic_ingredients: body.local_organic_ingredients || null,
          energy_efficient_kitchen_equipment: body.energy_efficient_kitchen_equipment || null,
          waste_reduction_program: body.waste_reduction_program || null,
        },
      });

      // Return both records
      return { infrastructure, restaurant };
    });

    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    return NextResponse.json({ error: 'Failed to create restaurant' }, { status: 500 });
  }
}
