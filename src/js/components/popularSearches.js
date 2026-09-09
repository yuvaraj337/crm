import { popularSearches } from '../data/properties.js';

export function renderPopularSearches() {
  const pillsHtml = popularSearches.map(item => `
    <a href="${item.link}" class="search-pill">
      ${item.label}
    </a>
  `).join('');

  return `
    <section class="searches-section" id="popular-searches">
      <div class="container">
        <div class="section-header">
          <span class="section-label orange">POPULAR LOCAL SEARCHES</span>
          <h2 class="section-title">Explore Property Locations</h2>
        </div>

        <div class="searches-pills-row">
          ${pillsHtml}
        </div>

        <div class="searches-cta-btn-wrap">
          <a href="#/guides/amaravati" class="searches-guide-btn">
            Amaravati Property Buyers Guide &rarr;
          </a>
        </div>
      </div>
    </section>
  `;
}
