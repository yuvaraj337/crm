export function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: #10b981;">&#10004;</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

export function openSiteVisitModal(propertyTitle = 'Property') {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay" id="site-visit-modal-overlay">
      <div class="modal-card">
        <button class="modal-close-btn" onclick="window.closeModal()">&times;</button>
        <h3 class="modal-title">Book Free Site Visit</h3>
        <p class="modal-subtitle">Schedule a guided site visit for <strong>${propertyTitle}</strong>. We arrange free transport from pickup points.</p>
        
        <form id="site-visit-form" class="enquiry-form-body">
          <div class="form-group">
            <input type="text" id="modal-name" placeholder="Your Name *" required />
          </div>
          <div class="form-group">
            <input type="tel" id="modal-phone" placeholder="Mobile Number *" required />
          </div>
          <div class="form-group">
            <select id="modal-time-slot" required>
              <option value="" disabled selected>Preferred Visit Day</option>
              <option value="This Saturday">This Saturday</option>
              <option value="This Sunday">This Sunday</option>
              <option value="Next Weekend">Next Weekend</option>
              <option value="Weekday by Appointment">Weekday by Appointment</option>
            </select>
          </div>
          <div class="form-group">
            <select id="modal-pickup">
              <option value="Self Drive">Self Vehicle (Meet at Site)</option>
              <option value="Cab Pickup">Request Company Pickup (Hyderabad)</option>
            </select>
          </div>
          <button type="submit" class="btn-send-enquiry">
            Confirm Free Site Visit
          </button>
        </form>
      </div>
    </div>
  `;

  const overlay = document.getElementById('site-visit-modal-overlay');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      window.closeModal();
    }
  });

  const form = document.getElementById('site-visit-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('modal-name').value;
    window.closeModal();
    showToast(`Thank you, ${name}! Your site visit request has been scheduled.`);
  });
}

export function openShareModal(propertyTitle = 'Amodha') {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const currentUrl = window.location.href;

  modalContainer.innerHTML = `
    <div class="modal-overlay" id="share-modal-overlay">
      <div class="modal-card">
        <button class="modal-close-btn" onclick="window.closeModal()">&times;</button>
        <h3 class="modal-title">Share Property</h3>
        <p class="modal-subtitle">Share <strong>${propertyTitle}</strong> with friends or family.</p>
        
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
          <input type="text" value="${currentUrl}" readonly id="share-link-input" style="flex: 1; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px;" />
          <button class="callout-btn" onclick="window.copyShareLink()">Copy</button>
        </div>

        <a href="https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this property: ' + propertyTitle + ' - ' + currentUrl)}" target="_blank" class="btn-whatsapp-enquiry" style="text-decoration: none;">
          Share via WhatsApp
        </a>
      </div>
    </div>
  `;

  const overlay = document.getElementById('share-modal-overlay');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      window.closeModal();
    }
  });
}

// Window globals for inline onclicks
window.closeModal = function() {
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) modalContainer.innerHTML = '';
};

window.openSiteVisitModal = openSiteVisitModal;
window.openShareModal = openShareModal;

window.copyShareLink = function() {
  const input = document.getElementById('share-link-input');
  if (input) {
    input.select();
    navigator.clipboard.writeText(input.value);
    showToast('Link copied to clipboard!');
  }
};
