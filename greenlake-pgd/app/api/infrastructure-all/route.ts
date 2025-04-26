import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET handler para cada tipo de infraestructura
export async function GET(req: NextRequest) {
  try {
    // Para asegurarnos que nextUrl está disponible
    if (!req.nextUrl) {
      console.error('nextUrl no está disponible en el objeto request');
      return NextResponse.json({ error: 'Formato de solicitud inválido' }, { status: 400 });
    }
    
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type') || 'all';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let query: any = {};
    let results;
    let total;
    
    switch (type) {
      case 'hotel':
        // Filtro para hoteles
        query = { type: 'hotel' };
        [results, total] = await Promise.all([
          prisma.infrastructure.findMany({
            where: query,
            include: {
              infrastructure_hotel: true,
              cities: true,
            },
            take: limit,
            skip: offset,
          }),
          prisma.infrastructure.count({ where: query }),
        ]);
        break;
        
      case 'restaurant':
        // Filtro para restaurantes
        query = { type: 'restaurant' };
        [results, total] = await Promise.all([
          prisma.infrastructure.findMany({
            where: query,
            include: {
              infrastructure_restaurant: true,
              cities: true,
            },
            take: limit,
            skip: offset,
          }),
          prisma.infrastructure.count({ where: query }),
        ]);
        break;
        
      case 'park':
        // Filtro para parques
        query = { type: 'park' };
        [results, total] = await Promise.all([
          prisma.infrastructure.findMany({
            where: query,
            include: {
              infrastructure_park: true,
              cities: true,
            },
            take: limit,
            skip: offset,
          }),
          prisma.infrastructure.count({ where: query }),
        ]);
        break;
        
      case 'transportation_hub':
        // Filtro para centros de transporte
        query = { type: 'transportation_hub' };
        [results, total] = await Promise.all([
          prisma.infrastructure.findMany({
            where: query,
            include: {
              infrastructure_transportation_hub: true,
              cities: true,
            },
            take: limit,
            skip: offset,
          }),
          prisma.infrastructure.count({ where: query }),
        ]);
        break;
        
      case 'all':
      default:
        // Todas las infraestructuras
        [results, total] = await Promise.all([
          prisma.infrastructure.findMany({
            include: {
              infrastructure_hotel: true,
              infrastructure_restaurant: true,
              infrastructure_park: true,
              infrastructure_transportation_hub: true,
              cities: true,
            },
            take: limit,
            skip: offset,
          }),
          prisma.infrastructure.count(),
        ]);
        break;
    }
    
    return NextResponse.json({
      data: results,
      total,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(`Error al obtener infraestructuras de tipo ${req.nextUrl?.searchParams.get('type') || 'all'}:`, error);
    return NextResponse.json({ error: 'Error al obtener los datos de infraestructura' }, { status: 500 });
  }
}
