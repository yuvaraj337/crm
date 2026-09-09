import { renderHeader, initStickyNav } from '../components/header.js';
import { renderFooter, initScrollTop } from '../components/footer.js';
import { showToast } from '../components/siteVisitModal.js';

export function renderStaticPage(title, subtitle, contentHtml, currentPath = '#/') {
  const html = `
    <div class="page-static">
      ${renderHeader({ currentPath })}
      
      <div class="page-title-banner">
        <div class="container">
          <h1 class="page-title-heading">${title}</h1>
        </div>
      </div>

      <div class="container" style="padding-top: 50px; padding-bottom: 80px; max-width: 960px;">
        ${subtitle ? `<p style="font-size: 1.2rem; color: #475569; margin-bottom: 30px; line-height: 1.6;">${subtitle}</p>` : ''}
        <div class="static-content" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; box-shadow: var(--shadow-sm); line-height: 1.8; color: #334155;">
          ${contentHtml}
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

      const contactForm = document.getElementById('static-contact-form');
      if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          contactForm.reset();
          showToast('Message sent! Our property advisor will reach out to you.');
        });
      }
    }
  };
}

export function renderAboutPage() {
  return renderStaticPage(
    'ABOUT VR REAL ESTATES',
    'Find Your Dream Asset with complete confidence, transparency, and legal due diligence.',
    `
      <h2 style="font-family: var(--font-heading); font-size: 1.8rem; color: #0e4b9e; margin-bottom: 16px;">Who We Are</h2>
      <p style="margin-bottom: 20px;">
        VR Real Estates is a premier real estate advisory and land acquisition company operating across prime corridors in Telangana and Andhra Pradesh. Built on principles of transparency, trust, and verified documentation, we assist individual home seekers, NRI investors, and institutional clients in identifying high-growth land assets and luxury properties.
      </p>
      <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: #1e293b; margin-top: 30px; margin-bottom: 14px;">Our Core Expertise</h3>
      <ul style="padding-left: 20px; margin-bottom: 24px;">
        <li style="margin-bottom: 8px;"><strong>HMDA &amp; DTCP Approved Open Plots:</strong> Strategic layouts along emerging growth hubs like Shadnagar, Balanagar, and Regional Ring Road corridors.</li>
        <li style="margin-bottom: 8px;"><strong>Luxury Gated Villas:</strong> Ultra-modern architecture, private amenities, and sustainable community living.</li>
        <li style="margin-bottom: 8px;"><strong>Premium High-Rise Apartments:</strong> 2 &amp; 3 BHK luxury residences in established city centers.</li>
        <li style="margin-bottom: 8px;"><strong>Managed Farmlands:</strong> Sustainable green escapes offering sandalwood, agarwood, and high long-term appreciation.</li>
      </ul>
      <div style="margin-top: 36px; padding: 24px; background: #f0f7ff; border-radius: 12px; border-left: 4px solid #0e4b9e;">
        <h4 style="color: #0e4b9e; font-size: 1.1rem; margin-bottom: 8px;">Our Promise to Every Buyer:</h4>
        <p>ముందుగా Location చూడండి... నచ్చితేనే Decision తీసుకోండి. We always recommend inspecting the actual site, verifying town-planning approvals, and understanding future appreciation potential before committing.</p>
      </div>
    `,
    '#/about'
  );
}

export function renderServicesPage() {
  return renderStaticPage(
    'OUR SERVICES',
    'Comprehensive real estate advisory from land verification to registration and management.',
    `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <div style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h3 style="color: #0e4b9e; font-size: 1.25rem; margin-bottom: 8px;">📜 Due Diligence &amp; Title Verification</h3>
          <p>Complete 30-year link document verification, master plan conformity checks, HMDA, DTCP, and RERA approval audits.</p>
        </div>
        <div style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h3 style="color: #0e4b9e; font-size: 1.25rem; margin-bottom: 8px;">🚗 Free Guided Site Visits</h3>
          <p>Complimentary escorted site visits from Hyderabad with expert property consultants explaining on-ground milestones.</p>
        </div>
        <div style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h3 style="color: #0e4b9e; font-size: 1.25rem; margin-bottom: 8px;">🌐 NRI &amp; Remote Buyer Assistance</h3>
          <p>Dedicated desk for Telugus in Bengaluru, USA, and Gulf countries with video walkthroughs and legal power-of-attorney support.</p>
        </div>
        <div style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h3 style="color: #0e4b9e; font-size: 1.25rem; margin-bottom: 8px;">💼 Resale &amp; Portfolio Management</h3>
          <p>Strategic advisory on when to enter, hold, and exit plotted land investments to maximize compounding capital returns.</p>
        </div>
      </div>
    `,
    '#/services'
  );
}

export function renderContactPage() {
  return renderStaticPage(
    'CONTACT US',
    'Get in touch with VR Real Estates advisors for plots, villas, and site visits.',
    `
      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 36px;">
        <div>
          <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: #0e4b9e; margin-bottom: 16px;">Send Us a Message</h3>
          <form id="static-contact-form" class="enquiry-form-body">
            <div class="form-group">
              <input type="text" placeholder="Full Name *" required />
            </div>
            <div class="form-group">
              <input type="tel" placeholder="Mobile Number *" required />
            </div>
            <div class="form-group">
              <input type="email" placeholder="Email Address *" required />
            </div>
            <div class="form-group">
              <select required>
                <option value="" disabled selected>Interested In</option>
                <option value="Open Plots">Open Plots</option>
                <option value="Villas">Villas</option>
                <option value="Apartments">Apartments</option>
                <option value="Farmlands">Farm Lands</option>
              </select>
            </div>
            <div class="form-group">
              <textarea placeholder="Your Requirement or Query..." rows="4" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px;"></textarea>
            </div>
            <button type="submit" class="btn-send-enquiry">Send Message</button>
          </form>
        </div>

        <div style="background: #f8fafc; border-radius: 12px; padding: 28px; border: 1px solid #e2e8f0;">
          <h3 style="font-family: var(--font-heading); font-size: 1.3rem; color: #1e293b; margin-bottom: 20px;">Direct Contact</h3>
          <p style="margin-bottom: 14px;"><strong>📞 Phone:</strong> <a href="tel:+919490634829" style="color: #0e4b9e; font-weight: 600;">+91-9490-634829</a></p>
          <p style="margin-bottom: 14px;"><strong>✉️ Email:</strong> <a href="mailto:info@vrrealestates.com" style="color: #0e4b9e; font-weight: 600;">info@vrrealestates.com</a></p>
          <p style="margin-bottom: 14px;"><strong>📍 Locations:</strong> Hyderabad, Shadnagar, Amaravati &amp; Visakhapatnam</p>
          <div style="margin-top: 24px;">
            <a href="https://wa.me/919490634829" target="_blank" class="btn-whatsapp-enquiry" style="text-decoration: none;">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    `,
    '#/contact'
  );
}

export function renderResourcesPage() {
  return renderStaticPage(
    'RESOURCES & BUYER GUIDES',
    'Comprehensive guides and regulatory resources for land buyers in AP & Telangana.',
    `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h3 style="color: #0e4b9e; font-size: 1.25rem;">Amaravati Capital Region Buyer Guide</h3>
          <p>Essential checklist for open plots and commercial ventures in the CRDA zone, capital infrastructure timelines, and land pooling schemes.</p>
        </div>
        <div style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h3 style="color: #0e4b9e; font-size: 1.25rem;">HMDA vs DTCP: What Every Telangana Buyer Must Know</h3>
          <p>Understanding layout norms, mortgage plot releases, open space reservations, and conversion approvals before you sign.</p>
        </div>
        <div style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h3 style="color: #0e4b9e; font-size: 1.25rem;">Bengaluru Telugu Techies: Investing in Hyderabad &amp; AP</h3>
          <p>Why Bangalore tech professionals are acquiring assets along the Bangalore-Hyderabad expressway corridor.</p>
        </div>
      </div>
    `,
    '#/resources'
  );
}

export function renderMediaPage() {
  return renderStaticPage(
    'MEDIA & PROJECT HIGHLIGHTS',
    'Watch walkthrough videos, drone surveys, and layout development updates.',
    `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <img src="/images/hero-openplots.jpg" style="height: 200px; width: 100%; object-fit: cover;" />
          <div style="padding: 18px;">
            <h4 style="font-weight: 700; color: #1e293b; margin-bottom: 6px;">Shadnagar Highway Corridor Drone Survey</h4>
            <p style="font-size: 0.9rem; color: #64748b;">Aerial view of new infrastructure, 6-lane highway connectivity, and upcoming SEZs.</p>
          </div>
        </div>
        <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <img src="/images/hero-villas.jpg" style="height: 200px; width: 100%; object-fit: cover;" />
          <div style="padding: 18px;">
            <h4 style="font-weight: 700; color: #1e293b; margin-bottom: 6px;">Luxury Gated Community Clubhouse Showcase</h4>
            <p style="font-size: 0.9rem; color: #64748b;">Tour the modern architecture and resort-style amenities.</p>
          </div>
        </div>
      </div>
    `,
    '#/media'
  );
}

export function renderCategoryListingPage(type = 'villas') {
  const titles = {
    villas: 'LUXURY VILLAS',
    apartments: 'PREMIUM APARTMENTS',
    farmlands: 'MANAGED FARM LANDS'
  };

  const images = {
    villas: '/images/cat-villas.jpg',
    apartments: '/images/cat-apartments.jpg',
    farmlands: '/images/cat-farmlands.jpg'
  };

  const title = titles[type] || 'PROPERTIES';
  const img = images[type] || '/images/cat-villas.jpg';

  return renderStaticPage(
    title,
    `Explore premium ${type} verified by VR Real Estates.`,
    `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px;">
        <div style="border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: var(--shadow-sm);">
          <img src="${img}" style="height: 260px; width: 100%; object-fit: cover;" />
          <div style="padding: 24px;">
            <h3 style="font-size: 1.35rem; color: #0e4b9e; font-weight: 800; margin-bottom: 8px;">Prime Gated Project</h3>
            <p style="color: #64748b; margin-bottom: 16px;">Strategically located in premier high-growth sectors with full legal sanctions and bank loans available.</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 700; color: #f57c00; font-size: 1.1rem;">Price on Request</span>
              <button class="nav-cta-blue" onclick="window.openSiteVisitModal('${title}')">Enquire Now</button>
            </div>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: center; padding: 20px;">
          <h3 style="font-size: 1.4rem; color: #1e293b; margin-bottom: 12px;">Looking for specific locations or budgets?</h3>
          <p style="color: #4b5563; line-height: 1.7; margin-bottom: 24px;">Our advisors provide custom property shortlists matching your family needs and investment goals across AP &amp; Telangana.</p>
          <button class="btn-send-enquiry" style="width: fit-content;" onclick="window.openSiteVisitModal('${title}')">Request Custom Shortlist</button>
        </div>
      </div>
    `,
    `#/${type}`
  );
}
