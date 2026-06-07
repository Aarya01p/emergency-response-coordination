import { GoogleGenAI } from '@google/genai';

// Uses your Render environment variable key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface AIAnalysisResult {
  category: 'FIRE' | 'MEDICAL' | 'POLICE' | 'RESCUE' | 'UTILITY' | 'UNKNOWN';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  summary: string;
}

export async function analyzeIncidentText(description: string): Promise<AIAnalysisResult> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Analyze the following emergency text. Reply strictly in a valid JSON format with these keys: "category", "severity", "summary".
        Allowed categories: ["FIRE", "MEDICAL", "POLICE", "RESCUE", "UTILITY", "UNKNOWN"]
        Allowed severities: ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
        Emergency Text: "${description}"
      `,
    });

    const responseText = response.text || '{}';
    const cleanJsonString = responseText.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJsonString) as AIAnalysisResult;
  } catch (error) {
    console.error('AI analysis engine failed:', error);
    return { category: 'UNKNOWN', severity: 'MEDIUM', summary: description.slice(0, 100) };
  }
}
