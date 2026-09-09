import { answerAssistant } from '../services/assistantService.js';
import { supabaseAdminGet, supabaseAdminPost, supabaseAdminPatch } from '../lib/supabaseAdmin.js';

function textMessage(message) {
  return message?.type === 'text' && typeof message?.text?.body === 'string' ? message.text.body.trim() : '';
}

async function graphSendText(to, body) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const version = process.env.WHATSAPP_GRAPH_VERSION;
  if (!token || !phoneId || !version) throw new Error('WhatsApp Cloud API is not configured.');
  const response = await fetch(`https://graph.facebook.com/${version}/${phoneId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body } })
  });
  if (!response.ok) throw new Error(`WhatsApp send failed: ${response.status} ${await response.text().catch(() => '')}`);
  return response.json();
}

async function findOrCreateLead(phone, profileName) {
  const existing = await supabaseAdminGet('leads', { select: 'id,name,phone,email,source,status,notes', phone: `eq.${phone}`, limit: '1' });
  if (existing[0]) {
    if (!existing[0].name && profileName) return (await supabaseAdminPatch('leads', { id: `eq.${existing[0].id}` }, { name: profileName, updated_at: new Date().toISOString() }))[0];
    return existing[0];
  }
  return (await supabaseAdminPost('leads', {
    name: profileName || null,
    phone,
    source: 'whatsapp',
    status: 'new',
    notes: 'Created automatically from WhatsApp.'
  }))[0];
}

async function findOrCreateConversation(phone, leadId) {
  const existing = await supabaseAdminGet('whatsapp_conversations', { select: 'id,lead_id,phone,status,ai_enabled', phone: `eq.${phone}`, limit: '1' });
  if (existing[0]) return existing[0];
  return (await supabaseAdminPost('whatsapp_conversations', { phone, lead_id: leadId, status: 'open', ai_enabled: true }))[0];
}

async function conversationHistory(conversationId) {
  const rows = await supabaseAdminGet('whatsapp_messages', {
    select: 'direction,body,created_at',
    conversation_id: `eq.${conversationId}`,
    order: 'created_at.desc',
    limit: '12'
  });
  return rows.reverse().filter((row) => row.body).map((row) => ({ role: row.direction === 'outbound' ? 'assistant' : 'user', content: row.body }));
}

export async function handleWhatsApp(req, pathParts, searchParams, body = {}) {
  if (req.method === 'GET' && pathParts[2] === 'webhook') {
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');
    if (mode === 'subscribe' && token && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      return { status: 200, raw: challenge || '' };
    }
    return { status: 403, error: { code: 'WEBHOOK_VERIFY_FAILED', message: 'Webhook verification failed.' } };
  }

  if (req.method !== 'POST' || pathParts[2] !== 'webhook') return null;
  const entries = Array.isArray(body.entry) ? body.entry : [];
  for (const entry of entries) {
    for (const change of entry.changes || []) {
      const value = change.value || {};
      for (const message of value.messages || []) {
        const phone = message.from;
        const text = textMessage(message);
        if (!phone || !text || !message.id) continue;
        const profileName = value.contacts?.[0]?.profile?.name || '';
        const lead = await findOrCreateLead(phone, profileName);
        const conversation = await findOrCreateConversation(phone, lead.id);
        const duplicate = await supabaseAdminGet('whatsapp_messages', { select: 'id', whatsapp_message_id: `eq.${message.id}`, limit: '1' });
        if (duplicate[0]) continue;
        await supabaseAdminPost('whatsapp_messages', {
          conversation_id: conversation.id,
          whatsapp_message_id: message.id,
          direction: 'inbound',
          message_type: 'text',
          body: text,
          raw_payload: message
        });
        await supabaseAdminPatch('whatsapp_conversations', { id: `eq.${conversation.id}` }, { lead_id: lead.id, last_message_at: new Date().toISOString(), updated_at: new Date().toISOString() });

        if (conversation.ai_enabled !== false) {
          const history = await conversationHistory(conversation.id);
          const result = await answerAssistant({ message: text, conversation: history });
          const reply = result.status === 200 ? result.data.reply : 'Thanks for reaching out to VR Real Estates. Our team will get back to you shortly.';
          await graphSendText(phone, reply);
          await supabaseAdminPost('whatsapp_messages', {
            conversation_id: conversation.id,
            direction: 'outbound',
            message_type: 'text',
            body: reply
          });
          await supabaseAdminPatch('whatsapp_conversations', { id: `eq.${conversation.id}` }, { last_message_at: new Date().toISOString(), updated_at: new Date().toISOString() });
        }
      }
    }
  }
  return { status: 200, data: { received: true } };
}
