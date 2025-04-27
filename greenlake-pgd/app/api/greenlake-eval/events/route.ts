import { NextRequest, NextResponse } from 'next/server';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

/**
 * GET handler for the base events endpoint
 * This is a placeholder that redirects to documentation or returns basic information
 */
export async function GET(req: NextRequest) {
  return NextResponse.json({
    metadata: {
      status: "success",
      timestamp: new Date().toISOString()
    },
    message: "Events API base endpoint. Use specific endpoints for data requests.",
    availableEndpoints: [
      "/api/greenlake-eval/events/nearby - Get events active within a date range for a city"
      // Add more endpoints here as they are implemented
    ]
  }, { status: 200 });
}
