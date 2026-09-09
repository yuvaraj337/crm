import { renderHeader, initStickyNav } from '../components/header.js';
import { renderFooter, initScrollTop } from '../components/footer.js';
import { openPlotsList } from '../data/properties.js';
import { showToast } from '../components/siteVisitModal.js';

export function renderPropertyDetailPage(propertyId = 'amodha') {
  const property = openPlotsList.find(p => p.id === propertyId) || openPlotsList[0];

  const html = `
    <div class="page-property-detail">
      ${renderHeader({ currentPath: `#/amodha`, isDetail: true, backUrl: '#/open-plots' })}

      <div class="detail-page-wrap">
        <div class="container">
          <!-- Location Line -->
          <div class="detail-location-bar">
            <span>&#128205;</span>
            <span>${property.location}, ${property.state}</span>
          </div>

          <!-- Main Layout Grid -->
          <div class="detail-layout-grid">
            <!-- Left Column: Media, Details, Specs -->
            <div class="detail-main-col">
              <!-- Hero Photo Frame with Badges -->
              <div class="detail-hero-frame">
                <img src="${property.image}" alt="${property.title}" id="detail-main-image" />
                <div class="detail-badge-top-left">${property.type}</div>
                <div class="detail-badge-top-right">&#10004; ${property.status}</div>
                <button class="detail-badge-bottom-right" onclick="window.openShareModal('${property.title}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                  Share
                </button>
              </div>

              <!-- Price & Enquire Row -->
              <div class="detail-price-row">
                <div class="detail-price-text">${property.price}</div>
                <button class="detail-enquire-btn" id="btn-scroll-enquiry">
                  <span>&#128197;</span> Enquire Now
                </button>
              </div>

              <!-- Detail Tabs -->
              <div class="detail-tabs-nav">
                <button class="detail-tab-pill active">Overview</button>
                <button class="detail-tab-pill" id="tab-enquire-btn">Enquire</button>
              </div>

              <!-- Blue Want to see in person card -->
              <div class="detail-site-visit-card">
                <div class="visit-card-left">
                  <h3>Want to see this property in person?</h3>
                  <p>Location చూడండి, complete details తెలుసుకోండి, తర్వాతే మీ decision తీసుకోండి.</p>
                </div>
                <button class="visit-card-btn" onclick="window.openSiteVisitModal('${property.title}')">
                  <span>&#128197;</span> Book Free Site Visit
                </button>
              </div>

              <!-- Property Description -->
              <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
                <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: #1e293b; margin-bottom: 12px;">About ${property.title}</h3>
                <p style="color: #4b5563; line-height: 1.7;">${property.desc}</p>
              </div>

              <!-- Property Details / Specifications Table -->
              <div class="detail-specs-box">
                <div class="detail-specs-header">Property Details</div>
                <div class="detail-specs-grid">
                  <div class="spec-item">
                    <span class="spec-label"><span>&#127968;</span> Property Type</span>
                    <span class="spec-value">${property.type}</span>
                  </div>
                  <div class="spec-item">
                    <span class="spec-label"><span>&#128205;</span> Location</span>
                    <span class="spec-value">${property.location}</span>
                  </div>
                  <div class="spec-item">
                    <span class="spec-label"><span>&#127963;</span> State</span>
                    <span class="spec-value">${property.state}</span>
                  </div>
                  <div class="spec-item">
                    <span class="spec-label"><span>&#128220;</span> Approval</span>
                    <span class="spec-value">${property.approval}</span>
                  </div>
                  <div class="spec-item">
                    <span class="spec-label"><span>&#128207;</span> Plot/Unit Size</span>
                    <span class="spec-value">${property.size}</span>
                  </div>
                  <div class="spec-item">
                    <span class="spec-label"><span>&#128176;</span> Starting Price</span>
                    <span class="spec-value">${property.price}</span>
                  </div>
                  <div class="spec-item">
                    <span class="spec-label"><span>&#129517;</span> Facing</span>
                    <span class="spec-value">${property.facing}</span>
                  </div>
                  <div class="spec-item">
                    <span class="spec-label"><span>&#9989;</span> Status</span>
                    <span class="spec-value">${property.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Sticky Enquiry Form -->
            <div class="enquiry-card-sidebar" id="enquiry-form-card">
              <h3 class="enquiry-heading">Send an enquiry for this property</h3>
              <p class="enquiry-telugu-note">ముందు Location చూడండి... నచ్చితేనే Decision తీసుకోండి.</p>

              <form id="property-detail-enquiry-form" class="enquiry-form-body">
                <div class="form-group">
                  <input type="text" id="enquiry-name" placeholder="Your Name *" required />
                </div>
                <div class="form-group">
                  <input type="tel" id="enquiry-mobile" placeholder="Mobile Number *" required />
                </div>
                <div class="form-group">
                  <select id="enquiry-budget" required>
                    <option value="" disabled selected>Budget Range</option>
                    <option value="Below ₹20 Lakhs">Below ₹20 Lakhs</option>
                    <option value="₹20 Lakhs - ₹50 Lakhs">₹20 Lakhs - ₹50 Lakhs</option>
                    <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                    <option value="Above ₹1 Crore">Above ₹1 Crore</option>
                  </select>
                </div>
                <div class="form-group">
                  <select id="enquiry-timeline" required>
                    <option value="" disabled selected>Purchase Timeline</option>
                    <option value="Immediate (Within 15 days)">Immediate (Within 15 days)</option>
                    <option value="1 - 3 Months">1 - 3 Months</option>
                    <option value="3 - 6 Months">3 - 6 Months</option>
                    <option value="Planning / Exploring">Planning / Exploring</option>
                  </select>
                </div>

                <button type="submit" class="btn-send-enquiry">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  SEND ENQUIRY
                </button>

                <a href="https://wa.me/919876543210?text=Hi%20VR%20Real%20Estates,%20I%20am%20interested%20in%20${encodeURIComponent(property.title + ' at ' + property.location)}" target="_blank" rel="noopener" class="btn-whatsapp-enquiry" style="text-decoration: none;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  WHATSAPP NOW
                </a>

                <div class="enquiry-privacy-note">
                  <span>&#128274;</span>
                  <span>Your details are used only to respond to this property enquiry.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      ${renderFooter()}
    </div>
  `;

  return {
    html,
    init: () => {
      initStickyNav();
      initScrollTop();

      // Form submission
      const form = document.getElementById('property-detail-enquiry-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = document.getElementById('enquiry-name').value;
          form.reset();
          showToast(`Thank you, ${name}! Your enquiry for ${property.title} has been received. Our team will contact you shortly.`);
        });
      }

      // Scroll to enquiry form on button click
      const scrollBtn = document.getElementById('btn-scroll-enquiry');
      const tabEnquire = document.getElementById('tab-enquire-btn');
      const formCard = document.getElementById('enquiry-form-card');

      const scrollToForm = () => {
        if (formCard) {
          formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const nameInput = document.getElementById('enquiry-name');
          if (nameInput) nameInput.focus();
        }
      };

      if (scrollBtn) scrollBtn.addEventListener('click', scrollToForm);
      if (tabEnquire) tabEnquire.addEventListener('click', scrollToForm);
    }
  };
}
