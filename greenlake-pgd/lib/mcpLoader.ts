/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */
import fs from 'fs';
import path from 'path';

export const loadContext = (modelName: string) => {
  try {
    const filePath = path.join(process.cwd(), 'mcp_contexts', `${modelName.toLowerCase()}.json`);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`No se pudo cargar el contexto para el modelo: ${modelName}`);
    return null;
  }
};
