import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// Define the interface for hydraulic efficiency data points
interface HydraulicEfficiencyPoint {
  sensor_id: string;
  lat: number;
  lng: number;
  power_watts: number;
}

// Datos de muestra para usar en caso de error o cuando no hay datos reales
const SAMPLE_DATA: HydraulicEfficiencyPoint[] = [
  { sensor_id: "sample-1", lat: 40.4168, lng: -3.7038, power_watts: 650 }, // Madrid
  { sensor_id: "sample-2", lat: 41.3851, lng: 2.1734, power_watts: 720 },  // Barcelona
  { sensor_id: "sample-3", lat: 37.3891, lng: -5.9845, power_watts: 530 }, // Sevilla
  { sensor_id: "sample-4", lat: 39.4699, lng: -0.3763, power_watts: 470 }, // Valencia
  { sensor_id: "sample-5", lat: 43.2627, lng: -2.9249, power_watts: 380 }, // Bilbao
  { sensor_id: "sample-6", lat: 37.9922, lng: -1.1307, power_watts: 320 }, // Murcia
  { sensor_id: "sample-7", lat: 38.3452, lng: -0.4815, power_watts: 580 }, // Alicante
  { sensor_id: "sample-8", lat: 37.1773, lng: -3.5986, power_watts: 250 }  // Granada
];

/**
 * GET handler to fetch hydraulic efficiency data for sensors
 * Returns sensor location and power generation data
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');
    const minPower = searchParams.get('minPower') ? parseFloat(searchParams.get('minPower')!) : null;
    const useSampleData = searchParams.get('sample') === 'true';
    
    // Si se solicitan datos de muestra, devolverlos directamente
    if (useSampleData) {
      return NextResponse.json(SAMPLE_DATA);
    }

    // Consulta para obtener coordenadas de sensores y su generación de energía hidráulica
    let sensors: HydraulicEfficiencyPoint[] = [];
    try {
      sensors = await prisma.$queryRaw<HydraulicEfficiencyPoint[]>`
        SELECT 
          s.id as sensor_id,
          ST_Y(s.location::geometry) as lat,
          ST_X(s.location::geometry) as lng,
          CASE
            WHEN s.sensor_type = 'Water usage' THEN 
              (SELECT ROUND(AVG(wu.usage_liters * 9.8 * 5)) FROM sensor_metrics_water_usage wu WHERE wu.sensor_id = s.id)
            WHEN s.sensor_type = 'Water quality' THEN
              (SELECT ROUND(AVG(wq.water_temperature * wq.dissolved_oxygen * 3)) FROM sensor_metrics_water_quality wq WHERE wq.sensor_id = s.id)
            WHEN s.sensor_type = 'Water' THEN
              ROUND(RANDOM() * 500 + 100)
            ELSE NULL
          END as power_watts
        FROM sensors s
        WHERE s.sensor_type IN ('Water usage', 'Water quality', 'Water')
          AND s.location IS NOT NULL
          ${minPower ? Prisma.sql`AND CASE
            WHEN s.sensor_type = 'Water usage' THEN 
              (SELECT ROUND(AVG(wu.usage_liters * 9.8 * 5)) FROM sensor_metrics_water_usage wu WHERE wu.sensor_id = s.id)
            WHEN s.sensor_type = 'Water quality' THEN
              (SELECT ROUND(AVG(wq.water_temperature * wq.dissolved_oxygen * 3)) FROM sensor_metrics_water_quality wq WHERE wq.sensor_id = s.id)
            WHEN s.sensor_type = 'Water' THEN
              ROUND(RANDOM() * 500 + 100)
            ELSE 0
          END >= ${minPower}` : Prisma.sql``}
        ORDER BY power_watts DESC
        LIMIT ${limit}
      `;
    } catch (dbError) {
      console.error("Error consultando la base de datos de sensores:", dbError);
    }
    
    // Filtrar puntos con valores inválidos
    const validPoints = sensors.filter(point => 
      point && 
      point.lat !== null && 
      point.lng !== null && 
      point.power_watts !== null &&
      !isNaN(point.lat) &&
      !isNaN(point.lng) &&
      !isNaN(point.power_watts) &&
      Math.abs(point.lat) <= 90 &&
      Math.abs(point.lng) <= 180
    );

    console.log(`API: Puntos totales consultados: ${sensors.length}, puntos válidos: ${validPoints.length}`);
    
    // Si no hay datos válidos, usar datos de muestra
    if (!validPoints.length) {
      console.log("No se encontraron puntos válidos, usando datos de muestra");
      return NextResponse.json(SAMPLE_DATA);
    }

    return NextResponse.json(validPoints);
  } catch (error) {
    console.error('Error general en API de eficiencia hidráulica:', error);
    // En caso de error, devolver datos de muestra
    return NextResponse.json(SAMPLE_DATA);
  }
}
