export const explorePropertiesData = [
  {
    id: 'villas',
    title: 'Villas',
    badgeText: 'Live\nBetter',
    desc: 'Premium gated community villas designed for modern living.',
    btnText: 'EXPLORE VILLAS',
    link: '#/villas',
    image: '/images/ref/exp-villa-clean.jpg',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`
  },
  {
    id: 'openplots',
    title: 'Open Plots',
    badgeText: 'Build\nYour Future',
    desc: 'HMDA & DTCP approved plots in fast-growing locations.',
    btnText: 'EXPLORE OPEN PLOTS',
    link: '#/open-plots',
    image: '/images/ref/exp-plots-clean.jpg',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>`
  },
  {
    id: 'apartments',
    title: 'Apartments',
    badgeText: 'More\nPossibilities',
    desc: '2 & 3 BHK apartments with world-class amenities.',
    btnText: 'EXPLORE APARTMENTS',
    link: '#/apartments',
    image: '/images/ref/exp-apts-clean.jpg',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="2"></line><line x1="8" y1="6" x2="8" y2="6.01"></line><line x1="16" y1="6" x2="16" y2="6.01"></line><line x1="8" y1="10" x2="8" y2="10.01"></line><line x1="16" y1="10" x2="16" y2="10.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="8" y1="18" x2="8" y2="18.01"></line><line x1="16" y1="18" x2="16" y2="18.01"></line></svg>`
  },
  {
    id: 'farmlands',
    title: 'Farm Lands',
    badgeText: 'A Greener\nTomorrow',
    desc: 'Managed farmlands for lifestyle, leisure and long-term value.',
    btnText: 'EXPLORE FARM LANDS',
    link: '#/farmlands',
    image: '/images/ref/exp-farm-clean.jpg',
    iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`
  }
];

export function renderPropertyCategories() {
  const cardsHtml = explorePropertiesData.map(item => `
    <div class="ref-explore-card" data-category="${item.id}" onclick="window.location.href='${item.link}'" style="cursor: pointer;">
      <div class="ref-explore-img-wrap">
        <img src="${item.image}" alt="${item.title}" class="ref-explore-img" loading="lazy" />
        <span class="ref-explore-img-badge">${item.badgeText.replace('\n', '<br/>')}</span>
      </div>

      <!-- Overlapping Floating Circular Icon Container -->
      <div class="ref-explore-icon-bubble">
        <div class="ref-explore-icon-inner">
          ${item.iconSvg}
        </div>
      </div>

      <div class="ref-explore-card-body">
        <h3 class="ref-explore-title">${item.title}</h3>
        <p class="ref-explore-desc">${item.desc}</p>
        
        <div class="ref-explore-action-row">
          <a href="${item.link}" class="ref-explore-link">
            <span>${item.btnText}</span>
          </a>
          <a href="${item.link}" class="ref-explore-circle-btn" aria-label="${item.btnText}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section class="ref-explore-section" id="explore-our-properties">
      <div class="ref-container">
        <!-- Section Header -->
        <div class="ref-section-header text-center">
          <div class="ref-eyebrow-line">
            <span class="eyebrow-rule"></span>
            <span class="eyebrow-text">WHAT WE OFFER</span>
            <span class="eyebrow-rule"></span>
          </div>
          
          <h2 class="ref-section-title">
            <span class="headline-green">Explore Our</span> <span class="headline-gold">Properties</span>
          </h2>

          <p class="ref-section-subtitle">
            Discover premium real estate opportunities across Andhra Pradesh &amp; Telangana.<br/>
            Thoughtfully selected for your lifestyle, investment and future.
          </p>
        </div>

        <!-- 4 Cards in 1 Row -->
        <div class="ref-explore-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}
