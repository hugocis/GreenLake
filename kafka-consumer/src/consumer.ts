import { Kafka, EachMessagePayload } from 'kafkajs';
import { PrismaClient } from '../generated/prisma';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();
// Make sure we have a valid broker URL
const brokerUrl = process.env.KAFKA_BROKER || 'localhost:9092';
console.log(`Connecting to Kafka broker: ${brokerUrl}`);

const kafka = new Kafka({
  clientId: 'sensor-consumer',
  brokers: [brokerUrl]
});

// Lista de topics y mapeo a funciones de inserción
const handlers: Record<string, (payload: any) => Promise<void>> = {
  sensor_metrics_air: async (data) => {
    await prisma.sensorMetricsAir.create({
      data: {
        sensorId: data.sensorId,
        eventTime: new Date(data.eventTime),
        pm10: data.pm10,
        co: data.co,
        co2: data.co2,
        no2: data.no2,
        o3: data.o3,
        so2: data.so2
      }
    });
  },
  sensor_metrics_ambient: async (data) => {
    await prisma.sensorMetricsAmbient.create({
      data: {
        sensorId: data.sensorId,
        eventTime: new Date(data.eventTime),
        temperature: data.temperature,
        humidity: data.humidity,
        solarRadiation: data.solarRadiation
      }
    });
  },
  sensor_metrics_traffic: async (data) => {
    await prisma.sensorMetricsTraffic.create({
      data: {
        sensorId: data.sensorId,
        eventTime: new Date(data.eventTime),
        vehicleDensity: data.vehicleDensity,
        avgSpeed: data.avgSpeed,
        flowRate: data.flowRate,
        occupancy: data.occupancy,
        congestionIndex: data.congestionIndex
      }
    });
  },
  sensor_metrics_water_quality: async (data) => {
    await prisma.sensorMetricsWaterQuality.create({
      data: {
        sensorId: data.sensorId,
        eventTime: new Date(data.eventTime),
        waterTemperature: data.waterTemperature,
        phLevel: data.phLevel,
        turbidity: data.turbidity,
        dissolvedOxygen: data.dissolvedOxygen,
        conductivity: data.conductivity
      }
    });
  },
  sensor_metrics_water_usage: async (data) => {
    await prisma.sensorMetricsWaterUsage.create({
      data: {
        sensorId: data.sensorId,
        eventTime: new Date(data.eventTime),
        usageLiters: data.usageLiters
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
      if (!message.value) return;
      try {
        const payload = JSON.parse(message.value.toString());
        const handler = handlers[topic];
        if (handler) {
          await handler(payload);
          console.log(`▶ Inserted ${topic} @ ${payload.eventTime}`);
        } else {
          console.warn(`⚠ No handler for topic ${topic}`);
        }
      } catch (err) {
        console.error(`✖ Error processing message on ${topic}:`, err);
      }
    }
  });  process.on('SIGINT', async () => {
    console.log('Disconnecting consumer…');
    await consumer.disconnect();
    await prisma.$disconnect();
    process.exit(0);
  });
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
