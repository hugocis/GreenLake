import { Request, Response } from 'express';
import { processQuestion } from '../../services/ai.services';
import dayjs from 'dayjs';

export const askController = async (req: Request, res: Response): Promise<void> => {
  const { question } = req.body;

  if (!question) {
    res.status(400).json({ 
      metadata: {
        status: 'error',
        timestamp: dayjs().toISOString()
      },
      results: {
        answer: 'Debes proporcionar una pregunta en el campo "question".'
      }
    });
    return;
  }

  try {
    const answer = await processQuestion(question);

    res.status(200).json({
      metadata: {
        status: 'success',
        timestamp: dayjs().toISOString()
      },
      results: {
        answer
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      metadata: {
        status: 'error',
        timestamp: dayjs().toISOString()
      },
      results: {
        answer: 'Ocurrió un error procesando tu pregunta.'
      }
    });
  }
};
