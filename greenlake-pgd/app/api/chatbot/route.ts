import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    // 1️⃣ Llamamos al backend (MCP) para que genere el SQL
    const response = await axios.post('http://localhost:3000/ask', { question });
    const { sql } = response.data;

    // 2️⃣ Preparamos la query segura
    let finalSQL = sql.trim().replace(/;$/, '');
// Detectamos SELECT * y lo reemplazamos por columnas seguras
    if (/select\s+\*\s+from\s+infrastructure/i.test(finalSQL)) {
    finalSQL = `
        SELECT id, name, type, subtype, green_score, carbon_footprint_kg_per_year
        FROM infrastructure
        LIMIT 50
    `;
    }


    // 🚨 3️⃣ Validamos que no contenga columnas problemáticas
    if (finalSQL.toLowerCase().includes('location')) {
      return NextResponse.json({
        message: '❌ The query includes unsupported geometry columns like "location". Please refine your question.',
        sql: finalSQL,
        data: []
      });
    }

    // 4️⃣ Ejecutamos la query si es segura
    const data = await prisma.$queryRawUnsafe(finalSQL) as any[];

    // 5️⃣ Limpieza adicional (por si acaso)
    const safeData = data.map((row) => {
      if ('location' in row) {
        row.location = '[GEOMETRY DATA]';
      }
      return row;
    });

    // 6️⃣ Devolvemos respuesta al frontend
    return NextResponse.json({
      sql: finalSQL,
      data: safeData
    });

  } catch (error: any) {
    console.error('Error handling chatbot request:', error.message);
    return NextResponse.json({
      message: "Sorry, I'm having trouble accessing the database.",
      error: error.message
    }, { status: 500 });
  }
}
