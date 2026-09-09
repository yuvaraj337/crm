import { locationOpportunities } from '../data/properties.js';

export function renderLocationCards() {
  const cardsHtml = locationOpportunities.map(loc => `
    <a href="${loc.link}" class="location-card" id="loc-card-${loc.id}">
      <div class="location-icon-box">
        <span>${loc.icon}</span>
      </div>
      <h3 class="location-title">${loc.name}</h3>
      <p class="location-desc">${loc.desc}</p>
      <div class="location-arrow-link">
        &rarr;
      </div>
    </a>
  `).join('');

  return `
    <section class="location-section" id="explore-by-location">
      <div class="container">
        <div class="section-header">
          <span class="section-label orange">EXPLORE BY LOCATION</span>
          <h2 class="section-title">Property Opportunities Across AP &amp; Telangana</h2>
          <p class="section-subtitle">
            Explore dedicated city pages with local property listings, planning references and buyer-focused information.
          </p>
        </div>

        <div class="location-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}
