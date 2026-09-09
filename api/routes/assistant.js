import { answerAssistant } from '../services/assistantService.js';

export async function handleAssistant(pathParts, body) {
  if (pathParts.length !== 2 || pathParts[1] !== 'assistant') return null;
  const result = await answerAssistant(body || {});
  return result;
}
