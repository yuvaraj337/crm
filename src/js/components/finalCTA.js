export function renderFinalCTA() {
  return `
    <section class="ref-final-cta-section" id="final-cta">
      <div class="ref-container">
        <div class="ref-cta-banner-wrapper">
          <!-- Background illuminated modern villa visual -->
          <div class="ref-cta-bg-image">
            <img src="/images/ref/cta-villa-pure.jpg" alt="Luxury Villa Sunset" class="cta-bg-img" />
            <!-- Cursive text in sky -->
            <div class="ref-cta-cursive-sky">
              <span class="ref-handwritten">Your Next Chapter<br/>Starts Here</span>
            </div>
          </div>

          <!-- Rounded Off-White/Cream Panel Overlapping on Left -->
          <div class="ref-cta-panel">
            <div class="ref-cta-eyebrow">
              <span class="eyebrow-text">READY TO FIND YOUR PERFECT PROPERTY?</span>
              <span class="eyebrow-rule"></span>
            </div>

            <h2 class="ref-cta-headline">
              <span class="headline-green">Let's Build Your</span><br/>
              <span class="headline-gold">Brighter Tomorrow</span>
            </h2>

            <p class="ref-cta-desc">
              Get expert guidance, personalised recommendations, and exclusive property options &mdash; all in one place.
            </p>

            <!-- Dual CTA Buttons -->
            <div class="ref-cta-buttons-row">
              <button class="ref-cta-btn-enquire" onclick="window.openSiteVisitModal ? window.openSiteVisitModal('Final CTA') : alert('Enquiry Modal')">
                <span>Enquire Now</span>
                <span class="btn-arrow">&rarr;</span>
              </button>

              <a href="tel:+919490634829" class="ref-cta-btn-call">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>Call Us Now</span>
              </a>
            </div>

            <!-- 3 Benefit Items -->
            <div class="ref-cta-benefits-row">
              <div class="cta-benefit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span>Free Consultation</span>
              </div>

              <div class="cta-benefit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <span>Expert Guidance</span>
              </div>

              <div class="cta-benefit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                <span>No Hidden Costs</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;
}
