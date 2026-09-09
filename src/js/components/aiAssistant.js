import { api } from '../api/client.js';
import '../../styles/aiAssistant.css';

const MAX_MESSAGE_LENGTH = 2000;

let initialized = false;
let conversation = [];

function appendInlineFormattedText(parent, text) {
  const pattern = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parent.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }
    const strong = document.createElement('strong');
    strong.textContent = match[1];
    parent.appendChild(strong);
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parent.appendChild(document.createTextNode(text.slice(lastIndex)));
  }
}

function createMessage(role, content) {
  const item = document.createElement('div');
  item.className = `vr-ai-message vr-ai-message--${role}`;
  item.setAttribute('role', 'listitem');

  if (role !== 'assistant') {
    item.textContent = content;
    return item;
  }

  const lines = String(content).split(/\r?\n/);
  let currentList = null;

  lines.forEach((line, index) => {
    const bulletMatch = line.match(/^\s*[\-*]\s+(.+)$/);

    if (bulletMatch) {
      if (!currentList) {
        currentList = document.createElement('ul');
        item.appendChild(currentList);
      }
      const li = document.createElement('li');
      appendInlineFormattedText(li, bulletMatch[1]);
      currentList.appendChild(li);
      return;
    }

    currentList = null;
    if (index > 0) item.appendChild(document.createElement('br'));
    appendInlineFormattedText(item, line);
  });

  return item;
}

function renderMessage(list, role, content) {
  const message = createMessage(role, content);
  list.appendChild(message);
  list.scrollTop = list.scrollHeight;
  return message;
}

function setOpen(panel, button, open) {
  panel.hidden = !open;
  button.setAttribute('aria-expanded', String(open));

  if (open) {
    document.getElementById('vr-ai-message-input')?.focus();
  }
}

export function initAiAssistant() {
  if (initialized || document.getElementById('vr-ai-assistant')) return;

  initialized = true;
  const root = document.createElement('div');
  root.id = 'vr-ai-assistant';

  root.innerHTML = `
    <button class="vr-ai-launcher" type="button" aria-label="Open VR Real Estate AI Assistant" aria-expanded="false" aria-controls="vr-ai-panel">
      <span class="vr-ai-launcher-icon" aria-hidden="true">✦</span>
      <span class="vr-ai-launcher-label">Ask AI</span>
    </button>

    <section class="vr-ai-panel" id="vr-ai-panel" hidden aria-label="VR Real Estate AI Assistant">
      <header class="vr-ai-header">
        <div>
          <p class="vr-ai-eyebrow">VR REAL ESTATES</p>
          <h2>AI Assistant</h2>
        </div>
        <button class="vr-ai-close" type="button" aria-label="Close AI Assistant">&times;</button>
      </header>

      <div class="vr-ai-messages" id="vr-ai-messages" role="list" aria-live="polite">
        <div class="vr-ai-message vr-ai-message--assistant" role="listitem">
          Hello! I can help you explore VR Real Estate projects, plots, amenities and property details.
        </div>
      </div>

      <div class="vr-ai-actions">
        <button type="button" class="vr-ai-visit">Book a free site visit</button>
      </div>

      <form class="vr-ai-form" id="vr-ai-form">
        <label class="vr-ai-sr-only" for="vr-ai-message-input">Your question</label>
        <textarea id="vr-ai-message-input" rows="1" maxlength="2000" placeholder="Ask about projects or plots..." autocomplete="off"></textarea>
        <button class="vr-ai-send" type="submit" aria-label="Send message">Send</button>
      </form>

      <p class="vr-ai-disclaimer">Information is based on the verified website data available to the assistant.</p>
    </section>
  `;

  document.body.appendChild(root);

  const launcher = root.querySelector('.vr-ai-launcher');
  const panel = root.querySelector('.vr-ai-panel');
  const close = root.querySelector('.vr-ai-close');
  const form = root.querySelector('#vr-ai-form');
  const input = root.querySelector('#vr-ai-message-input');
  const messages = root.querySelector('#vr-ai-messages');
  const send = root.querySelector('.vr-ai-send');
  const visit = root.querySelector('.vr-ai-visit');

  launcher.addEventListener('click', () => setOpen(panel, launcher, panel.hidden));
  close.addEventListener('click', () => setOpen(panel, launcher, false));

  visit.addEventListener('click', () => {
    if (typeof window.openSiteVisitModal === 'function') window.openSiteVisitModal('VR Real Estate');
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = input.value.trim();

    if (!message || message.length > MAX_MESSAGE_LENGTH || send.disabled) return;

    renderMessage(messages, 'user', message);
    input.value = '';
    send.disabled = true;
    input.disabled = true;

    const typing = renderMessage(messages, 'assistant', 'Thinking…');
    typing.classList.add('vr-ai-message--typing');

    try {
      const result = await api.askAssistant(message, conversation);
      typing.remove();

      const reply = result?.reply || 'I could not find an answer in the available project data.';
      renderMessage(messages, 'assistant', reply);

      conversation.push(
        { role: 'user', content: message },
        { role: 'assistant', content: reply }
      );
      conversation = conversation.slice(-12);
    } catch (error) {
      typing.remove();
      renderMessage(
        messages,
        'assistant',
        error?.message || 'The assistant is temporarily unavailable. Please try again or contact VR Real Estate.'
      );
    } finally {
      send.disabled = false;
      input.disabled = false;
      input.focus();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAiAssistant);
} else {
  initAiAssistant();
}
