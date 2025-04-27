import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

// GET handler to fetch all infrastructure records
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type');
    const cityId = searchParams.get('cityId');
    const name = searchParams.get('name');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Build filter object based on query parameters
    const filter: any = {};
    
    if (type) {
      // Asegurar que el tipo sea case-insensitive
      filter.type = {
        equals: type,
        mode: 'insensitive', // Búsqueda insensible a mayúsculas/minúsculas
      };
      console.log(`Aplicando filtro por tipo: ${type}`);
    }
    
    if (cityId) {
      filter.city_id = cityId;
      console.log(`Aplicando filtro por ciudad: ${cityId}`);
    }
    
    if (name) {
      filter.name = {
        contains: name,
        mode: 'insensitive', // Case-insensitive search
      };
      console.log(`Aplicando filtro por nombre: ${name}`);
    }
    
    // Add green score filter
    const minGreenScore = searchParams.get('minGreenScore');
    if (minGreenScore && !isNaN(parseInt(minGreenScore))) {
      filter.green_score = {
        gte: parseInt(minGreenScore)
      };
      console.log(`Aplicando filtro por puntuación verde mínima: ${minGreenScore}`);
    }

    console.log('Filtros aplicados:', filter);

    // Query to get total count for pagination
    const totalCount = await prisma.infrastructure.count({
      where: filter,
    });
    
    // Main query with pagination
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
    
    console.log(`Se encontraron ${infrastructures.length} de ${totalCount} resultados`);
    
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
      
      // Add download filename if client is downloading
      if (searchParams.get('download') === 'true') {
        headers['Content-Disposition'] = 'attachment; filename=greenlake_infrastructure.json';
      }
      
      return NextResponse.json(response, { 
        headers: headers
      });
    }
  } catch (error) {
    console.error('Error fetching infrastructure data:', error);
    return NextResponse.json(
      { error: 'Error fetching infrastructure data' },
      { status: 500 }
    );
  }
}
