-- CreateTable
CREATE TABLE "sensors" (
    "id" TEXT NOT NULL,
    "installed_at" TIMESTAMP(3) NOT NULL,
    "city_id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "km_point" DOUBLE PRECISION NOT NULL,
    "sensor_type" TEXT NOT NULL,
    "state_id" TEXT NOT NULL,
    "road_id" TEXT,
    "industrial_zone" BOOLEAN NOT NULL,

    CONSTRAINT "sensors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sensor_metrics_ambient" (
    "sensor_id" TEXT NOT NULL,
    "event_time" TIMESTAMP(3) NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "solar_radiation" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "sensor_metrics_ambient_pkey" PRIMARY KEY ("sensor_id","event_time")
);

-- CreateTable
CREATE TABLE "sensor_metrics_traffic" (
    "sensor_id" TEXT NOT NULL,
    "event_time" TIMESTAMP(3) NOT NULL,
    "vehicle_density" DOUBLE PRECISION NOT NULL,
    "avg_speed" DOUBLE PRECISION NOT NULL,
    "flow_rate" DOUBLE PRECISION NOT NULL,
    "occupancy" DOUBLE PRECISION NOT NULL,
    "congestion_index" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "sensor_metrics_traffic_pkey" PRIMARY KEY ("sensor_id","event_time")
);

-- CreateTable
CREATE TABLE "sensor_metrics_air" (
    "sensor_id" TEXT NOT NULL,
    "event_time" TIMESTAMP(3) NOT NULL,
    "pm10" DOUBLE PRECISION NOT NULL,
    "co" DOUBLE PRECISION NOT NULL,
    "co2" DOUBLE PRECISION NOT NULL,
    "no2" DOUBLE PRECISION NOT NULL,
    "o3" DOUBLE PRECISION NOT NULL,
    "so2" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "sensor_metrics_air_pkey" PRIMARY KEY ("sensor_id","event_time")
);

-- CreateTable
CREATE TABLE "sensor_metrics_water_usage" (
    "sensor_id" TEXT NOT NULL,
    "event_time" TIMESTAMP(3) NOT NULL,
    "usage_liters" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "sensor_metrics_water_usage_pkey" PRIMARY KEY ("sensor_id","event_time")
);

-- CreateTable
CREATE TABLE "sensor_metrics_water_quality" (
    "sensor_id" TEXT NOT NULL,
    "event_time" TIMESTAMP(3) NOT NULL,
    "water_temperature" DOUBLE PRECISION NOT NULL,
    "ph_level" DOUBLE PRECISION NOT NULL,
    "turbidity" DOUBLE PRECISION NOT NULL,
    "dissolved_oxygen" DOUBLE PRECISION NOT NULL,
    "conductivity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "sensor_metrics_water_quality_pkey" PRIMARY KEY ("sensor_id","event_time")
);

-- AddForeignKey
ALTER TABLE "sensor_metrics_ambient" ADD CONSTRAINT "sensor_metrics_ambient_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensor_metrics_traffic" ADD CONSTRAINT "sensor_metrics_traffic_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensor_metrics_air" ADD CONSTRAINT "sensor_metrics_air_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensor_metrics_water_usage" ADD CONSTRAINT "sensor_metrics_water_usage_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensor_metrics_water_quality" ADD CONSTRAINT "sensor_metrics_water_quality_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
