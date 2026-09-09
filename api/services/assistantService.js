import { listProjects, getProjectDetails } from './projectsService.js';
import { listProperties } from './propertiesService.js';
import { listProjectPlots } from './plotsService.js';

const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const MODEL = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 12;
const AI_TIMEOUT_MS = 15000;

const SYSTEM_PROMPT = `You are the VR Real Estate AI Assistant for the VR Real Estates website.
Answer using only the verified real-estate data supplied in the context and the conversation.
Never invent prices, availability, dimensions, locations, amenities, RERA information, approvals, returns, or property details.
If the supplied data does not contain an answer, say that the information is not available and, when useful, suggest contacting VR Real Estate or booking a site visit.
Availability claims must reflect the supplied current inventory only.
Do not make legal, financial, investment-return, approval, title, or guaranteed-outcome claims.
You may explain general real-estate concepts briefly, but redirect unrelated questions toward VR Real Estate topics.
The source contains local SVG/project coordinates for the master plan; never describe them as latitude/longitude.
When discussing P18, preserve its source identifiers exactly if relevant: property code P18, source id P18, source number P118.
When a visitor expresses buying or site-visit intent, naturally suggest the site's existing site-visit/contact option without claiming that a booking has been completed.`;

function sanitizeHistory(conversation) {
  if (!Array.isArray(conversation)) return [];
  return conversation
    .filter((item) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
    .slice(-MAX_HISTORY_MESSAGES)
    .map((item) => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.content.slice(0, MAX_MESSAGE_LENGTH) }]
    }));
}

function compactContext(projects, details, properties, plots) {
  return JSON.stringify({
    projects,
    project_details: details,
    properties,
    green_meadows_plots: plots
  });
}

async function loadContext() {
  const projects = await listProjects();
  const details = [];
  for (const project of projects) {
    details.push(await getProjectDetails(project.slug));
  }
  const properties = await listProperties();
  const plots = await listProjectPlots('vr-green-meadows');
  return compactContext(projects, details, properties, plots);
}

function extractText(payload) {
  const chunks = [];
  for (const candidate of payload?.candidates || []) {
    for (const part of candidate?.content?.parts || []) {
      if (typeof part?.text === 'string') chunks.push(part.text);
    }
  }
  return chunks.join('\n').trim();
}

function providerErrorDetails(payload) {
  const error = payload?.error && typeof payload.error === 'object' ? payload.error : {};
  return {
    status: typeof error.status === 'string' ? error.status : undefined,
    code: typeof error.code === 'number' || typeof error.code === 'string' ? error.code : undefined,
    message: typeof error.message === 'string' ? error.message : undefined
  };
}

export async function answerAssistant({ message, conversation = [] }) {
  if (typeof message !== 'string' || !message.trim()) {
    return { status: 400, error: { code: 'MESSAGE_REQUIRED', message: 'A message is required.' } };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return { status: 400, error: { code: 'MESSAGE_TOO_LARGE', message: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` } };
  }
  if (!process.env.GEMINI_API_KEY) {
    return { status: 503, error: { code: 'AI_NOT_CONFIGURED', message: 'The AI assistant is not configured yet.' } };
  }

  const context = await loadContext();
  const contents = [
    ...sanitizeHistory(conversation),
    {
      role: 'user',
      parts: [{ text: `Verified VR Real Estate data context:\n${context}\n\nVisitor question:\n${message.trim()}` }]
    }
  ];
  const endpoint = `${GEMINI_API_BASE_URL}/${encodeURIComponent(MODEL)}:generateContent`;

  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'x-goog-api-key': process.env.GEMINI_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents,
        generationConfig: {
          maxOutputTokens: 500
        }
      }),
      signal: AbortSignal.timeout(AI_TIMEOUT_MS)
    });
  } catch (error) {
    const timedOut = error?.name === 'TimeoutError' || error?.name === 'AbortError';
    console.error('[assistant] Gemini provider request failed', {
      timeout: timedOut,
      message: timedOut ? 'Provider request timed out.' : (error?.message || 'Network request failed.'),
      model: MODEL,
      endpoint
    });
    return { status: 502, error: { code: 'AI_PROVIDER_ERROR', message: 'The AI assistant is temporarily unavailable.' } };
  }

  if (!response.ok) {
    let providerPayload = null;
    try {
      providerPayload = await response.json();
    } catch {
      await response.text().catch(() => '');
    }

    const details = providerErrorDetails(providerPayload);
    console.error('[assistant] Gemini provider request failed', {
      status: response.status,
      type: details.status,
      code: details.code,
      message: details.message,
      model: MODEL,
      endpoint
    });

    return { status: 502, error: { code: 'AI_PROVIDER_ERROR', message: 'The AI assistant is temporarily unavailable.' } };
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    return { status: 502, error: { code: 'AI_INVALID_RESPONSE', message: 'The AI assistant returned an invalid response.' } };
  }

  const reply = extractText(payload);
  if (!reply) {
    console.error('[assistant] Gemini provider returned no text', {
      model: MODEL,
      endpoint
    });
    return { status: 502, error: { code: 'AI_INVALID_RESPONSE', message: 'The AI assistant returned an invalid response.' } };
  }

  return { status: 200, data: { reply } };
}
