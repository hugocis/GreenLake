import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

import { Prisma } from '@prisma/client';

/**
 * GET handler for hospital nearby endpoint
 * Finds hospitals within a specified radius of a given location
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    
    // Required parameters
    const latStr = searchParams.get('lat');
    const lonStr = searchParams.get('lon');
    
    // Optional parameter with default value
    const radiusStr = searchParams.get('radius');
    const radius = radiusStr ? parseInt(radiusStr, 10) : 1000; // Default radius: 1000m
    
    // Validate required parameters
    if (!latStr || !lonStr) {
      return NextResponse.json({
        metadata: {
          status: 'error',
          timestamp: new Date().toISOString(),
          message: 'Missing required parameters: lat and lon are required'
        }
      }, { status: 400 });
    }
    
    // Parse latitude and longitude
    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);
    
    // Validate latitude and longitude
    if (isNaN(lat) || isNaN(lon)) {
      return NextResponse.json({
        metadata: {
          status: 'error',
          timestamp: new Date().toISOString(),
          message: 'Invalid latitude or longitude format'
        }
      }, { status: 400 });
    }
    
    // Convert meters to degrees (approximate for small distances)
    // 1 degree of latitude is approximately 111km
    const radiusInDegrees = radius / 111000;
    
    // Find hospitals within the radius
    // Using Prisma's raw query capabilities to perform a geospatial query
    const hospitals = await prisma.$queryRaw`
      SELECT 
        i.id,
        i.city_id,
        i.name,
        ST_X(i.location::geometry) as longitude,
        ST_Y(i.location::geometry) as latitude,
        ST_Distance(
          i.location::geography,
          ST_SetSRID(ST_MakePoint(${lon}, ${lat}), 4326)::geography
        ) as distance_m
      FROM 
        infrastructure i
      INNER JOIN
        infrastructure_hospital h ON i.id = h.infra_id
      WHERE 
        i.type = 'hospital'
        AND ST_DWithin(
          i.location::geography,
          ST_SetSRID(ST_MakePoint(${lon}, ${lat}), 4326)::geography,
          ${radius}
        )
      ORDER BY 
        distance_m ASC
    `;
    
    return NextResponse.json({
      metadata: {
        status: 'success',
        timestamp: new Date().toISOString()
      },
      results: hospitals
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching nearby hospitals:', error);
    return NextResponse.json({
      metadata: {
        status: 'error',
        timestamp: new Date().toISOString(),
        message: 'Internal server error while fetching nearby hospitals'
      }
    }, { status: 500 });
  }
}
