import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const prisma = new PrismaClient();

const loadMCP = (modelName: string) => {
  const mcpPath = path.join(__dirname, '../mcp_contexts', `${modelName}.json`);
  return JSON.parse(fs.readFileSync(mcpPath, 'utf-8'));
};

export const processQuestion = async (question: string): Promise<string> => {
  // 1. Enviar la pregunta a OpenAI
  const iaResponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'Eres un asistente experto en bases de datos de GreenLake City. Responde indicando qué modelo consultar y condiciones.' },
      { role: 'user', content: `Pregunta: ${question}` }
    ],
    max_tokens: 100
  });

  const instruction = iaResponse.choices[0].message.content?.trim() || '';

  console.log('📢 Instrucción IA:', instruction);

  // 2. Lógica básica para interpretar la instrucción (simulación inteligente)
  if (instruction.toLowerCase().includes('infraestructura') && instruction.includes('green_score')) {
    const mcp = loadMCP('infrastructure');

    const resultados: { name: string | null, green_score: number | null }[] = await prisma.infrastructure.findMany({
      where: {
        green_score: { gt: 80 }
      },
      select: {
        name: true,
        green_score: true
      }
    });

    if (resultados.length === 0) return 'No se encontraron infraestructuras con green_score mayor a 80.';

    return `Infraestructuras encontradas: ${resultados.map(r => `${r.name} (${r.green_score})`).join(', ')}`;
  }

  // Puedes ir añadiendo más condiciones aquí para otros modelos

  return 'Lo siento, no pude entender cómo responder a esa pregunta.';
};
