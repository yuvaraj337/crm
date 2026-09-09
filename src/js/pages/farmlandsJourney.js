// ============================================================================
// FARMLANDS CUSTOMER JOURNEY (6 SCREENS)
// Exact visual and functional reproduction of farmland-flow reference images
// ============================================================================

import { renderHeader, initStickyNav } from '../components/header.js';
import { renderFooter, initScrollTop } from '../components/footer.js';

/* ═══════════════════ DATA MODELS ═══════════════════ */
export const farmlandsData = [
  {
    id: 'green-valley-farms',
    name: 'Green Valley Farms',
    location: 'Chevella, Hyderabad',
    tagline: 'A perfect blend of nature and investment.',
    area: '2.5 Acres',
    dimensions: '120 ft (Length) × 100 ft (Breadth)',
    dimensionsShort: '120 ft (L) × 100 ft (B)',
    price: '₹ 75 Lakhs',
    pricePerAcre: '₹ 30 Lakhs / Acre',
    landType: 'Agricultural',
    soilType: 'Red Soil',
    facing: 'East Facing',
    roadAccess: '30 ft Wide Road',
    waterSource: 'Borewell',
    electricity: 'Available',
    ownership: 'Clear Title',
    status: 'Available',
    image: '/images/farmlands/farm-green-valley.jpg',
    heroImage: '/images/farmlands/details-hero-green-valley.jpg',
    tags: [
      { name: 'Red Soil', icon: 'soil' },
      { name: 'Near Highway', icon: 'highway' }
    ],
    keyFeatures: [
      { text: 'Fertile red soil', icon: 'sprout' },
      { text: 'Suitable for organic farming', icon: 'barn' },
      { text: 'Coconut & mango trees', icon: 'tree' },
      { text: 'Peaceful environment', icon: 'wind' },
      { text: 'Good road connectivity', icon: 'road' },
      { text: 'High appreciation potential', icon: 'trending' }
    ],
    thumbs: [
      '/images/farmlands/thumb-1.jpg',
      '/images/farmlands/thumb-2.jpg',
      '/images/farmlands/thumb-3.jpg',
      '/images/farmlands/thumb-4.jpg',
      '/images/farmlands/thumb-5-more.jpg'
    ]
  },
  {
    id: 'natures-nest',
    name: "Nature's Nest",
    location: 'Shankarpally, Hyderabad',
    tagline: 'Pristine mango groves and countryside tranquility.',
    area: '5 Acres',
    dimensions: '220 ft (Length) × 100 ft (Breadth)',
    dimensionsShort: '220 ft (L) × 100 ft (B)',
    price: '₹ 1.25 Crore',
    pricePerAcre: '₹ 25 Lakhs / Acre',
    landType: 'Agricultural',
    soilType: 'Red Soil',
    facing: 'North Facing',
    roadAccess: '33 ft Wide Road',
    waterSource: 'Borewell & Canal',
    electricity: 'Available',
    ownership: 'Clear Title',
    status: 'Available',
    image: '/images/farmlands/farm-natures-nest.jpg',
    heroImage: '/images/farmlands/farm-natures-nest.jpg',
    tags: [
      { name: 'Mango Plantation', icon: 'tree' },
      { name: 'Peaceful Location', icon: 'wind' }
    ],
    keyFeatures: [
      { text: 'Fertile red soil', icon: 'sprout' },
      { text: 'Suitable for organic farming', icon: 'barn' },
      { text: 'Mango trees plantation', icon: 'tree' },
      { text: 'Peaceful environment', icon: 'wind' },
      { text: 'Good road connectivity', icon: 'road' },
      { text: 'High appreciation potential', icon: 'trending' }
    ],
    thumbs: [
      '/images/farmlands/thumb-1.jpg',
      '/images/farmlands/thumb-2.jpg',
      '/images/farmlands/thumb-3.jpg',
      '/images/farmlands/thumb-4.jpg',
      '/images/farmlands/thumb-5-more.jpg'
    ]
  },
  {
    id: 'siri-agro-farms',
    name: 'Siri Agro Farms',
    location: 'Maheshwaram, Hyderabad',
    tagline: 'Thriving coconut plantations close to upcoming corridors.',
    area: '3 Acres',
    dimensions: '150 ft (Length) × 87 ft (Breadth)',
    dimensionsShort: '150 ft (L) × 87 ft (B)',
    price: '₹ 90 Lakhs',
    pricePerAcre: '₹ 30 Lakhs / Acre',
    landType: 'Agricultural',
    soilType: 'Red Loam',
    facing: 'East Facing',
    roadAccess: '40 ft Wide Road',
    waterSource: 'Borewell',
    electricity: 'Available',
    ownership: 'Clear Title',
    status: 'Available',
    image: '/images/farmlands/farm-siri-agro.jpg',
    heroImage: '/images/farmlands/farm-siri-agro.jpg',
    tags: [
      { name: 'Coconut Trees', icon: 'palm' },
      { name: 'Water Source', icon: 'water' }
    ],
    keyFeatures: [
      { text: 'Fertile red soil', icon: 'sprout' },
      { text: 'Suitable for organic farming', icon: 'barn' },
      { text: 'Coconut trees plantation', icon: 'tree' },
      { text: 'Peaceful environment', icon: 'wind' },
      { text: 'Good road connectivity', icon: 'road' },
      { text: 'High appreciation potential', icon: 'trending' }
    ],
    thumbs: [
      '/images/farmlands/thumb-1.jpg',
      '/images/farmlands/thumb-2.jpg',
      '/images/farmlands/thumb-3.jpg',
      '/images/farmlands/thumb-4.jpg',
      '/images/farmlands/thumb-5-more.jpg'
    ]
  }
];

/* ═══════════════════ APPLICATION STATE ═══════════════════ */
let activePhotoIdx = 1;

let enquiryFormState = {
  name: 'Siva Prasad',
  phone: '98765 43210',
  email: 'sivaprasad@gmail.com',
  interest: 'Green Valley Farms',
  message: 'I would like to know more details about this farmland.'
};

let siteVisitFormState = {
  name: 'Siva Prasad',
  phone: '98765 43210',
  date: '12-09-2026',
  time: '10:00 AM - 12:00 PM',
  message: 'I would like to visit this farmland.'
};

/* ═══════════════════ NAVIGATION HELPER ═══════════════════ */
if (typeof window !== 'undefined') {
  window._farmlandNav = function(path) {
    window.location.hash = path.startsWith('#') ? path : `#${path}`;
  };
}

/* ═══════════════════ SVG ICONS ═══════════════════ */
function renderFeatureIcon(type) {
  switch (type) {
    case 'sprout':
    case 'soil':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-9"/><path d="M9 13a4 4 0 0 1 8 0"/><path d="M5 8a5 5 0 0 1 7 5"/><path d="M19 8a5 5 0 0 0-7 5"/></svg>`;
    case 'barn':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10L12 3l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22v-8h6v8"/></svg>`;
    case 'tree':
    case 'palm':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-8"/><path d="M12 14c-3.5 0-6-2.5-6-6 0-3 3-5 6-5s6 2 6 5c0 3.5-2.5 6-6 6z"/></svg>`;
    case 'wind':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>`;
    case 'road':
    case 'highway':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19L9 5"/><path d="M20 19l-5-14"/><path d="M12 7v2"/><path d="M12 13v2"/><path d="M12 19v2"/></svg>`;
    case 'water':
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`;
    case 'trending':
    default:
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h1M14 10h1M9 14h1M14 14h1M9 18h1M14 18h1"/></svg>`;
  }
}

const PIN_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
const AREA_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
const DIM_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`;
const HEART_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
const ARROW_RIGHT = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
const CALENDAR_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
const GOOGLE_MAPS_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EA4335"/><circle cx="12" cy="9" r="2.5" fill="#FFFFFF"/></svg>`;
const HOME_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;

/* ═══════════════════ ROUTE PARSER ═══════════════════ */
function parseFarmlandRoute(pathStr) {
  const p = pathStr.replace(/^#/, '').split('?')[0];

  if (p === '/farmlands' || p === '/farmlands/') {
    return { screen: 'listing' };
  }

  // 04-enquiry-confirmation.jpg
  if (p.includes('/enquiry-success')) {
    const m = p.match(/\/farmlands\/([^/]+)\/enquiry-success/);
    return { screen: 'enquiry-success', id: m ? m[1] : 'green-valley-farms' };
  }

  // 06-site-visit-confirmation.jpg
  if (p.includes('/site-visit-success')) {
    const m = p.match(/\/farmlands\/([^/]+)\/site-visit-success/);
    return { screen: 'site-visit-success', id: m ? m[1] : 'green-valley-farms' };
  }

  // 03-send-enquiry-form.jpg
  if (p.includes('/enquiry')) {
    const m = p.match(/\/farmlands\/([^/]+)\/enquiry/);
    return { screen: 'enquiry', id: m ? m[1] : 'green-valley-farms' };
  }

  // 05-book-site-visit-form.jpg
  if (p.includes('/site-visit')) {
    const m = p.match(/\/farmlands\/([^/]+)\/site-visit/);
    return { screen: 'site-visit', id: m ? m[1] : 'green-valley-farms' };
  }

  // 02-farmland-details-page.jpg
  const detMatch = p.match(/\/farmlands\/([^/]+)/);
  if (detMatch && detMatch[1]) {
    return { screen: 'details', id: detMatch[1] };
  }

  return { screen: 'listing' };
}

/* ═══════════════════ MAIN EXPORT ═══════════════════ */
export function renderFarmlandsPage(pathStr = '/farmlands') {
  const { screen, id } = parseFarmlandRoute(pathStr);
  const farm = farmlandsData.find(f => f.id === id) || farmlandsData[0];

  const html = `
    <div class="farmlands-journey-app" id="farmlands-journey-root">
      ${renderHeader({ currentPath: '#/farmlands' })}
      <main class="farmlands-journey-main" id="farmlands-screen-host">
        ${renderScreenContent(screen, farm)}
      </main>
      ${renderFooter()}
    </div>
  `;

  return {
    html,
    init: () => {
      initStickyNav();
      initScrollTop();
      attachFarmlandEvents(screen, farm);
    }
  };
}

function renderScreenContent(screen, farm) {
  switch (screen) {
    case 'details':
      return renderScreenDetails(farm);
    case 'enquiry':
      return renderScreenEnquiry(farm);
    case 'enquiry-success':
      return renderScreenEnquirySuccess(farm);
    case 'site-visit':
      return renderScreenSiteVisit(farm);
    case 'site-visit-success':
      return renderScreenSiteVisitSuccess(farm);
    default:
      return renderScreenListing();
  }
}

/* ═════════════════════════════════════════════════════════
   STEP 1 — FARMLANDS LISTING (01-farmlands-listing-page.jpg)
   ═════════════════════════════════════════════════════════ */
function renderScreenListing() {
  const cardsHtml = farmlandsData.map(f => {
    const tagsHtml = f.tags.map(t => `
      <div class="farmlands-card-tag">
        ${renderFeatureIcon(t.icon)}
        <span>${t.name}</span>
      </div>
    `).join('');

    return `
      <div class="farmlands-card" onclick="window._farmlandNav('/farmlands/${f.id}')" data-id="${f.id}">
        <div class="farmlands-card-img-wrap">
          <img src="${f.image}" alt="${f.name}" class="farmlands-card-img" loading="lazy" />
          <button type="button" class="farmlands-card-fav" onclick="event.stopPropagation(); this.classList.toggle('active')" aria-label="Favorite">
            ${HEART_ICON}
          </button>
        </div>
        <div class="farmlands-card-body">
          <div class="farmlands-card-header">
            <h3 class="farmlands-card-title">${f.name}</h3>
            <span class="farmlands-badge-available">
              <span class="farmlands-badge-dot"></span> Available
            </span>
          </div>
          <div class="farmlands-card-loc">
            ${PIN_ICON} <span>${f.location}</span>
          </div>
          <div class="farmlands-card-meta-row">
            ${AREA_ICON} <span>${f.area}</span>
          </div>
          <div class="farmlands-card-meta-row">
            ${DIM_ICON} <span>${f.dimensionsShort}</span>
          </div>

          <div class="farmlands-card-price-row">
            <div class="farmlands-card-price-box">
              <span class="farmlands-card-price">${f.price}</span>
              <span class="farmlands-card-price-sub">(${f.pricePerAcre})</span>
            </div>
            <div class="farmlands-card-arrow-btn">
              ${ARROW_RIGHT}
            </div>
          </div>

          <div class="farmlands-card-tags">
            ${tagsHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="farmlands-listing-page">
      <div class="farmlands-container">
        <!-- Breadcrumb -->
        <nav class="farmlands-breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="sep">&gt;</span>
          <a href="#/projects">Projects</a>
          <span class="sep">&gt;</span>
          <span class="current">Farmlands</span>
        </nav>

        <!-- Header -->
        <div class="farmlands-header-area">
          <h1 class="farmlands-title">Farmlands</h1>
          <p class="farmlands-tagline">Escape to nature. Invest in a healthier tomorrow.</p>
          <p class="farmlands-subtitle">Premium farmlands in serene locations with clear titles and great potential.</p>
        </div>

        <!-- Filter Bar -->
        <div class="farmlands-filter-bar">
          <div class="farmlands-filter-left">
            <select class="farmlands-select" id="farm-budget">
              <option value="">Any Budget</option>
              <option value="under-1cr">Under ₹ 1 Cr</option>
              <option value="above-1cr">Above ₹ 1 Cr</option>
            </select>
            <select class="farmlands-select" id="farm-location">
              <option value="">Any Location</option>
              <option value="chevella">Chevella</option>
              <option value="shankarpally">Shankarpally</option>
              <option value="maheshwaram">Maheshwaram</option>
            </select>
            <select class="farmlands-select" id="farm-area">
              <option value="">Any Area</option>
              <option value="2-3">2 - 3 Acres</option>
              <option value="5-plus">5+ Acres</option>
            </select>
            <select class="farmlands-select" id="farm-facing">
              <option value="">Any Facing</option>
              <option value="east">East Facing</option>
              <option value="north">North Facing</option>
            </select>
            <button type="button" class="farmlands-btn-apply" id="farm-apply-btn">Apply Filters</button>
          </div>

          <div class="farmlands-filter-right">
            <span>Sort By:</span>
            <select class="farmlands-select" style="min-width: 110px;" id="farm-sort">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <!-- 3 Cards Grid -->
        <div class="farmlands-grid">
          ${cardsHtml}
        </div>
      </div>
    </div>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 2 — FARMLAND DETAILS (02-farmland-details-page.jpg)
   ═════════════════════════════════════════════════════════ */
function renderScreenDetails(farm) {
  const thumbsHtml = farm.thumbs.map((thumb, idx) => `
    <div class="farmlands-thumb-box ${idx + 1 === activePhotoIdx ? 'active' : ''}" onclick="window._setFarmlandPhoto('${thumb}', ${idx + 1})">
      <img src="${thumb}" alt="Thumbnail ${idx + 1}" class="farmlands-thumb-img" />
      ${idx === 4 ? '<div class="farmlands-thumb-more-overlay">+ 5 Photos</div>' : ''}
    </div>
  `).join('');

  const featuresHtml = farm.keyFeatures.map(feat => `
    <div class="farmlands-feature-item">
      <div class="farmlands-feature-icon">
        ${renderFeatureIcon(feat.icon)}
      </div>
      <span>${feat.text}</span>
    </div>
  `).join('');

  return `
    <div class="farmlands-details-page">
      <div class="farmlands-container">
        <!-- Breadcrumb -->
        <nav class="farmlands-breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="sep">&gt;</span>
          <a href="#/projects">Projects</a>
          <span class="sep">&gt;</span>
          <a href="#/farmlands">Farmlands</a>
          <span class="sep">&gt;</span>
          <span class="current">${farm.name}</span>
        </nav>

        <div class="farmlands-details-grid">
          <!-- Column 1: Gallery -->
          <div class="farmlands-gallery-col">
            <div class="farmlands-main-photo-wrap">
              <img src="${farm.heroImage}" alt="${farm.name}" class="farmlands-main-photo" id="farmland-main-photo" />
              <button type="button" class="farmlands-photo-arrow prev" onclick="window._prevFarmlandPhoto()" aria-label="Previous photo">&lsaquo;</button>
              <button type="button" class="farmlands-photo-arrow next" onclick="window._nextFarmlandPhoto()" aria-label="Next photo">&rsaquo;</button>
              <span class="farmlands-counter-pill" id="farmlands-counter">${activePhotoIdx}/8</span>
            </div>

            <!-- 5 Thumbnails -->
            <div class="farmlands-thumbs-strip">
              ${thumbsHtml}
            </div>
          </div>

          <!-- Column 2: Info & Specs Table -->
          <div class="farmlands-info-col">
            <div class="farmlands-details-header">
              <h1 class="farmlands-details-title">${farm.name}</h1>
              <span class="farmlands-badge-available">
                <span class="farmlands-badge-dot"></span> ${farm.status}
              </span>
            </div>

            <div class="farmlands-details-loc">
              ${PIN_ICON} <span>${farm.location}</span>
            </div>

            <p class="farmlands-details-tagline">${farm.tagline}</p>

            <div class="farmlands-details-price">${farm.price}</div>
            <div class="farmlands-details-price-sub">(${farm.pricePerAcre})</div>

            <!-- 10-Item Specifications Table -->
            <div class="farmlands-specs-table">
              <div class="farmlands-spec-row">
                <div class="farmlands-spec-icon-box">${AREA_ICON}</div>
                <div class="farmlands-spec-label">Area</div>
                <div class="farmlands-spec-value">${farm.area}</div>
              </div>

              <div class="farmlands-spec-row">
                <div class="farmlands-spec-icon-box">${DIM_ICON}</div>
                <div class="farmlands-spec-label">Dimensions</div>
                <div class="farmlands-spec-value">${farm.dimensions}</div>
              </div>

              <div class="farmlands-spec-row">
                <div class="farmlands-spec-icon-box">${renderFeatureIcon('barn')}</div>
                <div class="farmlands-spec-label">Land Type</div>
                <div class="farmlands-spec-value">${farm.landType}</div>
              </div>

              <div class="farmlands-spec-row">
                <div class="farmlands-spec-icon-box">${renderFeatureIcon('sprout')}</div>
                <div class="farmlands-spec-label">Soil Type</div>
                <div class="farmlands-spec-value">${farm.soilType}</div>
              </div>

              <div class="farmlands-spec-row">
                <div class="farmlands-spec-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                </div>
                <div class="farmlands-spec-label">Facing</div>
                <div class="farmlands-spec-value">${farm.facing}</div>
              </div>

              <div class="farmlands-spec-row">
                <div class="farmlands-spec-icon-box">${renderFeatureIcon('road')}</div>
                <div class="farmlands-spec-label">Road Access</div>
                <div class="farmlands-spec-value">${farm.roadAccess}</div>
              </div>

              <div class="farmlands-spec-row">
                <div class="farmlands-spec-icon-box">${renderFeatureIcon('water')}</div>
                <div class="farmlands-spec-label">Water Source</div>
                <div class="farmlands-spec-value">${farm.waterSource}</div>
              </div>

              <div class="farmlands-spec-row">
                <div class="farmlands-spec-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div class="farmlands-spec-label">Electricity</div>
                <div class="farmlands-spec-value">${farm.electricity}</div>
              </div>

              <div class="farmlands-spec-row">
                <div class="farmlands-spec-icon-box">${PIN_ICON}</div>
                <div class="farmlands-spec-label">Location</div>
                <div class="farmlands-spec-value">${farm.location}</div>
              </div>

              <div class="farmlands-spec-row">
                <div class="farmlands-spec-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div class="farmlands-spec-label">Ownership</div>
                <div class="farmlands-spec-value">${farm.ownership}</div>
              </div>
            </div>
          </div>

          <!-- Column 3: Actions & Key Features -->
          <div class="farmlands-action-col">
            <div class="farmlands-action-buttons">
              <button type="button" class="farmlands-btn-primary" onclick="window._farmlandNav('/farmlands/${farm.id}/enquiry')">
                <span>Send Enquiry</span>
                ${ARROW_RIGHT}
              </button>
              <button type="button" class="farmlands-btn-outline" onclick="window._farmlandNav('/farmlands/${farm.id}/site-visit')">
                ${CALENDAR_ICON}
                <span>Book a Site Visit</span>
              </button>
              <a href="https://maps.google.com/?q=${encodeURIComponent(farm.location)}" target="_blank" rel="noopener noreferrer" class="farmlands-btn-outline">
                ${GOOGLE_MAPS_ICON}
                <span>View on Google Maps</span>
              </a>
            </div>

            <div class="farmlands-features-card">
              <h3 class="farmlands-features-title">Key Features</h3>
              <div class="farmlands-features-list">
                ${featuresHtml}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 3 — SEND ENQUIRY FORM (03-send-enquiry-form.jpg)
   ═════════════════════════════════════════════════════════ */
function renderScreenEnquiry(farm) {
  const featuresHtml = farm.keyFeatures.map(feat => `
    <div class="farmlands-feature-item">
      <div class="farmlands-feature-icon">
        ${renderFeatureIcon(feat.icon)}
      </div>
      <span>${feat.text}</span>
    </div>
  `).join('');

  return `
    <div class="farmlands-form-page">
      <div class="farmlands-container">
        <!-- Breadcrumb -->
        <nav class="farmlands-breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="sep">&gt;</span>
          <a href="#/projects">Projects</a>
          <span class="sep">&gt;</span>
          <a href="#/farmlands">Farmlands</a>
          <span class="sep">&gt;</span>
          <a href="#/farmlands/${farm.id}">${farm.name}</a>
          <span class="sep">&gt;</span>
          <span class="current">Send Enquiry</span>
        </nav>

        <div class="farmlands-form-layout">
          <!-- Left Column: Selected Property Summary Card -->
          <div class="farmlands-prop-summary-card">
            <div class="farmlands-summary-img-wrap">
              <img src="${farm.heroImage}" alt="${farm.name}" class="farmlands-summary-img" />
            </div>

            <div class="farmlands-summary-header">
              <h2 class="farmlands-summary-title">${farm.name}</h2>
              <span class="farmlands-badge-available">
                <span class="farmlands-badge-dot"></span> Available
              </span>
            </div>

            <div class="farmlands-summary-loc">
              ${PIN_ICON} <span>${farm.location}</span>
            </div>

            <div class="farmlands-summary-meta">
              ${AREA_ICON} <span>${farm.area}</span>
            </div>

            <div class="farmlands-summary-meta">
              ${DIM_ICON} <span>${farm.dimensionsShort}</span>
            </div>

            <div class="farmlands-summary-price">${farm.price}</div>
            <div class="farmlands-summary-price-sub">(${farm.pricePerAcre})</div>

            <div class="farmlands-features-card" style="padding: 14px 0 0; background: transparent; border: none; border-top: 1px solid #E5E7EB;">
              <h3 class="farmlands-features-title" style="font-size: 1.05rem; margin-bottom: 10px;">Key Features</h3>
              <div class="farmlands-features-list">
                ${featuresHtml}
              </div>
            </div>
          </div>

          <!-- Right Column: Enquiry Form -->
          <div class="farmlands-form-box">
            <h1 class="farmlands-form-title">Send Enquiry</h1>
            <p class="farmlands-form-subtitle">Fill in your details and our team will get in touch with you shortly.</p>

            <form id="farm-enquiry-form" onsubmit="window._submitFarmlandEnquiry(event, '${farm.id}')">
              <div class="farmlands-form-group">
                <label class="farmlands-form-label">Selected Property</label>
                <input type="text" class="farmlands-input" readonly value="${farm.name} - ${farm.area}, ${farm.location.split(',')[0]}" />
              </div>

              <div class="farmlands-form-group">
                <label class="farmlands-form-label">Full Name <span class="req">*</span></label>
                <input type="text" class="farmlands-input" id="farm-enq-name" required value="${enquiryFormState.name}" />
              </div>

              <div class="farmlands-form-group">
                <label class="farmlands-form-label">Phone Number <span class="req">*</span></label>
                <input type="tel" class="farmlands-input" id="farm-enq-phone" required value="${enquiryFormState.phone}" />
              </div>

              <div class="farmlands-form-group">
                <label class="farmlands-form-label">Email Address</label>
                <input type="email" class="farmlands-input" id="farm-enq-email" value="${enquiryFormState.email}" />
              </div>

              <div class="farmlands-form-group">
                <label class="farmlands-form-label">Your Interest <span class="req">*</span></label>
                <select class="farmlands-form-select" id="farm-enq-interest">
                  <option value="Green Valley Farms" ${farm.id === 'green-valley-farms' ? 'selected' : ''}>Green Valley Farms</option>
                  <option value="Nature's Nest" ${farm.id === 'natures-nest' ? 'selected' : ''}>Nature's Nest</option>
                  <option value="Siri Agro Farms" ${farm.id === 'siri-agro-farms' ? 'selected' : ''}>Siri Agro Farms</option>
                </select>
              </div>

              <div class="farmlands-form-group">
                <label class="farmlands-form-label">Message (Optional)</label>
                <textarea class="farmlands-textarea" id="farm-enq-msg">${enquiryFormState.message}</textarea>
              </div>

              <label class="farmlands-checkbox-wrap">
                <input type="checkbox" id="farm-enq-consent" checked required />
                <span>I agree to be contacted by VR Real Estates.</span>
              </label>

              <button type="submit" class="farmlands-btn-primary">
                <span>Submit Enquiry</span>
                ${ARROW_RIGHT}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 4 — ENQUIRY CONFIRMATION (04-enquiry-confirmation.jpg)
   ═════════════════════════════════════════════════════════ */
function renderScreenEnquirySuccess(farm) {
  return `
    <div class="farmlands-conf-page">
      <div class="farmlands-container">
        <div class="farmlands-conf-card">
          <!-- Checkmark & Confetti Header -->
          <div class="farmlands-conf-checkmark-wrap">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h1 class="farmlands-conf-title">Enquiry Submitted Successfully!</h1>
          <p class="farmlands-conf-subtitle">
            Thank you for your interest.<br />
            Our team will get in touch with you shortly.
          </p>

          <!-- Enquiry Details Card -->
          <div class="farmlands-conf-details-box">
            <div class="farmlands-conf-details-title">Enquiry Details</div>
            
            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Project</span>
              <span class="farmlands-conf-val">${farm.name}</span>
            </div>

            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Location</span>
              <span class="farmlands-conf-val">${farm.location}</span>
            </div>

            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Area</span>
              <span class="farmlands-conf-val">${farm.area}</span>
            </div>

            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Dimensions</span>
              <span class="farmlands-conf-val">${farm.dimensionsShort}</span>
            </div>

            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Name</span>
              <span class="farmlands-conf-val">${enquiryFormState.name}</span>
            </div>

            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Phone</span>
              <span class="farmlands-conf-val">${enquiryFormState.phone}</span>
            </div>

            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Email</span>
              <span class="farmlands-conf-val">${enquiryFormState.email}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="farmlands-conf-actions">
            <button type="button" class="farmlands-btn-outline" onclick="window._farmlandNav('/farmlands/${farm.id}')">
              Back to Project
            </button>
            <button type="button" class="farmlands-btn-outline" onclick="window.location.hash='#/'">
              ${HOME_ICON}
              <span>Go to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 5 — BOOK A SITE VISIT FORM (05-book-site-visit-form.jpg)
   ═════════════════════════════════════════════════════════ */
function renderScreenSiteVisit(farm) {
  const featuresHtml = farm.keyFeatures.map(feat => `
    <div class="farmlands-feature-item">
      <div class="farmlands-feature-icon">
        ${renderFeatureIcon(feat.icon)}
      </div>
      <span>${feat.text}</span>
    </div>
  `).join('');

  return `
    <div class="farmlands-form-page">
      <div class="farmlands-container">
        <!-- Breadcrumb -->
        <nav class="farmlands-breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="sep">&gt;</span>
          <a href="#/projects">Projects</a>
          <span class="sep">&gt;</span>
          <a href="#/farmlands">Farmlands</a>
          <span class="sep">&gt;</span>
          <a href="#/farmlands/${farm.id}">${farm.name}</a>
          <span class="sep">&gt;</span>
          <span class="current">Book a Site Visit</span>
        </nav>

        <div class="farmlands-form-layout">
          <!-- Left Column: Selected Property Card -->
          <div class="farmlands-prop-summary-card">
            <div class="farmlands-summary-img-wrap">
              <img src="${farm.heroImage}" alt="${farm.name}" class="farmlands-summary-img" />
            </div>

            <div class="farmlands-summary-header">
              <h2 class="farmlands-summary-title">${farm.name}</h2>
              <span class="farmlands-badge-available">
                <span class="farmlands-badge-dot"></span> Available
              </span>
            </div>

            <div class="farmlands-summary-loc">
              ${PIN_ICON} <span>${farm.location}</span>
            </div>

            <div class="farmlands-summary-meta">
              ${AREA_ICON} <span>${farm.area}</span>
            </div>

            <div class="farmlands-summary-meta">
              ${DIM_ICON} <span>${farm.dimensionsShort}</span>
            </div>

            <div class="farmlands-summary-price">${farm.price}</div>
            <div class="farmlands-summary-price-sub">(${farm.pricePerAcre})</div>

            <div class="farmlands-features-card" style="padding: 14px 0 0; background: transparent; border: none; border-top: 1px solid #E5E7EB;">
              <h3 class="farmlands-features-title" style="font-size: 1.05rem; margin-bottom: 10px;">Key Features</h3>
              <div class="farmlands-features-list">
                ${featuresHtml}
              </div>
            </div>
          </div>

          <!-- Right Column: Site Visit Form -->
          <div class="farmlands-form-box">
            <h1 class="farmlands-form-title">Book a Site Visit</h1>
            <p class="farmlands-form-subtitle">Schedule a visit to experience this farmland in person.</p>

            <form id="farm-visit-form" onsubmit="window._submitFarmlandVisit(event, '${farm.id}')">
              <div class="farmlands-form-group">
                <label class="farmlands-form-label">Selected Property</label>
                <input type="text" class="farmlands-input" readonly value="${farm.name} - ${farm.area}, ${farm.location.split(',')[0]}" />
              </div>

              <div class="farmlands-form-group">
                <label class="farmlands-form-label">Full Name <span class="req">*</span></label>
                <input type="text" class="farmlands-input" id="farm-visit-name" required value="${siteVisitFormState.name}" />
              </div>

              <div class="farmlands-form-group">
                <label class="farmlands-form-label">Phone Number <span class="req">*</span></label>
                <input type="tel" class="farmlands-input" id="farm-visit-phone" required value="${siteVisitFormState.phone}" />
              </div>

              <div class="farmlands-form-group">
                <label class="farmlands-form-label">Preferred Date <span class="req">*</span></label>
                <input type="date" class="farmlands-input" id="farm-visit-date" required value="${siteVisitFormState.date.includes('-') && siteVisitFormState.date.length === 10 && siteVisitFormState.date[2] === '-' ? siteVisitFormState.date.split('-').reverse().join('-') : siteVisitFormState.date}" />
              </div>

              <div class="farmlands-form-group">
                <label class="farmlands-form-label">Preferred Time Slot <span class="req">*</span></label>
                <select class="farmlands-form-select" id="farm-visit-slot">
                  <option value="10:00 AM - 12:00 PM" ${siteVisitFormState.time === '10:00 AM - 12:00 PM' ? 'selected' : ''}>10:00 AM - 12:00 PM</option>
                  <option value="12:00 PM - 02:00 PM" ${siteVisitFormState.time === '12:00 PM - 02:00 PM' ? 'selected' : ''}>12:00 PM - 02:00 PM</option>
                  <option value="02:00 PM - 04:00 PM" ${siteVisitFormState.time === '02:00 PM - 04:00 PM' ? 'selected' : ''}>02:00 PM - 04:00 PM</option>
                  <option value="04:00 PM - 06:00 PM" ${siteVisitFormState.time === '04:00 PM - 06:00 PM' ? 'selected' : ''}>04:00 PM - 06:00 PM</option>
                </select>
              </div>

              <div class="farmlands-form-group">
                <label class="farmlands-form-label">Message (Optional)</label>
                <textarea class="farmlands-textarea" id="farm-visit-msg">${siteVisitFormState.message}</textarea>
              </div>

              <button type="submit" class="farmlands-btn-primary" style="margin-top: 10px;">
                <span>Confirm Site Visit</span>
                ${ARROW_RIGHT}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 6 — SITE VISIT CONFIRMATION (06-site-visit-confirmation.jpg)
   ═════════════════════════════════════════════════════════ */
function renderScreenSiteVisitSuccess(farm) {
  return `
    <div class="farmlands-conf-page">
      <div class="farmlands-container">
        <div class="farmlands-conf-card">
          <!-- Checkmark Header -->
          <div class="farmlands-conf-checkmark-wrap">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h1 class="farmlands-conf-title">Site Visit Booked Successfully!</h1>
          <p class="farmlands-conf-subtitle">
            We have scheduled your site visit.<br />
            Our team will contact you to confirm the details.
          </p>

          <!-- Visit Details Card -->
          <div class="farmlands-conf-details-box">
            <div class="farmlands-conf-details-title">Visit Details</div>
            
            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Project</span>
              <span class="farmlands-conf-val">${farm.name}</span>
            </div>

            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Location</span>
              <span class="farmlands-conf-val">${farm.location}</span>
            </div>

            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Area</span>
              <span class="farmlands-conf-val">${farm.area}</span>
            </div>

            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Dimensions</span>
              <span class="farmlands-conf-val">${farm.dimensionsShort}</span>
            </div>

            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Name</span>
              <span class="farmlands-conf-val">${siteVisitFormState.name}</span>
            </div>

            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Phone</span>
              <span class="farmlands-conf-val">${siteVisitFormState.phone}</span>
            </div>

            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Date</span>
              <span class="farmlands-conf-val">${siteVisitFormState.date}</span>
            </div>

            <div class="farmlands-conf-row">
              <span class="farmlands-conf-label">Time</span>
              <span class="farmlands-conf-val">${siteVisitFormState.time}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="farmlands-conf-actions">
            <button type="button" class="farmlands-btn-outline" onclick="window._farmlandNav('/farmlands/${farm.id}')">
              Back to Project
            </button>
            <button type="button" class="farmlands-btn-outline" onclick="window.location.hash='#/'">
              ${HOME_ICON}
              <span>Go to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ═══════════════════ EVENT ATTACHMENTS ═══════════════════ */
function attachFarmlandEvents(screen, farm) {
  // Gallery photo switcher
  window._setFarmlandPhoto = function(src, num) {
    activePhotoIdx = num;
    const mainPhoto = document.getElementById('farmland-main-photo');
    if (mainPhoto) mainPhoto.src = src;
    const counter = document.getElementById('farmlands-counter');
    if (counter) counter.textContent = `${num}/8`;

    document.querySelectorAll('.farmlands-thumb-box').forEach((box, i) => {
      box.classList.toggle('active', (i + 1) === num);
    });
  };

  window._prevFarmlandPhoto = function() {
    let nextIdx = activePhotoIdx - 1;
    if (nextIdx < 1) nextIdx = farm.thumbs.length;
    window._setFarmlandPhoto(farm.thumbs[nextIdx - 1], nextIdx);
  };

  window._nextFarmlandPhoto = function() {
    let nextIdx = activePhotoIdx + 1;
    if (nextIdx > farm.thumbs.length) nextIdx = 1;
    window._setFarmlandPhoto(farm.thumbs[nextIdx - 1], nextIdx);
  };

  window._submitFarmlandEnquiry = function(e, farmId) {
    e.preventDefault();
    const name = document.getElementById('farm-enq-name')?.value || '';
    const phone = document.getElementById('farm-enq-phone')?.value || '';
    const email = document.getElementById('farm-enq-email')?.value || '';
    const interest = document.getElementById('farm-enq-interest')?.value || '';
    const msg = document.getElementById('farm-enq-msg')?.value || '';

    enquiryFormState = { name, phone, email, interest, message: msg };
    window._farmlandNav(`/farmlands/${farmId}/enquiry-success`);
  };

  window._submitFarmlandVisit = function(e, farmId) {
    e.preventDefault();
    const name = document.getElementById('farm-visit-name')?.value || '';
    const phone = document.getElementById('farm-visit-phone')?.value || '';
    const rawDate = document.getElementById('farm-visit-date')?.value || '';
    let displayDate = rawDate;
    if (rawDate && rawDate.includes('-') && rawDate.split('-')[0].length === 4) {
      // YYYY-MM-DD to DD-MM-YYYY
      displayDate = rawDate.split('-').reverse().join('-');
    }
    const slot = document.getElementById('farm-visit-slot')?.value || '10:00 AM - 12:00 PM';
    const msg = document.getElementById('farm-visit-msg')?.value || '';

    siteVisitFormState = {
      name,
      phone,
      date: displayDate || '12-09-2026',
      time: slot,
      message: msg
    };
    window._farmlandNav(`/farmlands/${farmId}/site-visit-success`);
  };
}
