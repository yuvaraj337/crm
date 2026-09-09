// Shared Book Site Visit Flow Component matching Reference Image #3
// Can be opened for any selected unit, apartment, or plot

let currentPropertyContext = null;

export function setSharedProperty(prop) {
  currentPropertyContext = prop;
}

export function getSharedProperty() {
  return currentPropertyContext || {
    id: 'unit-101',
    projectName: 'VR Elite Towers',
    unitName: 'Unit 101 - 3 BHK',
    location: 'Kokapet, Hyderabad',
    price: '₹ 92 Lakhs*',
    priceSub: '(All inclusive)',
    size: '1620 Sq.Ft.',
    facing: 'East Facing',
    beds: '3 Bedrooms',
    baths: '3 Bathrooms',
    balconies: '2 Balconies',
    status: 'Available',
    image: '/images/journey/visit_screen1_living.jpg',
    thumb: '/images/journey/selected_property_thumb.jpg',
    backUrl: '#/apartments'
  };
}

export function openSiteVisitFlow(customProp = null, startScreen = 'form') {
  if (customProp) {
    currentPropertyContext = { ...getSharedProperty(), ...customProp };
  }
  const prop = getSharedProperty();
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  // Render modal wrapper
  modalContainer.innerHTML = `
    <div class="sv-modal-overlay" id="sv-modal-overlay">
      <div class="sv-modal-dialog" id="sv-modal-dialog">
        <!-- Content will be rendered dynamically -->
        <div id="sv-flow-container"></div>
      </div>
    </div>
  `;

  const overlay = document.getElementById('sv-modal-overlay');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeSiteVisitFlow();
    }
  });

  if (startScreen === 'details') {
    renderScreen1Details(prop);
  } else {
    renderScreen2Form(prop);
  }
}

export function closeSiteVisitFlow() {
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) modalContainer.innerHTML = '';
}

// Screen 1: Property Details (from Reference #3)
export function renderScreen1Details(prop) {
  const container = document.getElementById('sv-flow-container');
  if (!container) return;

  container.innerHTML = `
    <div class="sv-screen sv-screen-details">
      <!-- Mobile / Modal Top Header -->
      <div class="sv-top-header">
        <button type="button" class="sv-back-btn" onclick="window.closeSiteVisitFlow()">
          &larr; Back to ${prop.projectName || 'Project'}
        </button>
        <button type="button" class="sv-close-x" onclick="window.closeSiteVisitFlow()">&times;</button>
      </div>

      <!-- Main Property Image Showcase -->
      <div class="sv-hero-image-wrap">
        <img src="${prop.image || '/images/journey/visit_screen1_living.jpg'}" alt="${prop.unitName}" class="sv-hero-image" id="sv-main-view-img" />
        <span class="sv-image-counter">1/5</span>
        <button type="button" class="sv-fav-btn" aria-label="Save Property">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>

      <!-- Thumbnails Carousel Strip -->
      <div class="sv-thumbs-strip">
        <img src="/images/journey/room_living.jpg" class="sv-thumb-img active" onclick="document.getElementById('sv-main-view-img').src=this.src" />
        <img src="/images/journey/room_thumb_1.jpg" class="sv-thumb-img" onclick="document.getElementById('sv-main-view-img').src=this.src" />
        <img src="/images/journey/room_thumb_2.jpg" class="sv-thumb-img" onclick="document.getElementById('sv-main-view-img').src=this.src" />
        <img src="/images/journey/room_thumb_3.jpg" class="sv-thumb-img" onclick="document.getElementById('sv-main-view-img').src=this.src" />
        <img src="/images/journey/room_thumb_4.jpg" class="sv-thumb-img" onclick="document.getElementById('sv-main-view-img').src=this.src" />
      </div>

      <!-- Property Summary -->
      <div class="sv-details-body">
        <div class="sv-unit-header-row">
          <div>
            <h2 class="sv-unit-title">${prop.unitName || 'Unit 101 - 3 BHK'}</h2>
            <div class="sv-unit-loc">${prop.location || 'Kokapet, Hyderabad'}</div>
          </div>
          <span class="sv-badge-available">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            ${prop.status || 'Available'}
          </span>
        </div>

        <!-- Spec Tags Grid -->
        <div class="sv-specs-grid">
          <div class="sv-spec-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>
            <span>${prop.size || '1620 Sq.Ft.'}</span>
          </div>
          <div class="sv-spec-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><polygon points="12 3 14 10 21 12 14 14 12 21 10 14 3 12 10 10 12 3"/></svg>
            <span>${prop.facing || 'East Facing'}</span>
          </div>
          <div class="sv-spec-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20h20M2 14h20M4 10h16a2 2 0 0 1 2 2v2H2v-2a2 2 0 0 1 2-2zM6 4h12v6H6z"/></svg>
            <span>${prop.beds || '3 Bedrooms'}</span>
          </div>
          <div class="sv-spec-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 12h10M5 20h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1a4 4 0 0 0-8 0H9a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/></svg>
            <span>${prop.baths || '3 Bathrooms'}</span>
          </div>
          <div class="sv-spec-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/></svg>
            <span>${prop.balconies || '2 Balconies'}</span>
          </div>
        </div>

        <!-- Price -->
        <div class="sv-price-row">
          <span class="sv-price-val">${prop.price || '₹ 92 Lakhs*'}</span>
          <span class="sv-price-sub">${prop.priceSub || '(All inclusive)'}</span>
        </div>

        <!-- Actions -->
        <div class="sv-action-buttons">
          <button type="button" class="sv-btn-secondary" onclick="window.switchToEnquiry()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span>Send Enquiry</span>
          </button>
          
          <button type="button" class="sv-btn-primary" onclick="window.renderScreen2Form()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Book Site Visit</span>
          </button>

          <a href="https://maps.google.com/?q=${encodeURIComponent(prop.location || 'Kokapet, Hyderabad')}" target="_blank" rel="noopener" class="sv-btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>View on Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

// Screen 2: Book a Site Visit Form (Matching Reference #3)
export function renderScreen2Form(customProp = null) {
  const prop = customProp || getSharedProperty();
  const container = document.getElementById('sv-flow-container');
  if (!container) return;

  const today = new Date();
  const defaultDateStr = today.toISOString().split('T')[0];

  container.innerHTML = `
    <div class="sv-screen sv-screen-form">
      <div class="sv-top-header">
        <button type="button" class="sv-back-btn" onclick="window.closeSiteVisitFlow()">
          &larr; Back
        </button>
        <button type="button" class="sv-close-x" onclick="window.closeSiteVisitFlow()">&times;</button>
      </div>

      <div class="sv-form-wrapper">
        <h2 class="sv-form-title">Book a Site Visit</h2>
        <p class="sv-form-subtitle">
          Share your details and preferred date.<br/>Our team will contact you to confirm the visit.
        </p>

        <!-- Selected Property Card (Preserved across all interactions) -->
        <div class="sv-property-preview-card">
          <div class="sv-prev-label">Selected Property</div>
          <div class="sv-prev-content">
            <img src="${prop.thumb || prop.image || '/images/journey/selected_property_thumb.jpg'}" alt="${prop.projectName}" class="sv-prev-thumb" />
            <div class="sv-prev-info">
              <div class="sv-prev-name">${prop.projectName || 'VR Elite Towers'}</div>
              <div class="sv-prev-unit">${prop.unitName || 'Unit 101 - 3 BHK'}</div>
              <div class="sv-prev-loc">${prop.location || 'Kokapet, Hyderabad'}</div>
              <div class="sv-prev-price">${prop.price || '₹ 92 Lakhs*'}</div>
            </div>
          </div>
        </div>

        <!-- Form Fields with Strict Validation -->
        <form id="sv-booking-form" class="sv-form-body">
          <div class="sv-input-group">
            <label class="sv-label" for="sv-input-name">Full Name *</label>
            <input type="text" id="sv-input-name" class="sv-input" placeholder="Siva Prasad" required />
            <span class="sv-error-msg" id="err-name"></span>
          </div>

          <div class="sv-input-group">
            <label class="sv-label" for="sv-input-mobile">Mobile Number *</label>
            <input type="tel" id="sv-input-mobile" class="sv-input" placeholder="9876543210" maxlength="10" required />
            <span class="sv-error-msg" id="err-mobile"></span>
          </div>

          <div class="sv-input-group">
            <label class="sv-label" for="sv-input-email">Email</label>
            <input type="email" id="sv-input-email" class="sv-input" placeholder="siva@example.com" />
            <span class="sv-error-msg" id="err-email"></span>
          </div>

          <div class="sv-input-group">
            <label class="sv-label" for="sv-input-date">Preferred Date *</label>
            <input type="date" id="sv-input-date" class="sv-input" value="${defaultDateStr}" required />
            <span class="sv-error-msg" id="err-date"></span>
          </div>

          <div class="sv-input-group">
            <label class="sv-label" for="sv-input-time">Preferred Time Slot *</label>
            <div class="sv-select-wrap">
              <select id="sv-input-time" class="sv-select" required>
                <option value="10:00 AM - 12:00 PM" selected>10:00 AM - 12:00 PM</option>
                <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
              </select>
            </div>
            <span class="sv-error-msg" id="err-time"></span>
          </div>

          <div class="sv-input-group">
            <label class="sv-label" for="sv-input-msg">Any Message (Optional)</label>
            <textarea id="sv-input-msg" class="sv-textarea" rows="2" placeholder="I would like to visit with my family."></textarea>
          </div>

          <button type="submit" class="sv-submit-btn" id="sv-submit-btn">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  `;

  // Attach Form Submit Handler
  const form = document.getElementById('sv-booking-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('sv-input-name').value.trim();
    const mobile = document.getElementById('sv-input-mobile').value.trim();
    const email = document.getElementById('sv-input-email').value.trim();
    const date = document.getElementById('sv-input-date').value;
    const time = document.getElementById('sv-input-time').value;

    let hasError = false;

    if (!name || name.length < 2) {
      document.getElementById('err-name').textContent = 'Please enter your full name';
      hasError = true;
    } else {
      document.getElementById('err-name').textContent = '';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(mobile)) {
      document.getElementById('err-mobile').textContent = 'Please enter a valid 10-digit mobile number';
      hasError = true;
    } else {
      document.getElementById('err-mobile').textContent = '';
    }

    if (!date) {
      document.getElementById('err-date').textContent = 'Please choose a preferred visit date';
      hasError = true;
    } else {
      document.getElementById('err-date').textContent = '';
    }

    if (hasError) return;

    // Transition to Screen 3: Success Confirmation
    renderScreen3Success({
      ...prop,
      customerName: name,
      customerMobile: mobile,
      customerEmail: email,
      visitDate: date,
      visitTime: time
    });
  });
}

// Screen 3: Site Visit Request Submitted Success (Matching Reference #3)
export function renderScreen3Success(submissionData) {
  const container = document.getElementById('sv-flow-container');
  if (!container) return;

  container.innerHTML = `
    <div class="sv-screen sv-screen-success">
      <div class="sv-top-header">
        <button type="button" class="sv-close-x right-only" onclick="window.closeSiteVisitFlow()">&times;</button>
      </div>

      <div class="sv-success-content">
        <!-- Big Green Success Icon -->
        <div class="sv-success-icon-wrap">
          <div class="sv-green-circle">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        </div>

        <h2 class="sv-success-title">Site Visit Request Submitted!</h2>
        
        <p class="sv-success-msg">
          Thank you, <strong>${submissionData.customerName || 'Siva Prasad'}</strong>!<br/>
          Your site visit request has been submitted. Our team will contact you shortly to confirm the visit.
        </p>

        <!-- Selected Property Card (Persisted on Success) -->
        <div class="sv-property-preview-card success-card">
          <div class="sv-prev-label">Selected Property</div>
          <div class="sv-prev-content">
            <img src="${submissionData.thumb || submissionData.image || '/images/journey/selected_property_thumb.jpg'}" alt="${submissionData.projectName}" class="sv-prev-thumb" />
            <div class="sv-prev-info">
              <div class="sv-prev-name">${submissionData.projectName || 'VR Elite Towers'}</div>
              <div class="sv-prev-unit">${submissionData.unitName || 'Unit 101 - 3 BHK'}</div>
              <div class="sv-prev-loc">${submissionData.location || 'Kokapet, Hyderabad'}</div>
              <div class="sv-prev-price">${submissionData.price || '₹ 92 Lakhs*'}</div>
            </div>
          </div>
        </div>

        <!-- What Happens Next 3-Step Guide -->
        <div class="sv-next-steps-card">
          <h3 class="sv-next-title">What happens next?</h3>
          
          <div class="sv-step-row">
            <div class="sv-step-badge">1</div>
            <div class="sv-step-desc">Our team will review your request.</div>
          </div>

          <div class="sv-step-row">
            <div class="sv-step-badge">2</div>
            <div class="sv-step-desc">The owner will call you to confirm the site visit.</div>
          </div>

          <div class="sv-step-row">
            <div class="sv-step-badge">3</div>
            <div class="sv-step-desc">Once confirmed, you will receive a confirmation message on WhatsApp.</div>
          </div>
        </div>

        <button type="button" class="sv-back-project-btn" onclick="window.closeSiteVisitFlow()">
          Back to Project
        </button>
      </div>
    </div>
  `;
}

// Global hookups for window triggers
window.openSiteVisitFlow = openSiteVisitFlow;
window.closeSiteVisitFlow = closeSiteVisitFlow;
window.renderScreen2Form = () => renderScreen2Form();
window.switchToEnquiry = () => {
  window.closeSiteVisitFlow();
  if (window.openApartmentEnquiry) {
    window.openApartmentEnquiry();
  }
};
