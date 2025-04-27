import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET handler to fetch events data
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const cityId = searchParams.get('cityId');
    const venueId = searchParams.get('venueId');
    const eventType = searchParams.get('eventType');
    const name = searchParams.get('name');
    const minAttendance = searchParams.get('minAttendance') ? parseInt(searchParams.get('minAttendance')!) : null;
    const maxAttendance = searchParams.get('maxAttendance') ? parseInt(searchParams.get('maxAttendance')!) : null;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const isFree = searchParams.get('isFree') === 'true' ? true : (searchParams.get('isFree') === 'false' ? false : null);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const format = searchParams.get('format') || 'json';

    // Build filter object based on query parameters
    const filter: any = {};
    
    if (cityId) {
      filter.city_id = cityId;
    }
    
    if (venueId) {
      filter.venue_id = venueId;
    }
    
    if (eventType) {
      filter.event_type = eventType;
    }
    
    if (name) {
      filter.name = {
        contains: name,
        mode: 'insensitive', // Case-insensitive search
      };
    }
    
    if (minAttendance !== null) {
      filter.expected_attendance = {
        ...filter.expected_attendance,
        gte: minAttendance,
      };
    }
    
    if (maxAttendance !== null) {
      filter.expected_attendance = {
        ...filter.expected_attendance,
        lte: maxAttendance,
      };
    }
    
    if (startDate) {
      filter.start_date = {
        ...filter.start_date,
        gte: new Date(startDate),
      };
    }
    
    if (endDate) {
      filter.end_date = {
        ...filter.end_date,
        lte: new Date(endDate),
      };
    }
    
    if (isFree !== null) {
      filter.is_free = isFree;
    }

    // Query to get total count for pagination
    const totalCount = await prisma.events.count({
      where: filter,
    });

    // Main query with pagination
    const events = await prisma.events.findMany({
      where: filter,
      include: {
        cities: true,
        infrastructure: true,
      },
      skip: offset,
      take: limit,
    });

    // Create response object
    const response = {
      data: events,
      total: totalCount,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      totalPages: Math.ceil(totalCount / limit),
    };

    // Handle different formats
    if (format === 'csv') {
      // Generate CSV string
      let csv = "event_id,name,event_type,city_id,venue_id,start_date,end_date,expected_attendance,actual_attendance,status,ticket_price,is_free\n";
      
      events.forEach(event => {
        csv += `${event.event_id},${event.name},${event.event_type},${event.city_id},${event.venue_id},${event.start_date},${event.end_date},${event.expected_attendance},${event.actual_attendance},${event.status},${event.ticket_price},${event.is_free}\n`;
      });
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=events.csv'
        }
      });
    } else if (format === 'excel') {
      // For Excel, we return a JSON that will be processed by the frontend
      return NextResponse.json(response);
    } else {
      // Default JSON response
      return NextResponse.json(response);
    }
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
