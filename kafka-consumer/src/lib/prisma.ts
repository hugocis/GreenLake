import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Log the database URL (masking the password)
console.log('Database URL:', process.env.DATABASE_URL_LOOPERS?.replace(/(.*?\/\/.*?:).*?(@.*)/g, '$1[PASSWORD]$2'))

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Initialize Prisma with debug logging
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

// Execute a query to enable TimescaleDB extension at the beginning
async function initTimescaleDB() {
  try {
    await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;`
    console.log('TimescaleDB extension enabled successfully');
  } catch (error) {
    console.error('Failed to enable TimescaleDB extension:', error);
    // Continue anyway, it might already be enabled at the database level
  }
}

// Initialize TimescaleDB extension
initTimescaleDB();

// Raw SQL function for inserting air metrics (bypass the Prisma model layer)
export async function insertAirMetrics(data: {
  event_time: Date;
  sensor_id: string;
  pm10?: number;
  co?: number;
  co2?: number;
  no2?: number;
  o3?: number;
  so2?: number;
}) {
  try {
    // Convertir el ID del sensor a UUID usando sintaxis PostgreSQL
    const result = await prisma.$executeRaw`
      INSERT INTO "public"."sensor_metrics_air" 
      ("event_time", "sensor_id", "pm10", "co", "co2", "no2", "o3", "so2") 
      VALUES (${data.event_time}, ${data.sensor_id}::uuid, ${data.pm10 || null}, ${data.co || null}, 
              ${data.co2 || null}, ${data.no2 || null}, ${data.o3 || null}, ${data.so2 || null})
    `;
    return result;
  } catch (error) {
    console.error('Error inserting air metrics with raw SQL:', error);
    throw error;
  }
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
