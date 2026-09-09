const DEFAULT_API_BASE = '/api';

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE
).replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message, status = 0, code = 'API_ERROR') {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method || 'GET',
    headers: {
      Accept: 'application/json',
      ...(options.body
        ? { 'Content-Type': 'application/json' }
        : {})
    },
    credentials: 'omit',
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  let payload = null;

  try {
    payload = await response.json();
  } catch {
    throw new ApiError(
      'The API returned an invalid response.',
      response.status
    );
  }

  if (!response.ok) {
    throw new ApiError(
      payload?.error?.message || 'The API request failed.',
      response.status,
      payload?.error?.code || 'API_ERROR'
    );
  }

  return payload?.data;
}

export const api = {
  listProjects() {
    return request('/projects');
  },

  getProject(slug) {
    return request(
      `/projects/${encodeURIComponent(slug)}`
    );
  },

  listProperties(filters = {}) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        params.set(key, value);
      }
    }

    const query = params.toString();

    return request(
      `/properties${query ? `?${query}` : ''}`
    );
  },

  getProperty(id) {
    return request(
      `/properties/${encodeURIComponent(id)}`
    );
  },

  getPropertyByCode(propertyCode, project = '') {
    const query = project
      ? `?project=${encodeURIComponent(project)}`
      : '';

    return request(
      `/properties/code/${encodeURIComponent(propertyCode)}${query}`
    );
  },

  getProjectPlots(slug) {
    return request(
      `/projects/${encodeURIComponent(slug)}/plots`
    );
  },

  /**
   * Send a question to the VR Real Estate AI Assistant.
   */
  askAssistant(message, conversation = []) {
    return request('/assistant', {
      method: 'POST',
      body: {
        message,
        conversation
      }
    });
  }
};