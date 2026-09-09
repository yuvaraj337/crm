const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

const REST_URL = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1`;

function headers(extra = {}) {
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...extra
  };
}

export async function supabaseAdminGet(resource, params = {}) {
  const url = new URL(`${REST_URL}/${resource}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  }
  const response = await fetch(url, { headers: headers() });
  if (!response.ok) throw new Error(`Supabase ${response.status}: ${await response.text().catch(() => '')}`);
  return response.json();
}

export async function supabaseAdminPost(resource, payload, prefer = 'return=representation') {
  const response = await fetch(`${REST_URL}/${resource}`, {
    method: 'POST',
    headers: headers({ Prefer: prefer }),
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`Supabase ${response.status}: ${await response.text().catch(() => '')}`);
  return response.json();
}

export async function supabaseAdminPatch(resource, params, payload) {
  const url = new URL(`${REST_URL}/${resource}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  const response = await fetch(url, {
    method: 'PATCH',
    headers: headers({ Prefer: 'return=representation' }),
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`Supabase ${response.status}: ${await response.text().catch(() => '')}`);
  return response.json();
}
