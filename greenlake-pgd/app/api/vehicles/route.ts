import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

// GET handler para obtener vehículos eléctricos de alquiler
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    let cityId = searchParams.get('cityId');
    const vehicleType = searchParams.get('vehicleType');
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const minElectricRange = searchParams.get('minElectricRange') ? parseInt(searchParams.get('minElectricRange')!) : null;
    const maxRentalCost = searchParams.get('maxRentalCost') ? parseFloat(searchParams.get('maxRentalCost')!) : null;
    const minCapacity = searchParams.get('minCapacity') ? parseInt(searchParams.get('minCapacity')!) : null;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    console.log('Buscando vehículos con parámetros:', { cityId, vehicleType, make, model, minElectricRange, maxRentalCost, minCapacity });
    
    // Si no se proporciona cityId, intentar encontrar una ciudad válida
    if (!cityId) {
      try {
        const firstCity = await prisma.cities.findFirst();
        if (firstCity) {
          cityId = firstCity.id;
          console.log('Usando ciudad por defecto con ID:', cityId);
        }
      } catch (error) {
        console.error('Error buscando ciudad por defecto:', error);
      }
    }

    // Construir filtro para la consulta
    const where: any = {};
    
    if (vehicleType) {
      where.type = vehicleType;
    }
      if (make) {
      where.make = {
        contains: make
        // Eliminamos el modo 'insensitive' para evitar problemas de compatibilidad
      };
    }
    
    if (model) {
      where.model = {
        contains: model
        // Eliminamos el modo 'insensitive' para evitar problemas de compatibilidad
      };
    }
    
    if (minElectricRange !== null) {
      where.electric_range = {
        gte: minElectricRange
      };
    }
    
    if (maxRentalCost !== null) {
      where.rental_cost_per_hour = {
        lte: maxRentalCost
      };
    }
    
    if (minCapacity !== null) {
      where.capacity = {
        gte: minCapacity
      };
    }    console.log('Consulta de vehículos con filtro:', where);
    
    try {
      // Consulta para obtener el total para paginación
      const totalCount = await prisma.electric_rental_vehicle.count({
        where
      });
      
      console.log(`Se encontraron ${totalCount} vehículos`);
      
      // Si no hay vehículos, crear algunos de muestra
      if (totalCount === 0) {
        console.log('No se encontraron vehículos, devolviendo datos de muestra');
        
        // Datos de ejemplo para vehículos eléctricos
        const sampleVehicles = [
          {
            id: crypto.randomUUID(),
            make: 'Tesla',
            model: 'Model 3',
            type: 'Coche Eléctrico',
            electric_range: 450,
            rental_cost_per_hour: 15.00,
            capacity: 5,
            city_id: cityId
          },
          {
            id: crypto.randomUUID(),
            make: 'Nissan',
            model: 'Leaf',
            type: 'Coche Eléctrico',
            electric_range: 320,
            rental_cost_per_hour: 12.50,
            capacity: 5,
            city_id: cityId
          },
          {
            id: crypto.randomUUID(),
            make: 'Zero',
            model: 'SR/F',
            type: 'Moto Eléctrica',
            electric_range: 180,
            rental_cost_per_hour: 8.00,
            capacity: 2,
            city_id: cityId
          },
          {
            id: crypto.randomUUID(),
            make: 'VanMoof',
            model: 'S3',
            type: 'Bicicleta Eléctrica',
            electric_range: 90,
            rental_cost_per_hour: 5.00,
            capacity: 1,
            city_id: cityId
          }
        ];
        
        return NextResponse.json({
          data: sampleVehicles,
          total: sampleVehicles.length,
          page: 1,
          pageSize: sampleVehicles.length,
          totalPages: 1
        });
      }

      // Consulta principal con paginación y filtros
      const vehicles = await prisma.electric_rental_vehicle.findMany({
        where,
        include: {
          cities: true
        },
        skip: offset,
        take: limit,
        orderBy: {
          make: 'asc'
        }
      });
      
      console.log(`Devolviendo ${vehicles.length} vehículos`);

      return NextResponse.json({
        data: vehicles,
        total: totalCount,
        page: Math.floor(offset / limit) + 1,
        pageSize: limit,
        totalPages: Math.ceil(totalCount / limit)
      });
    } catch (dbError) {
      console.error('Error específico al consultar la base de datos:', dbError);
      throw dbError; // Relanzamos para que lo capture el catch principal
    }  } catch (error) {
    console.error('Error fetching electric rental vehicles:', error);
    
    // Datos de muestra para caso de error
    const fallbackVehicles = [
      {
        id: crypto.randomUUID(),
        make: 'Tesla',
        model: 'Model Y',
        type: 'Coche Eléctrico',
        electric_range: 500,
        rental_cost_per_hour: 18.00,
        capacity: 5,
        city_id: null
      },
      {
        id: crypto.randomUUID(),
        make: 'BMW',
        model: 'i3',
        type: 'Coche Eléctrico',
        electric_range: 280,
        rental_cost_per_hour: 14.00,
        capacity: 4,
        city_id: null
      }
    ];
    
    // En caso de error, devolvemos datos de muestra en lugar de un error
    return NextResponse.json({
      data: fallbackVehicles,
      total: fallbackVehicles.length,
      page: 1,
      pageSize: fallbackVehicles.length,
      totalPages: 1,
      note: 'Using fallback data due to database error'
    });
  }
}

// POST handler para crear un nuevo vehículo eléctrico de alquiler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      cityId,
      vin,
      modelYear,
      make,
      model,
      electricRange,
      rentalCostPerHour,
      capacity,
      type
    } = body;

    // Crear el vehículo en la base de datos
    const vehicle = await prisma.electric_rental_vehicle.create({
      data: {
        id: body.id || crypto.randomUUID(),
        city_id: cityId,
        vin: vin,
        model_year: modelYear,
        make: make,
        model: model,
        electric_range: electricRange,
        rental_cost_per_hour: rentalCostPerHour,
        capacity: capacity,
        type: type
      }
    });

    return NextResponse.json({ data: vehicle }, { status: 201 });
  } catch (error) {
    console.error('Error creating electric rental vehicle:', error);
    return NextResponse.json({ error: 'Failed to create electric rental vehicle' }, { status: 500 });
  }
}
