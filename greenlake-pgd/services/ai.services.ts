import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const prisma = new PrismaClient();

export const processQuestion = async (question: string): Promise<string> => {
  const systemPrompt = `
Eres un asistente experto en la base de datos de GreenLake City.
Responde SIEMPRE en formato JSON como este:

{
  "model": "infrastructure",
  "conditions": {
    "green_score": { "$gt": 3 },
    "type": "Hospital"
  },
  "select": ["name", "type", "green_score"]
}

Si la pregunta es sobre sensores, usa modelos como "sensors" o "sensor_metrics_air", etc.

Si no entiendes la pregunta, responde:
{ "error": "Pregunta no reconocida" }
`;

  try {
    const iaResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Pregunta: ${question}` }
      ],
      max_tokens: 200
    });

    const instructionRaw = iaResponse.choices[0].message.content?.trim() || '';

    let instructionJson;
    try {
      instructionJson = JSON.parse(instructionRaw);
    } catch {
      return '❌ La IA no devolvió un formato JSON válido.';
    }

    if (instructionJson.error) {
      return '⚠️ Lo siento, no pude entender cómo responder a esa pregunta.';
    }

    const { model, conditions = {}, select = ['*'] } = instructionJson;

    // Validar que el modelo exista en Prisma
    if (!(model in prisma)) {
      return `❌ El modelo "${model}" no está definido en la base de datos.`;
    }

    // Construir la consulta dinámica
    const resultados = await (prisma as any)[model].findMany({
      where: translateConditions(conditions),
      select: select.includes('*') ? undefined : arrayToSelect(select),
      take: 50
    });

    if (resultados.length === 0) return '⚠️ No se encontraron resultados.';

    return `✅ Resultados (${resultados.length}):\n` + resultados.map((r: any, idx: number) => `${idx + 1}. ${JSON.stringify(r)}`).join('\n');

  } catch (err: any) {
    console.error('Error en processQuestion:', err.message);
    return '❌ Error procesando la solicitud.';
  }
};

// Helper para convertir condiciones del tipo { "green_score": { "$gt": 3 } }
function translateConditions(conditions: any) {
  const prismaWhere: any = {};
  for (const key in conditions) {
    const value = conditions[key];
    if (typeof value === 'object' && value !== null) {
      const operatorKey = Object.keys(value)[0];
      const operatorValue = value[operatorKey];
      switch (operatorKey) {
        case '$gt':
          prismaWhere[key] = { gt: operatorValue };
          break;
        case '$lt':
          prismaWhere[key] = { lt: operatorValue };
          break;
        case '$eq':
          prismaWhere[key] = operatorValue;
          break;
        // Añadir más operadores si es necesario
      }
    } else {
      prismaWhere[key] = value;
    }
  }
  return prismaWhere;
}

// Helper para convertir array ["name", "type"] en objeto { name: true, type: true }
function arrayToSelect(fields: string[]) {
  const selectObj: any = {};
  fields.forEach(field => selectObj[field] = true);
  return selectObj;
}
