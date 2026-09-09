export function renderFindProperty() {
  return `
    <section class="ref-find-section" id="find-your-property">
      <div class="ref-container">
        <div class="ref-find-split-wrap">
          
          <!-- LEFT SIDE: Interactive Search Form -->
          <div class="ref-find-left">
            <div class="ref-find-eyebrow">
              <span class="eyebrow-text">FIND YOUR PROPERTY</span>
              <span class="eyebrow-rule"></span>
            </div>

            <h2 class="ref-find-title">
              <span class="headline-green">Let's Find a Property</span><br/>
              <span class="headline-gold">That Fits Your Future</span>
            </h2>

            <p class="ref-find-desc">
              Tell us what you're looking for. We'll help you discover the best properties that match your lifestyle, budget and goals.
            </p>

            <!-- Property Type Selector Cards -->
            <div class="ref-find-type-selector" id="find-type-selector">
              <button type="button" class="find-type-btn active" data-type="openplots">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                  <line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line>
                </svg>
                <span>Open Plots</span>
              </button>

              <button type="button" class="find-type-btn" data-type="villas">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span>Villas</span>
              </button>

              <button type="button" class="find-type-btn" data-type="apartments">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                  <line x1="9" y1="22" x2="9" y2="2"></line>
                </svg>
                <span>Apartments</span>
              </button>

              <button type="button" class="find-type-btn" data-type="farmlands">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                </svg>
                <span>Farm Lands</span>
              </button>
            </div>

            <!-- 4 Dropdowns (2x2 Grid) -->
            <form class="ref-find-form" id="ref-find-form" onsubmit="event.preventDefault(); window.handleFindPropertySearch();">
              <div class="ref-find-fields-grid">
                <!-- Location -->
                <div class="ref-field-group">
                  <label class="field-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>Preferred Location</span>
                  </label>
                  <div class="ref-select-wrap">
                    <select id="find-location" class="ref-select">
                      <option value="">Select Location</option>
                      <option value="Shadnagar">Shadnagar, Hyderabad</option>
                      <option value="Kompally">Kompally, Hyderabad</option>
                      <option value="Nallagandla">Nallagandla, Hyderabad</option>
                      <option value="Shankarpally">Shankarpally, Hyderabad</option>
                      <option value="Amaravati">Amaravati, AP</option>
                      <option value="Tirupati">Tirupati, AP</option>
                    </select>
                    <span class="select-arrow">&#9662;</span>
                  </div>
                </div>

                <!-- Budget -->
                <div class="ref-field-group">
                  <label class="field-label">
                    <span style="font-weight: 700; font-size: 0.95rem;">&#8377;</span>
                    <span>Budget</span>
                  </label>
                  <div class="ref-select-wrap">
                    <select id="find-budget" class="ref-select">
                      <option value="">Select Budget</option>
                      <option value="under30">Under ₹30 Lakhs</option>
                      <option value="30to60">₹30 Lakhs - ₹60 Lakhs</option>
                      <option value="60to1cr">₹60 Lakhs - ₹1 Crore</option>
                      <option value="above1cr">Above ₹1 Crore</option>
                    </select>
                    <span class="select-arrow">&#9662;</span>
                  </div>
                </div>

                <!-- Size / BHK -->
                <div class="ref-field-group">
                  <label class="field-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                    <span>Size / BHK</span>
                  </label>
                  <div class="ref-select-wrap">
                    <select id="find-size" class="ref-select">
                      <option value="">Select Size / BHK</option>
                      <option value="150-200">150 - 250 Sq.Yds</option>
                      <option value="250-400">250 - 400 Sq.Yds</option>
                      <option value="2bhk">2 BHK (1100 - 1350 sq.ft)</option>
                      <option value="3bhk">3 BHK (1550 - 2100 sq.ft)</option>
                      <option value="villa">4 BHK Luxury Villa</option>
                      <option value="farmland">0.5 - 2 Acres Farm</option>
                    </select>
                    <span class="select-arrow">&#9662;</span>
                  </div>
                </div>

                <!-- Purpose -->
                <div class="ref-field-group">
                  <label class="field-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                    <span>Purpose</span>
                  </label>
                  <div class="ref-select-wrap">
                    <select id="find-purpose" class="ref-select">
                      <option value="">Home / Investment</option>
                      <option value="residential">Residential Living</option>
                      <option value="high-roi">High ROI Investment</option>
                      <option value="weekend">Weekend Retreat</option>
                      <option value="legacy">Long-term Family Asset</option>
                    </select>
                    <span class="select-arrow">&#9662;</span>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="ref-find-submit-btn">
                <span>Find My Property</span>
                <span class="btn-arrow">&rarr;</span>
              </button>
            </form>

            <!-- Tagline Line -->
            <div class="ref-find-tagline-wrap">
              <span class="sub-rule"></span>
              <span class="sub-text">SIMPLE SEARCH. BRIGHTER TOMORROWS.</span>
              <span class="sub-rule"></span>
            </div>

            <!-- 4 Benefits Row -->
            <div class="ref-find-benefits-row">
              <div class="find-benefit">
                <div class="benefit-circle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 11 12 14 22 4"></polyline></svg>
                </div>
                <span>Verified Properties</span>
              </div>

              <div class="find-benefit">
                <div class="benefit-circle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <span>Prime Locations</span>
              </div>

              <div class="find-benefit">
                <div class="benefit-circle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                </div>
                <span>Best Prices</span>
              </div>

              <div class="find-benefit">
                <div class="benefit-circle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <span>Expert Guidance</span>
              </div>
            </div>

          </div>

          <!-- RIGHT SIDE: Grand Entrance Property Visual & Stats Card -->
          <div class="ref-find-right">
            <div class="ref-find-card-wrapper">
              <img 
                src="/images/ref/find-prop-exact-card.png" 
                alt="VR Real Estates - More than Properties We Build Better Lives" 
                class="ref-find-card-img" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  `;
}

export function initFindProperty() {
  const typeBtns = document.querySelectorAll('.find-type-btn');
  let selectedType = 'openplots';

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedType = btn.getAttribute('data-type');
    });
  });

  window.handleFindPropertySearch = () => {
    const loc = document.getElementById('find-location')?.value || '';
    const budget = document.getElementById('find-budget')?.value || '';
    const size = document.getElementById('find-size')?.value || '';
    const purpose = document.getElementById('find-purpose')?.value || '';

    if (selectedType === 'openplots') {
      window.location.hash = '#/open-plots';
    } else {
      if (window.openSiteVisitModal) {
        window.openSiteVisitModal(`Custom Match: ${selectedType} in ${loc || 'Anywhere'} (Budget: ${budget || 'Flexible'})`);
      } else {
        alert(`Searching properties for ${selectedType} in ${loc || 'AP & Telangana'}...`);
      }
    }
  };
}
