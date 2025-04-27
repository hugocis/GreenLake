import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category') || 'all';
    
    // Initialize stats object
    const stats = {
      infrastructure: {
        total: 0,
        byType: {} as Record<string, number>,
      },
      events: {
        total: 0,
        byType: {} as Record<string, number>,
      },
      transport: {
        total: 0,
        byType: {} as Record<string, number>,
      },
      sensors: {
        total: 0,
        byType: {} as Record<string, number>,
      },
    };
    
    // Get infrastructure statistics
    if (category === 'all' || category === 'infrastructure') {
      // Get total count
      stats.infrastructure.total = await prisma.infrastructure.count();
      
      // Get count by type
      const infraTypes = await prisma.infrastructure.groupBy({
        by: ['type'],
        _count: {
          id: true,
        },
      });
      
      infraTypes.forEach(item => {
        stats.infrastructure.byType[item.type] = item._count.id;
      });
    }
    
    // Get events statistics
    if (category === 'all' || category === 'events') {
      // Get total count
      stats.events.total = await prisma.events.count();
      
      // Get count by type
      const eventTypes = await prisma.events.groupBy({
        by: ['event_type'],
        _count: {
          event_id: true,
        },
      });
      
      eventTypes.forEach(item => {
        if (item.event_type) {
          stats.events.byType[item.event_type] = item._count.event_id;
        }
      });
    }
    
    // Get transport statistics
    if (category === 'all' || category === 'transport') {
      // Get total count
      stats.transport.total = await prisma.transport_routes.count();
      
      // Get count by type
      const transportTypes = await prisma.transport_routes.groupBy({
        by: ['transport_type'],
        _count: {
          route_id: true,
        },
      });
      
      transportTypes.forEach(item => {
        stats.transport.byType[item.transport_type] = item._count.route_id;
      });
    }
    
    // Get sensor statistics
    if (category === 'all' || category === 'sensors') {
      // Get total count
      stats.sensors.total = await prisma.sensors.count();
      
      // Get count by type
      const sensorTypes = await prisma.sensors.groupBy({
        by: ['sensor_type'],
        _count: {
          id: true,
        },
      });
      
      sensorTypes.forEach(item => {
        stats.sensors.byType[item.sensor_type] = item._count.id;
      });
    }
    
    return NextResponse.json({ data: stats });
  } catch (error: any) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
