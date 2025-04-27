import { NextRequest, NextResponse } from 'next/server';
import { processQuestion } from '@/services/ai.services';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

/**
 * POST handler for AI chatbot that answers questions about GreenLake City
 */
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { question } = body;

    // Validate that a question was provided
    if (!question) {
      return NextResponse.json({
        metadata: {
          status: "error",
          timestamp: new Date().toISOString(),
          message: "Missing required field: question"
        }
      }, { status: 400 });
    }

    // Process the question using the existing AI service
    const answer = await processQuestion(question);

    // Return the response
    return NextResponse.json({
      metadata: {
        status: "success",
        timestamp: new Date().toISOString()
      },
      results: {
        answer
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error in chatbot endpoint:', error);
    return NextResponse.json({
      metadata: {
        status: "error",
        timestamp: new Date().toISOString(),
        message: "Internal server error"
      }
    }, { status: 500 });
  }
}
