import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import OpenAI from 'openai';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    console.log('📩 Pregunta recibida:', question);

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    // 1️⃣ Prompt mejorado
    const prompt = `
Eres un asistente que genera consultas SQL para PostgreSQL.

- Si preguntan por infraestructuras, usa la tabla \`infrastructure\`.
- Si preguntan por sensores, usa tablas como \`sensors\`, \`sensor_metrics_air\`, etc.
- Si preguntan por música, usa \`people_music\`.
- Siempre devuelve SOLO la consulta SQL entre \`\`\`sql ... \`\`\`.
- Limita los resultados con LIMIT 50 si no está especificado.
- No expliques nada, solo devuelve la query.
`;

    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: question }
      ]
    });

    const rawContent = aiResponse.choices[0].message.content || '';
    console.log('🧠 Respuesta de OpenAI:', rawContent);

    const sqlMatch = rawContent.match(/```sql\s*([\s\S]*?)```/i);
    let sql = sqlMatch ? sqlMatch[1].trim() : rawContent.trim();
    console.log('💾 SQL Generado:', sql);

    if (!sql.toLowerCase().startsWith('select')) {
      console.error('⛔ Query inválida');
      return NextResponse.json({ error: 'Generated query is invalid.', sql }, { status: 400 });
    }

    if (sql.includes('*') && sql.toLowerCase().includes('from infrastructure')) {
      sql = `
        SELECT id, name, type, subtype, green_score, carbon_footprint_kg_per_year
        FROM infrastructure
        LIMIT 50
      `;
      console.log('🔧 Query ajustada:', sql);
    }

    if (sql.toLowerCase().includes('location')) {
      console.warn('⚠️ Query con columna geometry detectada');
      return NextResponse.json({
        message: '❌ The query includes unsupported geometry columns like "location".',
        sql,
        data: []
      });
    }

    // 2️⃣ Ejecutar query
    console.log('🚀 Ejecutando query...');
    let data = await prisma.$queryRawUnsafe(sql) as any[];
    console.log('✅ Datos obtenidos:', data.length);

    // 3️⃣ Convertimos BigInt y limpiamos geometry
    const safeData = data.map(row => {
      const cleanedRow: any = {};
      for (const key in row) {
        if (typeof row[key] === 'bigint') {
          cleanedRow[key] = row[key].toString();
        } else if (key === 'location') {
          cleanedRow[key] = '[GEOMETRY DATA]';
        } else {
          cleanedRow[key] = row[key];
        }
      }
      return cleanedRow;
    });

    return NextResponse.json({ sql, data: safeData });

  } catch (err: any) {
    console.error('❌ Error handling chatbot request:', err.message);
    return NextResponse.json({
      message: "Sorry, I'm having trouble processing your request.",
      error: err.message
    }, { status: 500 });
  }
}