import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET handler to fetch specific infrastructure by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const infrastructure = await prisma.infrastructure.findUnique({
      where: { id },
      include: {
        cities: true,
        infrastructure_restaurant: true,
        infrastructure_hotel: true,
        infrastructure_park: true,
        infrastructure_transportation_hub: true,
        infrastructure_venues: true,
        // Add other subtypes as needed
      },
    })

    if (!infrastructure) {
      return NextResponse.json({ error: 'Infrastructure not found' }, { status: 404 })
    }

    return NextResponse.json({ data: infrastructure })
  } catch (error) {
    console.error(`Error fetching infrastructure with ID ${id}:`, error)
    return NextResponse.json({ error: 'Failed to fetch infrastructure' }, { status: 500 })
  }
}

// PUT handler to update an infrastructure record
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const body = await req.json()

    const existing = await prisma.infrastructure.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Infrastructure not found' }, { status: 404 })
    }

    const updated = await prisma.infrastructure.update({
      where: { id },
      data: {
        type:                       body.type                       ?? existing.type,
        subtype:                    body.subtype                    ?? existing.subtype,
        name:                       body.name                       ?? existing.name,
        opening_date:               body.opening_date
                                     ? new Date(body.opening_date)
                                     : existing.opening_date,
        green_score:                body.green_score                ?? existing.green_score,
        carbon_footprint_kg_per_year:
                                     body.carbon_footprint_kg_per_year
                                     ?? existing.carbon_footprint_kg_per_year,
        energy_efficiency_score:    body.energy_efficiency_score    ?? existing.energy_efficiency_score,
        water_efficiency_score:     body.water_efficiency_score     ?? existing.water_efficiency_score,
        waste_management_score:     body.waste_management_score     ?? existing.waste_management_score,
        renewable_energy_percentage:
                                     body.renewable_energy_percentage
                                     ?? existing.renewable_energy_percentage,
        green_certification:        body.green_certification        ?? existing.green_certification,
        city_id:                    body.city_id                    ?? existing.city_id,
        // If you store geo-data (e.g. PostGIS), handle location updates here
      },
    })

    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error(`Error updating infrastructure with ID ${id}:`, error)
    return NextResponse.json({ error: 'Failed to update infrastructure' }, { status: 500 })
  }
}

// DELETE handler to remove an infrastructure
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const existing = await prisma.infrastructure.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Infrastructure not found' }, { status: 404 })
    }

    await prisma.infrastructure.delete({ where: { id } })
    return NextResponse.json({ message: 'Infrastructure deleted successfully' })
  } catch (error) {
    console.error(`Error deleting infrastructure with ID ${id}:`, error)
    return NextResponse.json({ error: 'Failed to delete infrastructure' }, { status: 500 })
  }
}
