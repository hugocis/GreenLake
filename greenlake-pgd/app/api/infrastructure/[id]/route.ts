import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET handler to fetch specific infrastructure by ID
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const id = params.id;
    
    const infrastructure = await prisma.infrastructure.findUnique({
      where: {
        id: id,
      },
      include: {
        cities: true,
        infrastructure_restaurant: true,
        infrastructure_hotel: true,
        infrastructure_park: true,
        infrastructure_transportation_hub: true,
        infrastructure_venues: true,
        // Add other subtypes as needed
      },
    });

    if (!infrastructure) {
      return NextResponse.json({ error: 'Infrastructure not found' }, { status: 404 });
    }

    return NextResponse.json({ data: infrastructure });
  } catch (error) {
    console.error(`Error fetching infrastructure with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch infrastructure' }, { status: 500 });
  }
}

// PUT handler to update an infrastructure record
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const id = params.id;
    const body = await req.json();

    // Check if infrastructure exists
    const existingInfrastructure = await prisma.infrastructure.findUnique({
      where: { id },
    });

    if (!existingInfrastructure) {
      return NextResponse.json({ error: 'Infrastructure not found' }, { status: 404 });
    }

    // Update infrastructure
    const updatedInfrastructure = await prisma.infrastructure.update({
      where: { id },
      data: {
        type: body.type ?? existingInfrastructure.type,
        subtype: body.subtype ?? existingInfrastructure.subtype,
        name: body.name ?? existingInfrastructure.name,
        opening_date: body.opening_date ? new Date(body.opening_date) : existingInfrastructure.opening_date,
        green_score: body.green_score ?? existingInfrastructure.green_score,
        carbon_footprint_kg_per_year: body.carbon_footprint_kg_per_year ?? existingInfrastructure.carbon_footprint_kg_per_year,
        energy_efficiency_score: body.energy_efficiency_score ?? existingInfrastructure.energy_efficiency_score,
        water_efficiency_score: body.water_efficiency_score ?? existingInfrastructure.water_efficiency_score,
        waste_management_score: body.waste_management_score ?? existingInfrastructure.waste_management_score,
        renewable_energy_percentage: body.renewable_energy_percentage ?? existingInfrastructure.renewable_energy_percentage,
        green_certification: body.green_certification ?? existingInfrastructure.green_certification,
        city_id: body.city_id ?? existingInfrastructure.city_id,
        // Location updates should be handled more carefully depending on your geometry format
      },
    });

    return NextResponse.json({ data: updatedInfrastructure });
  } catch (error) {
    console.error(`Error updating infrastructure with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to update infrastructure' }, { status: 500 });
  }
}

// DELETE handler to remove an infrastructure
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const id = params.id;

    // Check if infrastructure exists
    const existingInfrastructure = await prisma.infrastructure.findUnique({
      where: { id },
    });

    if (!existingInfrastructure) {
      return NextResponse.json({ error: 'Infrastructure not found' }, { status: 404 });
    }

    // Delete the infrastructure
    await prisma.infrastructure.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Infrastructure deleted successfully' });
  } catch (error) {
    console.error(`Error deleting infrastructure with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to delete infrastructure' }, { status: 500 });
  }
}
