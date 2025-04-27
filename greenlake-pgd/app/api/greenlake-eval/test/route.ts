import { NextRequest, NextResponse } from 'next/server';

/**
 * GET handler to verify API is active and functioning
 */
export async function GET(req: NextRequest) {
  try {
    // Simple response to indicate the API is active
    return NextResponse.json({
      metadata: {
        status: "success",
        timestamp: new Date().toISOString()
      },
      results: {
        status: "active"
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error in test endpoint:', error);
    return NextResponse.json({
      metadata: {
        status: "error",
        timestamp: new Date().toISOString(),
        message: "Internal server error"
      }
    }, { status: 500 });
  }
}
