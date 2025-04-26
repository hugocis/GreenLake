import OpenAI from 'openai';
import { loadContext } from '../../GreenLake/greenlake-pgd/lib/mcpLoader';

const openai = new OpenAI({
  apiKey: 'TU_API_KEY_AQUI'
});

export const processQuestion = async (question: string): Promise<string> => {
  let modelName = '';

  if (question.toLowerCase().includes('infraestructura')) {
    modelName = 'infrastructure';
  } else if (question.toLowerCase().includes('evento')) {
    modelName = 'events';
  } else {
    return 'No puedo identificar el tipo de datos que necesitas.';
  }

  const context = loadContext(modelName);
  if (!context) return 'No tengo contexto para responder esa pregunta.';

  const prompt = `
Eres un asistente de datos de GreenLake City. Aquí tienes información del modelo:

Modelo: ${context.model}
Descripción: ${context.description}
Campos disponibles: ${Object.keys(context.fields).join(', ')}
Acciones posibles: ${context.actions.join(', ')}

Pregunta del usuario: "${question}"

Responde de forma clara indicando qué acción realizarías y qué filtros aplicarías.
`;

  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 100
  });

  return response.choices[0].text?.trim() || 'No tengo una respuesta para esa pregunta.';
};
