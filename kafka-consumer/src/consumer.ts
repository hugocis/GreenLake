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

// Lista de topics y mapeo a funciones de inserción
const handlers: Record<string, (payload: any) => Promise<void>> = {
  sensor_metrics_air: async (data) => {
    console.log('Processing air metrics payload:', data);
    await prisma.sensorMetricsAir.create({
      data: {
        sensorId: validateString(data.sensorId, 'unknown'),
        eventTime: validateDate(data.eventTime),
        pm10: validateNumber(data.pm10),
        co: validateNumber(data.co),
        co2: validateNumber(data.co2),
        no2: validateNumber(data.no2),
        o3: validateNumber(data.o3),
        so2: validateNumber(data.so2)
      }
    });
  },
  sensor_metrics_ambient: async (data) => {
    console.log('Processing ambient metrics payload:', data);
    await prisma.sensorMetricsAmbient.create({
      data: {
        sensorId: validateString(data.sensorId, 'unknown'),
        eventTime: validateDate(data.eventTime),
        temperature: validateNumber(data.temperature),
        humidity: validateNumber(data.humidity),
        solarRadiation: validateNumber(data.solarRadiation)
      }
    });
  },
  sensor_metrics_traffic: async (data) => {
    console.log('Processing traffic metrics payload:', data);
    await prisma.sensorMetricsTraffic.create({
      data: {
        sensorId: validateString(data.sensorId, 'unknown'),
        eventTime: validateDate(data.eventTime),
        vehicleDensity: validateNumber(data.vehicleDensity),
        avgSpeed: validateNumber(data.avgSpeed),
        flowRate: validateNumber(data.flowRate),
        occupancy: validateNumber(data.occupancy),
        congestionIndex: validateNumber(data.congestionIndex)
      }
    });
  },
  sensor_metrics_water_quality: async (data) => {
    console.log('Processing water quality metrics payload:', data);
    await prisma.sensorMetricsWaterQuality.create({
      data: {
        sensorId: validateString(data.sensorId, 'unknown'),
        eventTime: validateDate(data.eventTime),
        waterTemperature: validateNumber(data.waterTemperature),
        phLevel: validateNumber(data.phLevel),
        turbidity: validateNumber(data.turbidity),
        dissolvedOxygen: validateNumber(data.dissolvedOxygen),
        conductivity: validateNumber(data.conductivity)
      }
    });
  },
  sensor_metrics_water_usage: async (data) => {
    console.log('Processing water usage metrics payload:', data);
    await prisma.sensorMetricsWaterUsage.create({
      data: {
        sensorId: validateString(data.sensorId, 'unknown'),
        eventTime: validateDate(data.eventTime),
        usageLiters: validateNumber(data.usageLiters)
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
