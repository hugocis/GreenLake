import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */


export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const sensorId = searchParams.get('sensorId');
    const sensorType = searchParams.get('type'); // air, ambient, traffic, water_quality, water_usage
    const limit = parseInt(searchParams.get('limit') || '10');

    // Validar el tipo de sensor
    if (!sensorType || !['air', 'ambient', 'traffic', 'water_quality', 'water_usage'].includes(sensorType)) {
      return NextResponse.json(
        { error: 'Tipo de sensor inválido o no especificado' },
        { status: 400 }
      );
    }

    let metricsData;
    let sensorIdsFilter: any = {};
    
    // Filtro por id de sensor específico, si se proporciona
    if (sensorId) {
      sensorIdsFilter = { sensor_id: sensorId };
    }

    // Consulta diferentes según el tipo de sensor
    switch (sensorType) {
      case 'air':
        metricsData = await prisma.sensor_metrics_air.findMany({
          where: sensorIdsFilter,
          orderBy: { event_time: 'desc' },
          take: limit,
          include: { sensors: true }
        });
        break;
      case 'ambient':
        metricsData = await prisma.sensor_metrics_ambient.findMany({
          where: sensorIdsFilter,
          orderBy: { event_time: 'desc' },
          take: limit,
          include: { sensors: true }
        });
        break;
      case 'traffic':
        metricsData = await prisma.sensor_metrics_traffic.findMany({
          where: sensorIdsFilter,
          orderBy: { event_time: 'desc' },
          take: limit,
          include: { sensors: true }
        });
        break;
      case 'water_quality':
        metricsData = await prisma.sensor_metrics_water_quality.findMany({
          where: sensorIdsFilter,
          orderBy: { event_time: 'desc' },
          take: limit,
          include: { sensors: true }
        });
        break;
      case 'water_usage':
        metricsData = await prisma.sensor_metrics_water_usage.findMany({
          where: sensorIdsFilter,
          orderBy: { event_time: 'desc' },
          take: limit,
          include: { sensors: true }
        });
        break;
      default:
        return NextResponse.json(
          { error: 'Tipo de sensor no reconocido' },
          { status: 400 }
        );
    }

    // Si no hay sensorId específico, agrupar por sensor_id y devolver el último registro de cada sensor
    if (!sensorId) {
      // Crear un mapa para mantener solo el registro más reciente de cada sensor
      const latestMetricsBySensor = new Map();
      
      for (const metric of metricsData) {
        const currentSensorId = metric.sensor_id;
        
        if (!latestMetricsBySensor.has(currentSensorId) || 
            new Date(metric.event_time) > new Date(latestMetricsBySensor.get(currentSensorId).event_time)) {
          latestMetricsBySensor.set(currentSensorId, metric);
        }
      }
      
      metricsData = Array.from(latestMetricsBySensor.values());
    }

    return NextResponse.json({
      data: metricsData,
      count: metricsData.length,
    });

  } catch (error) {
    console.error('Error al obtener métricas de sensores:', error);
    return NextResponse.json(
      { error: 'Error al obtener métricas de sensores' },
      { status: 500 }
    );
  }
}
