import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

/**
 * GET handler to fetch events that are active within a date range for a specific city
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const cityId = searchParams.get('city_id');
    const startDateStr = searchParams.get('start_date');
    const endDateStr = searchParams.get('end_date');

    // Validate required parameters
    if (!cityId || !startDateStr || !endDateStr) {
      return NextResponse.json({
        metadata: {
          status: "error",
          timestamp: new Date().toISOString(),
          message: "Missing required parameters: city_id, start_date, and end_date are required"
        }
      }, { status: 400 });
    }

    // Validate date formats (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
    if (!dateRegex.test(startDateStr) || !dateRegex.test(endDateStr)) {
      return NextResponse.json({
        metadata: {
          status: "error",
          timestamp: new Date().toISOString(),
          message: "Invalid date format. Use YYYY-MM-DD"
        }
      }, { status: 400 });
    }

    // Parse dates to ensure proper format for comparison
    const startDate = new Date(`${startDateStr}T00:00:00Z`);
    const endDate = new Date(`${endDateStr}T23:59:59.999Z`);

    // Validate that start date is before end date
    if (startDate > endDate) {
      return NextResponse.json({
        metadata: {
          status: "error",
          timestamp: new Date().toISOString(),
          message: "start_date must be before end_date"
        }
      }, { status: 400 });
    }

    // Query events that are active within the date range for the specified city
    const events = await prisma.events.findMany({
      where: {
        city_id: cityId,
        // Event is active if it starts before the end of the range and ends after the start of the range
        start_date: {
          lte: endDate
        },
        end_date: {
          gte: startDate
        }
      },
      select: {
        event_id: true,
        city_id: true,
        venue_id: true,
        name: true,
        description: true,
        start_date: true,
        end_date: true
      }
    });

    // Check if any events were found
    if (events.length === 0) {
      return NextResponse.json({
        metadata: {
          status: "success", // Still return success with empty results
          timestamp: new Date().toISOString()
        },
        results: []
      }, { status: 200 });
    }

    // Format the response
    return NextResponse.json({
      metadata: {
        status: "success",
        timestamp: new Date().toISOString()
      },
      results: events
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching nearby events:', error);
    return NextResponse.json({
      metadata: {
        status: "error",
        timestamp: new Date().toISOString(),
        message: "Internal server error"
      }
    }, { status: 500 });
  }
}
