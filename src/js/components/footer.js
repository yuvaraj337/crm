export function renderFooter() {
  return `
    <footer class="ref-footer-section" id="site-footer">
      <div class="ref-container">
        <!-- 5-Column Grid -->
        <div class="ref-footer-main-grid">
          
          <!-- Column 1: Brand Info & Socials -->
          <div class="ref-footer-col brand-col">
            <a href="#/" class="footer-brand-wrap">
              <img src="/images/vr-logo.png" alt="VR Real Estates" class="footer-brand-logo" onerror="this.style.display='none'" />
              <div class="footer-brand-heading">
                <span class="brand-title">VR REAL ESTATES</span>
                <span class="brand-sub">LAND TODAY &bull; A BRIGHTER TOMORROW</span>
              </div>
            </a>
            
            <p class="footer-brand-desc">
              At VR Real Estates, we believe property is more than just land or a home &mdash; it's the foundation for a brighter tomorrow. We bring you verified properties, expert guidance and complete support, helping you make confident real estate decisions.
            </p>

            <div class="footer-social-icons">
              <a href="#" class="social-circle" title="Facebook" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" class="social-circle" title="Instagram" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" class="social-circle" title="YouTube" aria-label="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" class="social-circle" title="LinkedIn" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="ref-footer-col">
            <h4 class="ref-footer-heading">Quick Links</h4>
            <ul class="ref-footer-links">
              <li><a href="#/">Home</a></li>
              <li><a href="#/projects">Projects</a></li>
              <li><a href="#/open-plots">Properties</a></li>
              <li><a href="#/locations">Locations</a></li>
              <li><a href="#/about">About Us</a></li>
              <li><a href="#/contact">Contact Us</a></li>
              <li><a href="#/resources">Blog</a></li>
            </ul>
          </div>

          <!-- Column 3: Our Properties -->
          <div class="ref-footer-col">
            <h4 class="ref-footer-heading">Our Properties</h4>
            <ul class="ref-footer-links">
              <li><a href="#/open-plots">Open Plots</a></li>
              <li><a href="#/villas">Villas</a></li>
              <li><a href="#/apartments">Apartments</a></li>
              <li><a href="#/farmlands">Farm Lands</a></li>
              <li><a href="#/commercial">Commercial Spaces</a></li>
              <li><a href="#/villas">Luxury Properties</a></li>
            </ul>
          </div>

          <!-- Column 4: Support -->
          <div class="ref-footer-col">
            <h4 class="ref-footer-heading">Support</h4>
            <ul class="ref-footer-links">
              <li><a href="#/faq">FAQs</a></li>
              <li><a href="javascript:void(0)" onclick="window.openSiteVisitModal ? window.openSiteVisitModal('Site Visit Request') : null">Site Visit</a></li>
              <li><a href="#/booking">Booking Process</a></li>
              <li><a href="#/payment">Payment Options</a></li>
              <li><a href="#/terms">Terms &amp; Conditions</a></li>
              <li><a href="#/privacy">Privacy Policy</a></li>
              <li><a href="#/refund">Refund Policy</a></li>
            </ul>
          </div>

          <!-- Column 5: Get in Touch -->
          <div class="ref-footer-col">
            <h4 class="ref-footer-heading">Get in Touch</h4>
            <div class="footer-contact-details">
              <div class="contact-line">
                <svg class="contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C59B3F" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <div class="contact-text">
                  <strong>VR Real Estates</strong><br/>
                  <span>Tirupati, Andhra Pradesh - 517501<br/>India</span>
                </div>
              </div>

              <div class="contact-line">
                <svg class="contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C59B3F" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <div class="contact-text">
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
              </div>

              <div class="contact-line">
                <svg class="contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C59B3F" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <div class="contact-text">
                  <a href="mailto:info@vrrealestates.com">info@vrrealestates.com</a>
                </div>
              </div>

              <div class="contact-line">
                <svg class="contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C59B3F" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <div class="contact-text">
                  <span>Mon - Sat: 9:00 AM - 7:00 PM</span><br/>
                  <span>Sunday: 10:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Architectural Skyline SVG & Gold Line Divider -->
        <div class="ref-footer-skyline-row">
          <div class="footer-skyline-svg">
            <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <!-- City skyline silhouette -->
              <g opacity="0.25" fill="#C59B3F">
                <!-- Left buildings -->
                <rect x="20" y="80" width="30" height="40"/>
                <rect x="55" y="60" width="20" height="60"/>
                <rect x="80" y="70" width="25" height="50"/>
                <rect x="110" y="45" width="35" height="75"/>
                <rect x="150" y="55" width="22" height="65"/>
                <rect x="177" y="40" width="28" height="80"/>
                <rect x="210" y="65" width="18" height="55"/>
                <rect x="233" y="50" width="30" height="70"/>
                <!-- Trees -->
                <ellipse cx="275" cy="90" rx="14" ry="10"/>
                <rect x="272" y="100" width="6" height="20"/>
                <ellipse cx="305" cy="85" rx="10" ry="8"/>
                <rect x="302" y="93" width="6" height="27"/>
                <!-- Center buildings -->
                <rect x="330" y="30" width="40" height="90"/>
                <rect x="375" y="50" width="25" height="70"/>
                <rect x="405" y="20" width="50" height="100"/>
                <rect x="460" y="45" width="30" height="75"/>
                <rect x="495" y="35" width="45" height="85"/>
                <rect x="545" y="55" width="22" height="65"/>
                <!-- Antenna on center tall building -->
                <rect x="426" y="10" width="4" height="20"/>
                <!-- More buildings right -->
                <rect x="575" y="40" width="35" height="80"/>
                <rect x="615" y="60" width="25" height="60"/>
                <rect x="645" y="30" width="40" height="90"/>
                <rect x="690" y="50" width="28" height="70"/>
                <rect x="723" y="65" width="20" height="55"/>
                <!-- Trees right -->
                <ellipse cx="755" cy="88" rx="12" ry="9"/>
                <rect x="752" y="97" width="6" height="23"/>
                <ellipse cx="780" cy="83" rx="10" ry="8"/>
                <rect x="777" y="91" width="6" height="29"/>
                <!-- Far right buildings -->
                <rect x="800" y="55" width="30" height="65"/>
                <rect x="835" y="45" width="22" height="75"/>
                <rect x="862" y="70" width="28" height="50"/>
                <rect x="895" y="40" width="35" height="80"/>
                <rect x="935" y="60" width="20" height="60"/>
                <rect x="960" y="75" width="25" height="45"/>
                <rect x="990" y="85" width="18" height="35"/>
              </g>
              <!-- Ground line -->
              <line x1="0" y1="120" x2="1200" y2="120" stroke="#C59B3F" stroke-width="0.5" opacity="0.3"/>
            </svg>
          </div>
          <div class="footer-tagline-bar">
            <span class="sub-rule"></span>
            <span class="sub-text">LAND TODAY &bull; A BRIGHTER TOMORROW</span>
            <span class="sub-rule"></span>
          </div>
        </div>

        <!-- Copyright & Bottom Handwritten Script -->
        <div class="ref-footer-bottom-bar">
          <div class="footer-copyright">
            &copy; 2026 VR Real Estates. All rights reserved.
          </div>

          <div class="footer-bottom-right">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C59B3F" stroke-width="1.8">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
            </svg>
            <span class="ref-handwritten">Invest Today<br/>Live Better Tomorrow</span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Floating WhatsApp Button -->
    <a href="https://wa.me/919876543210?text=Hi%20VR%20Real%20Estates,%20I%20am%20interested%20in%20exploring%20properties." target="_blank" rel="noopener" class="ref-floating-whatsapp" id="ref-floating-whatsapp" title="Chat on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    </a>

    <!-- Scroll to Top Button -->
    <button class="ref-scroll-top-btn" id="ref-scroll-top-btn" aria-label="Scroll to top">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  `;
}

export function initScrollTop() {
  const btn = document.getElementById('ref-scroll-top-btn');
  if (!btn) return;

  const handleScroll = () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.removeEventListener('scroll', handleScroll);
  window.addEventListener('scroll', handleScroll, { passive: true });
}
