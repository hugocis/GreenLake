import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET handler to fetch all infrastructure records
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type');
    const cityId = searchParams.get('cityId');
    const name = searchParams.get('name');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');    // Build filter object based on query parameters
    const filter: any = {};
    
    if (type) {
      filter.type = type;
    }
    
    if (cityId) {
      filter.city_id = cityId;
    }
    
    if (name) {
      filter.name = {
        contains: name,
        mode: 'insensitive', // Case-insensitive search
      };
    }
    
    // Add green score filter
    const minGreenScore = searchParams.get('minGreenScore');
    if (minGreenScore && !isNaN(parseInt(minGreenScore))) {
      filter.green_score = {
        gte: parseInt(minGreenScore)
      };
    }

    // Query to get total count for pagination
    const totalCount = await prisma.infrastructure.count({
      where: filter,
    });    // Main query with pagination
    const infrastructures = await prisma.infrastructure.findMany({
      where: filter,
      include: {
        cities: true,
        infrastructure_restaurant: true,
        infrastructure_hotel: true,
        infrastructure_park: true,
        infrastructure_transportation_hub: true,
        infrastructure_venues: true,
      },
      skip: offset,
      take: limit,
    });
    
    // Create response object
    const response = {
      data: infrastructures,
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
      let csv = "id,type,subtype,name,green_score,city_id,city_name,opening_date\n";
      
      infrastructures.forEach(infra => {
        // Format fields and escape text that might contain commas
        const name = infra.name ? `"${infra.name.replace(/"/g, '""')}"` : '';
        const type = infra.type ? `"${infra.type.replace(/"/g, '""')}"` : '';
        const subtype = infra.subtype ? `"${infra.subtype.replace(/"/g, '""')}"` : '';
        const cityName = infra.cities?.name ? `"${infra.cities.name.replace(/"/g, '""')}"` : '';
        const openingDate = infra.opening_date ? new Date(infra.opening_date).toISOString() : '';
        
        csv += `"${infra.id}",${type},${subtype},${name},${infra.green_score || ''},"${infra.city_id || ''}",${cityName},${openingDate}\n`;
      });
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=greenlake_infrastructure.csv'
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
        headers['Content-Disposition'] = 'attachment; filename=greenlake_infrastructure.json';
      }
      
      return NextResponse.json(response, { headers });
    }
  } catch (error) {
    console.error('Error fetching infrastructures:', error);
    return NextResponse.json({ error: 'Failed to fetch infrastructures' }, { status: 500 });
  }
}

// POST handler to create a new infrastructure record
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.type) {
      return NextResponse.json({ error: "Type is required" }, { status: 400 });
    }

    // Create new infrastructure record
    const infrastructure = await prisma.infrastructure.create({
      data: {
        id: body.id || undefined, // Add ID field or let Prisma auto-generate it
        type: body.type,
        subtype: body.subtype,
        name: body.name,
        opening_date: body.opening_date ? new Date(body.opening_date) : null,
        green_score: body.green_score,
        carbon_footprint_kg_per_year: body.carbon_footprint_kg_per_year,
        energy_efficiency_score: body.energy_efficiency_score,
        water_efficiency_score: body.water_efficiency_score,
        waste_management_score: body.waste_management_score,
        renewable_energy_percentage: body.renewable_energy_percentage,
        green_certification: body.green_certification,
        city_id: body.city_id,
      },
      include: {
        cities: true,
      },
    });

    return NextResponse.json({ data: infrastructure }, { status: 201 });
  } catch (error) {
    console.error('Error creating infrastructure:', error);
    return NextResponse.json({ error: 'Failed to create infrastructure' }, { status: 500 });
  }
}
