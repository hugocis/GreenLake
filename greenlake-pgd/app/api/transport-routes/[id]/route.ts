import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET handler to fetch specific transport route by ID
export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const route = await prisma.transport_routes.findUnique({
      where: { route_id: id },
      include: {
        cities_transport_routes_origin_city_idTocities: true,
        cities_transport_routes_destination_city_idTocities: true,
        infrastructure_transport_routes_origin_hub_idToinfrastructure: true,
        infrastructure_transport_routes_destination_hub_idToinfrastructure: true,
        tourism_trips: {
          include: { people: true },
          take: 10, // Limit related trips
        },
      },
    })

    if (!route) {
      return NextResponse.json({ error: 'Transport route not found' }, { status: 404 })
    }

    return NextResponse.json({ data: route })
  } catch (error) {
    console.error(`Error fetching transport route with ID ${id}:`, error)
    return NextResponse.json({ error: 'Failed to fetch transport route' }, { status: 500 })
  }
}

// PUT handler to update a transport route
export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    const existing = await prisma.transport_routes.findUnique({
      where: { route_id: id },
    })
    if (!existing) {
      return NextResponse.json({ error: 'Transport route not found' }, { status: 404 })
    }

    const updated = await prisma.transport_routes.update({
      where: { route_id: id },
      data: {
        transport_type:           body.transport_type           ?? existing.transport_type,
        route_name:               body.route_name               ?? existing.route_name,
        origin_city_id:           body.origin_city_id           ?? existing.origin_city_id,
        origin_hub_id:            body.origin_hub_id            ?? existing.origin_hub_id,
        destination_city_id:      body.destination_city_id      ?? existing.destination_city_id,
        destination_hub_id:       body.destination_hub_id       ?? existing.destination_hub_id,
        distance_km:              body.distance_km              ?? existing.distance_km,
        travel_time:              body.travel_time              ?? existing.travel_time,
        travel_minutes:           body.travel_minutes           ?? existing.travel_minutes,
        frequency:                body.frequency                ?? existing.frequency,
        departure_times:          body.departure_times          ?? existing.departure_times,
        capacity:                 body.capacity                 ?? existing.capacity,
        price:                    body.price                    ?? existing.price,
        utilization_percent:      body.utilization_percent      ?? existing.utilization_percent,
        efficiency_score:         body.efficiency_score         ?? existing.efficiency_score,
        carbon_footprint_kg:      body.carbon_footprint_kg      ?? existing.carbon_footprint_kg,
      },
      include: {
        cities_transport_routes_origin_city_idTocities: true,
        cities_transport_routes_destination_city_idTocities: true,
      },
    })

    return NextResponse.json({ data: updated })
  } catch (error) {
    console.error(`Error updating transport route with ID ${id}:`, error)
    return NextResponse.json({ error: 'Failed to update transport route' }, { status: 500 })
  }
}

// DELETE handler to remove a transport route
export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const existing = await prisma.transport_routes.findUnique({
      where: { route_id: id },
    })
    if (!existing) {
      return NextResponse.json({ error: 'Transport route not found' }, { status: 404 })
    }

    await prisma.transport_routes.delete({ where: { route_id: id } })
    return NextResponse.json({ message: 'Transport route deleted successfully' })
  } catch (error) {
    console.error(`Error deleting transport route with ID ${id}:`, error)
    return NextResponse.json({ error: 'Failed to delete transport route' }, { status: 500 })
  }
}
