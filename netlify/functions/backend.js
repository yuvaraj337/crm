import { router } from '../../api/server.js';

function decodeBody(event) {
  if (!event.body) return '';
  if (event.isBase64Encoded) return Buffer.from(event.body, 'base64').toString('utf8');
  return event.body;
}

function requestUrl(event) {
  let pathname = event.path || '/';
  pathname = pathname.replace(/^\/.netlify\/functions\/api/, '') || '/';
  if (!pathname.startsWith('/api/')) {
    pathname = pathname === '/api' ? '/api' : `/api${pathname.startsWith('/') ? '' : '/'}${pathname}`;
  }
  const params = new URLSearchParams(event.queryStringParameters || {});
  const query = params.toString();
  return `${pathname}${query ? `?${query}` : ''}`;
}

function createResponse() {
  const headers = new Map();
  let resolveResponse;
  const promise = new Promise((resolve) => { resolveResponse = resolve; });

  const res = {
    statusCode: 200,
    setHeader(name, value) { headers.set(String(name).toLowerCase(), String(value)); },
    getHeader(name) { return headers.get(String(name).toLowerCase()); },
    end(body = '') {
      resolveResponse({
        statusCode: this.statusCode || 200,
        headers: Object.fromEntries(headers),
        body: String(body ?? '')
      });
    }
  };

  return { res, promise };
}

export async function handler(event) {
  const headers = Object.fromEntries(
    Object.entries(event.headers || {}).map(([key, value]) => [key.toLowerCase(), value])
  );

  // The browser calls /api/* from the same Netlify origin. The shared router
  // uses an allow-list for CORS, so allow the current request origin only when
  // it matches the host serving the request (including custom Netlify domains).
  const requestOrigin = headers.origin || '';
  const host = headers.host || event.headers?.Host || '';
  if (requestOrigin && host) {
    try {
      const originUrl = new URL(requestOrigin);
      if (originUrl.host === host) {
        process.env.CORS_ORIGIN = process.env.CORS_ORIGIN
          ? `${process.env.CORS_ORIGIN},${requestOrigin}`
          : requestOrigin;
      }
    } catch {
      // Leave the router's normal CORS validation in place.
    }
  }

  const req = {
    method: event.httpMethod || event.requestContext?.http?.method || 'GET',
    headers,
    url: requestUrl(event),
    body: decodeBody(event)
  };

  const { res, promise } = createResponse();

  try {
    await router(req, res);
    return await promise;
  } catch (error) {
    console.error('[netlify-api]', error?.message || error);
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' } })
    };
  }
}
