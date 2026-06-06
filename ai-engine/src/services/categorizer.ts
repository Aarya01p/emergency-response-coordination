import OpenAI from 'openai';
import { Logger } from './utils/logger';

const logger = new Logger('IncidentCategorizer');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface CategorizedIncident {
  category: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  reasoning: string;
}

export async function categorizeIncident(
  title: string,
  description: string
): Promise<CategorizedIncident> {
  try {
    const prompt = `You are an emergency response expert. Categorize the following incident:

Title: ${title}
Description: ${description}

Respond in JSON format with:
- category: (FIRE, MEDICAL, ACCIDENT, NATURAL_DISASTER, SECURITY, or OTHER)
- severity: (LOW, MEDIUM, HIGH, or CRITICAL)
- confidence: (0-1 score)
- reasoning: (brief explanation)`;

    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4',
      messages: [{
        role: 'user',
        content: prompt,
      }],
      temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No response from AI');

    const jsonMatch = content.match(/\{[^{}]*\}/);
    if (!jsonMatch) throw new Error('Invalid JSON response');

    const result = JSON.parse(jsonMatch[0]);
    logger.info('Incident categorized', { title, result });

    return {
      category: result.category,
      severity: result.severity,
      confidence: result.confidence,
      reasoning: result.reasoning,
    };
  } catch (err) {
    logger.error('Categorization failed:', err);
    throw err;
  }
}

export async function assessResourceNeeds(
  category: string,
  severity: string,
  description: string
): Promise<string[]> {
  try {
    const prompt = `As an emergency response coordinator, what resources are needed for:

Category: ${category}
Severity: ${severity}
Description: ${description}

Respond with a JSON array of resource types (e.g., ["ambulance", "fire_truck", "police_unit"])`;

    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4',
      messages: [{
        role: 'user',
        content: prompt,
      }],
      temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No response from AI');

    const arrayMatch = content.match(/\[.*\]/);
    if (!arrayMatch) throw new Error('Invalid response');

    const resources = JSON.parse(arrayMatch[0]);
    logger.info('Resource needs assessed', { resources });

    return resources;
  } catch (err) {
    logger.error('Resource assessment failed:', err);
    throw err;
  }
}
