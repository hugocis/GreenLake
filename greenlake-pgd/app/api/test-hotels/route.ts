import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Ruta de prueba para verificar si existen registros de hoteles
export async function GET() {
  try {
    // Consulta simple para verificar si hay registros de tipo hotel
    const allInfrastructure = await prisma.infrastructure.findMany({
      take: 5,
    });
    
    // Consulta para ver si hay hoteles
    const hotels = await prisma.infrastructure.findMany({
      where: {
        type: 'hotel',
      },
      include: {
        infrastructure_hotel: true,
      },
      take: 5,
    });
    
    // Intenta obtener cualquier registro de infrastructure_hotel
    const hotelRelations = await prisma.infrastructure_hotel.findMany({
      take: 5,
    });

    return NextResponse.json({
      success: true,
      infrastructureCount: allInfrastructure.length,
      infrastructureSample: allInfrastructure,
      hotelsCount: hotels.length,
      hotelsSample: hotels,
      hotelRelationsCount: hotelRelations.length,
      hotelRelationsSample: hotelRelations
    });
  } catch (error) {
    console.error('Error en test-hotels:', error);
    return NextResponse.json({ error: 'Error en la consulta de prueba' }, { status: 500 });
  }
}
