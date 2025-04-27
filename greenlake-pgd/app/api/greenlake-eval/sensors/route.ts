import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    metadata: {
      status: 'success',
      timestamp: new Date().toISOString()
    },
    results: {
      message: 'Please use one of the following sensor operations: average, min, max',
      usage: 'GET /api/greenlake-eval/sensors/{operation}?city_id={city_id}&sensor_type={sensor_type}&date={date}',
      parameters: {
        operation: 'Operation to perform on sensor data. Allowed values: average, min, max',
        city_id: 'ID of the city',
        sensor_type: 'Type of sensor. Allowed values: air, ambient, traffic, water_quality, water_usage',
        date: 'Date for which to retrieve data (format: YYYY-MM-DD)'
      }
    }
  }, { status: 200 });
}
