import { buyerGuides } from '../data/properties.js';

export function renderBuyerGuides() {
  const row1 = buyerGuides.slice(0, 4);
  const row2 = buyerGuides.slice(4, 6);

  const renderCard = (guide) => `
    <a href="${guide.link}" class="guide-card">
      <span>${guide.title}</span>
      <span class="arrow">&rarr;</span>
    </a>
  `;

  return `
    <section class="guides-section" id="property-buyer-guides">
      <div class="container">
        <div class="section-header">
          <span class="section-label orange">PROPERTY BUYER GUIDES</span>
          <h2 class="section-title">Research Before You Book</h2>
          <p class="section-subtitle">
            Practical guides for location comparison, approval checks and property due diligence.
          </p>
        </div>

        <div class="guides-grid">
          ${row1.map(renderCard).join('')}
        </div>

        <div class="guides-grid row-2">
          ${row2.map(renderCard).join('')}
        </div>
      </div>
    </section>
  `;
}
