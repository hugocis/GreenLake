import { Kafka, EachMessagePayload } from 'kafkajs';
import prisma from "./lib/prisma"; 
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Make sure we have a valid broker URL
const brokerUrl = process.env.KAFKA_BROKER || 'localhost:9092';
console.log(`Connecting to Kafka broker: ${brokerUrl}`);

const kafka = new Kafka({
  clientId: 'sensor-consumer',
  brokers: [brokerUrl]
});

// Function to validate date string
const validateDate = (dateStr: any): Date => {
  if (!dateStr) {
    return new Date(); // Use current date as fallback
  }
  
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? new Date() : date;
};

// Function to validate numeric fields
const validateNumber = (value: any, defaultValue = 0): number => {
  if (value === undefined || value === null || isNaN(Number(value))) {
    return defaultValue;
  }
  return Number(value);
};

// Function to validate string fields
const validateString = (value: any, defaultValue = ''): string => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  return String(value);
};

// Function to ensure a sensor exists before inserting metrics
async function ensureSensorExists(sensorId: string): Promise<void> {
  try {
    // Check if the sensor exists
    const sensor = await prisma.sensor.findUnique({
      where: { id: sensorId }
    });
    
    // If sensor doesn't exist, create a placeholder sensor
    if (!sensor) {
      console.log(`Creating placeholder sensor with ID: ${sensorId}`);
      await prisma.sensor.create({
        data: {
          id: sensorId,
          installedAt: new Date(),
          cityId: 'unknown',
          stateId: 'unknown',
          latitude: 0,
          longitude: 0,
          kmPoint: 0,
          sensorType: 'unknown',
          industrialZone: false
        }
      });
    }
  } catch (error) {
    console.error(`Failed to ensure sensor exists: ${error}`);
    throw error;
  }
}

// Lista de topics y mapeo a funciones de inserción
const handlers: Record<string, (payload: any) => Promise<void>> = {  sensor_metrics_air: async (data) => {
    console.log('Processing air metrics payload:', data);
    
    // Extract sensorId from the data
    const sensorId = validateString(data.sensor_id, 'unknown');
    
    // Ensure the sensor exists before inserting metrics
    await ensureSensorExists(sensorId);
    
    await prisma.sensorMetricsAir.create({
      data: {
        sensorId: sensorId,
        eventTime: validateDate(data.event_time),
        pm10: validateNumber(data.pm10),
        co: validateNumber(data.co),
        co2: validateNumber(data.co2),
        no2: validateNumber(data.no2),
        o3: validateNumber(data.o3),
        so2: validateNumber(data.so2)
      }
    });
  },  sensor_metrics_ambient: async (data) => {
    console.log('Processing ambient metrics payload:', data);
    
    // Extract sensorId from the data
    const sensorId = validateString(data.sensor_id, 'unknown');
    
    // Ensure the sensor exists before inserting metrics
    await ensureSensorExists(sensorId);
    
    await prisma.sensorMetricsAmbient.create({
      data: {
        sensorId: sensorId,
        eventTime: validateDate(data.event_time),
        temperature: validateNumber(data.temperature),
        humidity: validateNumber(data.humidity),
        solarRadiation: validateNumber(data.solar_radiation)
      }
    });
  },  sensor_metrics_traffic: async (data) => {
    console.log('Processing traffic metrics payload:', data);
    
    // Extract sensorId from the data
    const sensorId = validateString(data.sensor_id, 'unknown');
    
    // Ensure the sensor exists before inserting metrics
    await ensureSensorExists(sensorId);
    
    await prisma.sensorMetricsTraffic.create({
      data: {
        sensorId: sensorId,
        eventTime: validateDate(data.event_time),
        vehicleDensity: validateNumber(data.vehicle_density),
        avgSpeed: validateNumber(data.avg_speed),
        flowRate: validateNumber(data.flow_rate),
        occupancy: validateNumber(data.occupancy),
        congestionIndex: validateNumber(data.congestion_index)
      }
    });
  },  sensor_metrics_water_quality: async (data) => {
    console.log('Processing water quality metrics payload:', data);
    
    // Extract sensorId from the data
    const sensorId = validateString(data.sensor_id, 'unknown');
    
    // Ensure the sensor exists before inserting metrics
    await ensureSensorExists(sensorId);
    
    await prisma.sensorMetricsWaterQuality.create({
      data: {
        sensorId: sensorId,
        eventTime: validateDate(data.event_time),
        waterTemperature: validateNumber(data.water_temperature),
        phLevel: validateNumber(data.ph_level),
        turbidity: validateNumber(data.turbidity),
        dissolvedOxygen: validateNumber(data.dissolved_oxygen),
        conductivity: validateNumber(data.conductivity)
      }
    });
  },  sensor_metrics_water_usage: async (data) => {
    console.log('Processing water usage metrics payload:', data);
    
    // Extract sensorId from the data
    const sensorId = validateString(data.sensor_id, 'unknown');
    
    // Ensure the sensor exists before inserting metrics
    await ensureSensorExists(sensorId);
    
    await prisma.sensorMetricsWaterUsage.create({
      data: {
        sensorId: sensorId,
        eventTime: validateDate(data.event_time),
        usageLiters: validateNumber(data.usage_liters)
      }
    });
  }
};

async function run() {
  const consumer = kafka.consumer({ groupId: 'greenlake-group' });
  await consumer.connect();
  // Suscribirse a todos los topics
  await Promise.all(Object.keys(handlers).map(topic =>
    consumer.subscribe({ topic, fromBeginning: false })
  ));
  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      if (!message.value) {
        console.warn(`⚠ Empty message received on topic ${topic}`);
        return;
      }
      
      try {
        const rawMessage = message.value.toString();
        console.log(`📨 Received message on ${topic}: ${rawMessage.substring(0, 100)}${rawMessage.length > 100 ? '...' : ''}`);
        
        const payload = JSON.parse(rawMessage);
        const handler = handlers[topic];
        
        if (handler) {
          await handler(payload);
          console.log(`✅ Successfully inserted ${topic} data`);
        } else {
          console.warn(`⚠ No handler defined for topic ${topic}`);
        }      } catch (err: any) {
        console.error(`❌ Error processing message on ${topic}:`, err);
        if (err instanceof SyntaxError) {
          console.error('JSON parsing error. Raw message:', message.value?.toString());
        } else if (err.name === 'PrismaClientValidationError') {
          console.error('Validation error with Prisma. Check the data format.');
        } else if (err.name === 'PrismaClientKnownRequestError') {
          console.error(`Database error code ${err.code}: ${err.message}`);
        }
      }
    }
  });

  process.on('SIGINT', async () => {
    console.log('Disconnecting consumer…');
    await consumer.disconnect();
    await prisma.$disconnect();
    process.exit(0);
  });
}

run().catch((e: Error) => {
  console.error('Failed to run consumer:', e);
  process.exit(1);
});
