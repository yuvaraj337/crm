import { supabaseAdminGet, supabaseAdminPatch, supabaseAdminPost } from '../lib/supabaseAdmin.js';

const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'site_visit', 'negotiation', 'won', 'lost'];
const INVENTORY_STATUSES = ['AVAILABLE', 'RESERVED', 'BOOKED', 'SOLD'];
const VISIT_STATUSES = ['REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'RESCHEDULED'];
const BOOKING_STATUSES = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];

const unauthorized = () => ({ status: 401, error: { code: 'CRM_UNAUTHORIZED', message: 'CRM access is not authorized.' } });
const clean = (v) => typeof v === 'string' ? v.trim() : '';
const bad = (message, code = 'BAD_REQUEST') => ({ status: 400, error: { code, message } });
const iso = (v) => { if (!v) return null; const d = new Date(v); return Number.isNaN(d.getTime()) ? null : d.toISOString(); };
const dateLabel = (v) => { const d = new Date(v); return Number.isNaN(d.getTime()) ? 'the requested time' : d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }); };
function authorized(req) { const key = process.env.CRM_ACCESS_KEY; return Boolean(key) && req.headers['x-crm-key'] === key; }

async function sendWhatsApp(to, body) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const version = process.env.WHATSAPP_GRAPH_VERSION;
  if (!token || !phoneId || !version) throw new Error('WhatsApp Cloud API is not configured.');
  const response = await fetch(`https://graph.facebook.com/${version}/${phoneId}/messages`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body } })
  });
  if (!response.ok) throw new Error(`WhatsApp send failed: ${response.status}`);
  return response.json();
}
async function writeOutbound(conversation, body) {
  const raw = await sendWhatsApp(conversation.phone, body);
  await supabaseAdminPost('whatsapp_messages', { conversation_id: conversation.id, direction: 'outbound', message_type: 'text', body, raw_payload: raw });
  await supabaseAdminPatch('whatsapp_conversations', { id: `eq.${conversation.id}` }, { last_message_at: new Date().toISOString(), updated_at: new Date().toISOString() });
}
async function leadById(id) {
  const rows = await supabaseAdminGet('leads', { select: 'id,name,phone,email,source,status,notes,created_at,updated_at', id: `eq.${id}`, limit: '1' });
  return rows[0] || null;
}
async function propertyById(id) {
  const rows = await supabaseAdminGet('properties', { select: 'id,project_id,property_code,title,property_type,inventory_status,area,area_unit,price,currency,metadata,projects(name,slug)', id: `eq.${id}`, limit: '1' });
  return rows[0] || null;
}
async function inventoryUpdate(id, next, reason = '') {
  next = clean(next).toUpperCase();
  if (!INVENTORY_STATUSES.includes(next)) return bad(`Invalid inventory status. Allowed values: ${INVENTORY_STATUSES.join(', ')}`, 'INVALID_INVENTORY_STATUS');
  const property = await propertyById(id);
  if (!property) return { status: 404, error: { code: 'PROPERTY_NOT_FOUND', message: 'Property not found.' } };
  const current = property.inventory_status;
  if (current === next) return { status: 200, data: { property } };
  const allowed = { AVAILABLE: ['RESERVED'], RESERVED: ['AVAILABLE', 'BOOKED'], BOOKED: ['AVAILABLE', 'SOLD'], SOLD: [] };
  if (!allowed[current]?.includes(next)) return bad(`Invalid inventory transition: ${current} → ${next}.`, 'INVALID_INVENTORY_TRANSITION');
  const rows = await supabaseAdminPatch('properties', { id: `eq.${id}`, inventory_status: `eq.${current}` }, { inventory_status: next, updated_at: new Date().toISOString() });
  if (!rows[0]) return { status: 409, error: { code: 'INVENTORY_CHANGED', message: 'Inventory changed before this action completed. Refresh and try again.' } };
  await supabaseAdminPost('inventory_status_history', { property_id: id, from_status: current, to_status: next, reason: clean(reason) || 'CRM inventory update' }).catch((e) => console.error('[crm] history', e?.message || e));
  return { status: 200, data: { property: rows[0] } };
}

export async function handleCrm(req, pathParts, searchParams, body = {}) {
  if (!authorized(req)) return unauthorized();
  const section = pathParts[2]; const id = pathParts[3];

  if (req.method === 'GET' && section === 'summary') {
    const [leads, conversations, visits, properties, bookings] = await Promise.all([
      supabaseAdminGet('leads', { select: 'id,status,source,created_at', limit: '5000' }),
      supabaseAdminGet('whatsapp_conversations', { select: 'id,status,ai_enabled,last_message_at', limit: '2000' }),
      supabaseAdminGet('site_visits', { select: 'id,status,scheduled_at,requested_at', limit: '2000' }),
      supabaseAdminGet('properties', { select: 'id,inventory_status', limit: '5000' }),
      supabaseAdminGet('bookings', { select: 'id,status,created_at', limit: '2000' })
    ]);
    return { status: 200, data: {
      totalLeads: leads.length, newLeads: leads.filter(x => (x.status || 'new') === 'new').length,
      qualifiedLeads: leads.filter(x => x.status === 'qualified').length,
      openConversations: conversations.filter(x => x.status === 'open').length,
      siteVisitRequests: visits.filter(x => x.status === 'REQUESTED').length,
      confirmedVisits: visits.filter(x => x.status === 'CONFIRMED').length,
      inventory: Object.fromEntries(INVENTORY_STATUSES.map(s => [s.toLowerCase(), properties.filter(x => x.inventory_status === s).length])),
      bookings: bookings.length,
      bookingStatus: Object.fromEntries(BOOKING_STATUSES.map(s => [s, bookings.filter(x => x.status === s).length]))
    } };
  }

  if (req.method === 'GET' && section === 'leads') {
    if (id) {
      const lead = await leadById(id); if (!lead) return { status: 404, error: { code: 'LEAD_NOT_FOUND', message: 'Lead not found.' } };
      const [interests, visits, conversations, bookings] = await Promise.all([
        supabaseAdminGet('lead_properties', { select: 'lead_id,property_id,interest_type,notes,created_at,properties(id,property_code,title,inventory_status,project_id,projects(name,slug))', lead_id: `eq.${id}`, order: 'created_at.desc' }),
        supabaseAdminGet('site_visits', { select: 'id,property_id,requested_at,scheduled_at,status,confirmed_at,completed_at,cancelled_at,notes,properties(property_code,title,project_id,projects(name,slug))', lead_id: `eq.${id}`, order: 'requested_at.desc' }),
        supabaseAdminGet('whatsapp_conversations', { select: 'id,phone,status,ai_enabled,last_message_at,created_at', lead_id: `eq.${id}`, order: 'last_message_at.desc.nullslast' }),
        supabaseAdminGet('bookings', { select: 'id,property_id,status,booking_reference,amount,currency,booked_at,confirmed_at,cancelled_at,notes,properties(property_code,title,inventory_status)', lead_id: `eq.${id}`, order: 'created_at.desc' })
      ]);
      return { status: 200, data: { lead, interests, visits, conversations, bookings } };
    }
    const status = clean(searchParams.get('status')).toLowerCase(); const q = clean(searchParams.get('q')).toLowerCase();
    const params = { select: 'id,name,phone,email,source,status,notes,created_at,updated_at', order: 'created_at.desc', limit: '500' };
    if (status && status !== 'all') params.status = `eq.${status}`;
    let leads = await supabaseAdminGet('leads', params);
    if (q) leads = leads.filter(x => [x.name, x.phone, x.email, x.source].some(v => String(v || '').toLowerCase().includes(q)));
    return { status: 200, data: { leads } };
  }

  if (req.method === 'POST' && section === 'leads') {
    const name = clean(body.name), phone = clean(body.phone), email = clean(body.email);
    if (!name && !phone) return bad('Lead name or phone is required.', 'LEAD_CONTACT_REQUIRED');
    if (phone) { const existing = await supabaseAdminGet('leads', { select: 'id,name,phone,email,source,status,notes,created_at,updated_at', phone: `eq.${phone}`, limit: '1' }); if (existing[0]) return { status: 200, data: { lead: existing[0], existing: true } }; }
    const status = clean(body.status).toLowerCase();
    const rows = await supabaseAdminPost('leads', { name: name || null, phone: phone || null, email: email || null, source: clean(body.source) || 'crm', status: LEAD_STATUSES.includes(status) ? status : 'new', notes: clean(body.notes) || null });
    return { status: 201, data: { lead: rows[0] || null, existing: false } };
  }
  if (req.method === 'PATCH' && section === 'leads' && id) {
    const update = {};
    if (typeof body.name === 'string') update.name = clean(body.name) || null;
    if (typeof body.email === 'string') update.email = clean(body.email) || null;
    if (typeof body.notes === 'string') update.notes = clean(body.notes) || null;
    if (typeof body.status === 'string') { const status = clean(body.status).toLowerCase(); if (!LEAD_STATUSES.includes(status)) return bad('Invalid lead status.', 'INVALID_LEAD_STATUS'); update.status = status; }
    if (!Object.keys(update).length) return bad('No editable lead fields were supplied.', 'NO_FIELDS');
    update.updated_at = new Date().toISOString(); const rows = await supabaseAdminPatch('leads', { id: `eq.${id}` }, update);
    if (!rows[0]) return { status: 404, error: { code: 'LEAD_NOT_FOUND', message: 'Lead not found.' } };
    return { status: 200, data: { lead: rows[0] } };
  }

  if (req.method === 'GET' && section === 'conversations') {
    const params = { select: 'id,lead_id,phone,status,ai_enabled,last_message_at,created_at,leads(id,name,email,phone,status,notes)', order: 'last_message_at.desc.nullslast', limit: '300' };
    if (id) params.id = `eq.${id}`;
    const conversations = await supabaseAdminGet('whatsapp_conversations', params);
    if (id && !conversations[0]) return { status: 404, error: { code: 'CONVERSATION_NOT_FOUND', message: 'Conversation not found.' } };
    return id ? { status: 200, data: { conversation: conversations[0] } } : { status: 200, data: { conversations } };
  }
  if (req.method === 'PATCH' && section === 'conversations' && id) {
    const update = {}; if (typeof body.ai_enabled === 'boolean') update.ai_enabled = body.ai_enabled;
    if (typeof body.status === 'string') { const status = clean(body.status).toLowerCase(); if (!['open','closed'].includes(status)) return bad('Conversation status must be open or closed.', 'INVALID_CONVERSATION_STATUS'); update.status = status; }
    if (!Object.keys(update).length) return bad('No conversation fields were supplied.', 'NO_FIELDS');
    update.updated_at = new Date().toISOString(); const rows = await supabaseAdminPatch('whatsapp_conversations', { id: `eq.${id}` }, update);
    if (!rows[0]) return { status: 404, error: { code: 'CONVERSATION_NOT_FOUND', message: 'Conversation not found.' } };
    return { status: 200, data: { conversation: rows[0] } };
  }
  if (req.method === 'GET' && section === 'messages' && id) return { status: 200, data: { messages: await supabaseAdminGet('whatsapp_messages', { select: 'id,direction,message_type,body,created_at', conversation_id: `eq.${id}`, order: 'created_at.asc', limit: '500' }) } };
  if (req.method === 'POST' && section === 'messages' && id) {
    const text = clean(body.body); if (!text) return bad('Message text is required.', 'MESSAGE_REQUIRED');
    const rows = await supabaseAdminGet('whatsapp_conversations', { select: 'id,phone,status,ai_enabled', id: `eq.${id}`, limit: '1' }); if (!rows[0]) return { status: 404, error: { code: 'CONVERSATION_NOT_FOUND', message: 'Conversation not found.' } };
    await writeOutbound(rows[0], text); return { status: 201, data: { sent: true } };
  }

  if (req.method === 'GET' && section === 'site-visits') {
    const status = clean(searchParams.get('status')).toUpperCase(); const params = { select: 'id,lead_id,property_id,requested_at,scheduled_at,status,confirmed_at,completed_at,cancelled_at,notes,created_at,updated_at,leads(id,name,phone,email,status),properties(id,property_code,title,inventory_status,project_id,projects(name,slug))', order: 'requested_at.desc.nullslast', limit: '500' };
    if (status && status !== 'ALL') params.status = `eq.${status}`;
    return { status: 200, data: { visits: await supabaseAdminGet('site_visits', params) } };
  }
  if (req.method === 'POST' && section === 'site-visits') {
    const leadId = clean(body.lead_id), propertyId = clean(body.property_id), scheduledAt = body.scheduled_at ? iso(body.scheduled_at) : null;
    if (!leadId || !propertyId) return bad('Lead and property are required.', 'SITE_VISIT_FIELDS_REQUIRED');
    if (body.scheduled_at && !scheduledAt) return bad('scheduled_at must be a valid date/time.', 'INVALID_SCHEDULE');
    if (!await leadById(leadId) || !await propertyById(propertyId)) return bad('Lead or property was not found.', 'SITE_VISIT_REFERENCE_NOT_FOUND');
    const rows = await supabaseAdminPost('site_visits', { lead_id: leadId, property_id: propertyId, requested_at: new Date().toISOString(), scheduled_at: scheduledAt, status: 'REQUESTED', notes: clean(body.notes) || null });
    await supabaseAdminPatch('leads', { id: `eq.${leadId}` }, { status: 'site_visit', updated_at: new Date().toISOString() });
    return { status: 201, data: { visit: rows[0] || null } };
  }
  if (req.method === 'PATCH' && section === 'site-visits' && id) {
    const rows = await supabaseAdminGet('site_visits', { select: 'id,lead_id,property_id,requested_at,scheduled_at,status,confirmed_at,completed_at,cancelled_at,notes,leads(name,phone),properties(property_code,title)', id: `eq.${id}`, limit: '1' });
    const visit = rows[0]; if (!visit) return { status: 404, error: { code: 'SITE_VISIT_NOT_FOUND', message: 'Site visit not found.' } };
    const next = clean(body.status).toUpperCase(); if (!VISIT_STATUSES.includes(next)) return bad('Invalid site visit status.', 'INVALID_SITE_VISIT_STATUS');
    const transitions = { REQUESTED: ['CONFIRMED','CANCELLED','RESCHEDULED'], CONFIRMED: ['COMPLETED','CANCELLED','RESCHEDULED','NO_SHOW'], RESCHEDULED: ['CONFIRMED','CANCELLED'], COMPLETED: [], CANCELLED: [], NO_SHOW: [] };
    if (visit.status !== next && !transitions[visit.status]?.includes(next)) return bad(`Invalid site visit transition: ${visit.status} → ${next}.`, 'INVALID_SITE_VISIT_TRANSITION');
    const scheduledAt = body.scheduled_at !== undefined ? iso(body.scheduled_at) : visit.scheduled_at;
    if (body.scheduled_at && !scheduledAt) return bad('scheduled_at must be a valid date/time.', 'INVALID_SCHEDULE');
    if (next === 'CONFIRMED' && !scheduledAt) return bad('A confirmed site visit needs a scheduled date and time.', 'SCHEDULE_REQUIRED');
    if (next === 'CONFIRMED') {
      const conversations = await supabaseAdminGet('whatsapp_conversations', { select: 'id,phone,status', lead_id: `eq.${visit.lead_id}`, order: 'last_message_at.desc.nullslast', limit: '1' });
      if (!conversations[0]) return { status: 409, error: { code: 'NO_WHATSAPP_CONVERSATION', message: 'Cannot confirm this visit because the lead has no WhatsApp conversation.' } };
      try { await writeOutbound(conversations[0], `Your site visit for ${visit.properties?.title || visit.properties?.property_code || 'the selected property'} is confirmed for ${dateLabel(scheduledAt)}. We look forward to seeing you.`); } catch (e) { return { status: 502, error: { code: 'WHATSAPP_CONFIRMATION_FAILED', message: e?.message || 'WhatsApp confirmation failed.' } }; }
    }
    const update = { status: next, scheduled_at: scheduledAt, notes: body.notes !== undefined ? clean(body.notes) || null : visit.notes, updated_at: new Date().toISOString() };
    if (next === 'CONFIRMED') update.confirmed_at = new Date().toISOString(); if (next === 'COMPLETED') update.completed_at = new Date().toISOString(); if (next === 'CANCELLED') update.cancelled_at = new Date().toISOString();
    const updated = await supabaseAdminPatch('site_visits', { id: `eq.${id}`, status: `eq.${visit.status}` }, update); if (!updated[0]) return { status: 409, error: { code: 'SITE_VISIT_CHANGED', message: 'This visit changed before your action completed. Refresh and try again.' } };
    return { status: 200, data: { visit: updated[0], confirmation_sent: next === 'CONFIRMED' } };
  }

  if (req.method === 'GET' && section === 'inventory') {
    const status = clean(searchParams.get('status')).toUpperCase(); const type = clean(searchParams.get('type')).toUpperCase(); const project = clean(searchParams.get('project'));
    const params = { select: 'id,project_id,property_code,title,property_type,inventory_status,area,area_unit,price,currency,metadata,created_at,updated_at,projects(name,slug)', order: 'property_code.asc', limit: '1000' };
    if (status && status !== 'ALL') params.inventory_status = `eq.${status}`; if (type && type !== 'ALL') params.property_type = `eq.${type}`; if (project) params.project_id = `eq.${project}`;
    return { status: 200, data: { properties: await supabaseAdminGet('properties', params) } };
  }
  if (req.method === 'PATCH' && section === 'inventory' && id) return inventoryUpdate(id, body.status, body.reason);

  if (req.method === 'GET' && section === 'bookings') {
    const status = clean(searchParams.get('status')).toUpperCase(); const params = { select: 'id,lead_id,property_id,status,booking_reference,amount,currency,booked_at,confirmed_at,cancelled_at,cancellation_reason,notes,created_at,updated_at,leads(id,name,phone,email,status),properties(id,property_code,title,inventory_status,projects(name,slug))', order: 'created_at.desc', limit: '500' };
    if (status && status !== 'ALL') params.status = `eq.${status}`; return { status: 200, data: { bookings: await supabaseAdminGet('bookings', params) } };
  }
  if (req.method === 'POST' && section === 'bookings') {
    const leadId = clean(body.lead_id), propertyId = clean(body.property_id); if (!leadId || !propertyId) return bad('Lead and property are required.', 'BOOKING_FIELDS_REQUIRED');
    const property = await propertyById(propertyId); if (!property) return { status: 404, error: { code: 'PROPERTY_NOT_FOUND', message: 'Property not found.' } }; if (!await leadById(leadId)) return { status: 404, error: { code: 'LEAD_NOT_FOUND', message: 'Lead not found.' } };
    if (property.inventory_status !== 'AVAILABLE') return { status: 409, error: { code: 'PROPERTY_NOT_AVAILABLE', message: `Property ${property.property_code} is ${property.inventory_status}.` } };
    const reserve = await inventoryUpdate(propertyId, 'RESERVED', 'CRM reservation'); if (reserve.status !== 200) return reserve;
    try { const rows = await supabaseAdminPost('bookings', { lead_id: leadId, property_id: propertyId, status: 'PENDING', booking_reference: clean(body.booking_reference) || null, amount: body.amount ?? null, currency: clean(body.currency) || 'INR', notes: clean(body.notes) || null }); return { status: 201, data: { booking: rows[0] || null } }; }
    catch (e) { await inventoryUpdate(propertyId, 'AVAILABLE', 'Rollback after booking insert failure'); throw e; }
  }
  if (req.method === 'PATCH' && section === 'bookings' && id) {
    const rows = await supabaseAdminGet('bookings', { select: 'id,lead_id,property_id,status,booking_reference,amount,currency,booked_at,confirmed_at,cancelled_at,notes', id: `eq.${id}`, limit: '1' }); const booking = rows[0];
    if (!booking) return { status: 404, error: { code: 'BOOKING_NOT_FOUND', message: 'Booking not found.' } };
    const next = clean(body.status).toUpperCase(); if (!BOOKING_STATUSES.includes(next)) return bad('Invalid booking status.', 'INVALID_BOOKING_STATUS');
    const allowed = { PENDING: ['CONFIRMED','CANCELLED'], CONFIRMED: ['COMPLETED','CANCELLED'], COMPLETED: [], CANCELLED: [] }; if (booking.status !== next && !allowed[booking.status]?.includes(next)) return bad(`Invalid booking transition: ${booking.status} → ${next}.`, 'INVALID_BOOKING_TRANSITION');
    if (next === 'CONFIRMED') { const result = await inventoryUpdate(booking.property_id, 'BOOKED', 'Booking confirmed'); if (result.status !== 200) return result; }
    if (next === 'CANCELLED') { const property = await propertyById(booking.property_id); if (property?.inventory_status === 'BOOKED' || property?.inventory_status === 'RESERVED') { const result = await inventoryUpdate(booking.property_id, 'AVAILABLE', 'Booking cancelled'); if (result.status !== 200) return result; } }
    const update = { status: next, updated_at: new Date().toISOString() }; if (next === 'CONFIRMED') { update.confirmed_at = new Date().toISOString(); update.booked_at = new Date().toISOString(); } if (next === 'CANCELLED') update.cancelled_at = new Date().toISOString(); if (body.notes !== undefined) update.notes = clean(body.notes) || null;
    const updated = await supabaseAdminPatch('bookings', { id: `eq.${id}`, status: `eq.${booking.status}` }, update); if (!updated[0]) return { status: 409, error: { code: 'BOOKING_CHANGED', message: 'Booking changed before this action completed. Refresh and try again.' } };
    return { status: 200, data: { booking: updated[0] } };
  }
  return null;
}
