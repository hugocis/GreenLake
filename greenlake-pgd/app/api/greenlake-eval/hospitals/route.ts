import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

/**
 * GET handler for fetching hospital infrastructures
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const cityId = searchParams.get('cityId');
    const name = searchParams.get('name');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build filter object based on query parameters
    const filter: any = {
      type: 'hospital',
      infrastructure_hospital: {
        // Hospital-specific filters can be added here
      }
    };
    
    if (cityId) {
      filter.city_id = cityId;
    }
    
    if (name) {
      filter.name = {
        contains: name,
        mode: 'insensitive', // Case-insensitive search
      };
    }

    // Query to get total count for pagination
    const totalCount = await prisma.infrastructure.count({
      where: filter,
    });

    // Main query with pagination
    const hospitals = await prisma.infrastructure.findMany({
      where: filter,
      include: {
        cities: true,
        infrastructure_hospital: true,
      },
      skip: offset,
      take: limit,
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({
      metadata: {
        status: 'success',
        timestamp: new Date().toISOString(),
        total: totalCount,
        limit,
        offset
      },
      results: hospitals
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    return NextResponse.json({
      metadata: {
        status: 'error',
        timestamp: new Date().toISOString(),
        message: 'Internal server error while fetching hospitals'
      }
    }, { status: 500 });
  }
}
