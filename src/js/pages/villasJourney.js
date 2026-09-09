// ============================================================================
// VILLAS CUSTOMER JOURNEY (6 SCREENS)
// Exact visual and functional reproduction of reference designs
// ============================================================================

import { renderHeader, initStickyNav } from '../components/header.js';
import { renderFooter, initScrollTop } from '../components/footer.js';
import { renderMasterPlanSvgCode, initVillaMasterPlan } from '../components/villaMasterPlan.js';

/* ═══════════════════ APPLICATION STATE ═══════════════════ */
let selectedFilter = 'all';
let searchQuery = '';
let activeCatIdx = 0;
let activeSlideIdx = 1;
let enquiryFormData = {
  name: '',
  phone: '',
  email: '',
  date: '',
  message: 'I am interested in Villa V08 at VR Green Villas.'
};
let siteVisitFormData = {
  name: '',
  phone: '',
  email: '',
  date: '',
  timeSlot: '10:00 AM - 12:00 PM',
  message: ''
};

let currentVillaUnit = {
  id: 'v08',
  num: 'V08',
  title: 'Villa V08 • 4 BHK',
  projectName: 'VR Green Villas',
  projectId: 'vr-green-villas',
  location: 'Kompally, Hyderabad',
  price: '₹ 2.50 Cr',
  priceSub: '(All Inclusive)',
  status: 'Available',
  area: '3200 Sq.Ft',
  facing: 'West Facing',
  bedrooms: '4',
  carParking: '3',
  bathrooms: '5',
  floors: 'G+1',
  image: '/images/villas/v08-main-clean.png',
  thumb: '/images/villas/villa-vr-green.png'
};

/* ═══════════════════ DATA MODELS ═══════════════════ */
const villasProjectsData = [
  {
    id: 'vr-green-villas',
    name: 'VR Green Villas',
    location: 'Kompally, Hyderabad',
    price: '₹ 2.50 Cr',
    bhk: '4 BHK',
    area: '3300 Sq.Ft',
    status: 'Available',
    image: '/images/villas/villa-vr-green.png',
    mobImage: '/images/villas/villa-vr-green-mob.png',
    heroImage: '/images/villas/overview-hero-arch.png',
    tagline: 'A Serene Life Awaits',
    about: 'VR Green Villas is a premium gated community offering luxurious 3 & 4 BHK villas with modern architecture, spacious living and world-class amenities. Experience a perfect blend of nature and modern living.',
    specs: {
      bhk: '4 BHK',
      area: '3200 Sq.Ft',
      facing: 'West Facing',
      bedrooms: '4 Bedrooms',
      parking: '3 Car Parking',
      bathrooms: '5 Bathrooms',
      floors: 'G+1 Floors'
    }
  },
  {
    id: 'sr-luxury-villas',
    name: 'SR Luxury Villas',
    location: 'Tellapur, Hyderabad',
    price: '₹ 2.10 Cr',
    bhk: '4 BHK',
    area: '2800 Sq.Ft',
    status: 'Available',
    image: '/images/villas/villa-sr-luxury.png',
    mobImage: '/images/villas/villa-sr-luxury-mob.png',
    heroImage: '/images/villas/overview-hero-arch.png',
    tagline: 'Elevated Luxury Living',
    about: 'SR Luxury Villas brings you exquisite architecture and landscaped gardens in Tellapur, with unmatched serenity and connectivity.',
    specs: {
      bhk: '4 BHK',
      area: '2800 Sq.Ft',
      facing: 'East Facing',
      bedrooms: '4 Bedrooms',
      parking: '2 Car Parking',
      bathrooms: '4 Bathrooms',
      floors: 'G+1 Floors'
    }
  },
  {
    id: 'natures-nest-villas',
    name: "Nature's Nest Villas",
    location: 'Shamshabad, Hyderabad',
    price: '₹ 1.85 Cr',
    bhk: '3 BHK',
    area: '2400 Sq.Ft',
    status: 'Available',
    image: '/images/villas/villa-natures-nest.png',
    mobImage: '/images/villas/villa-natures-nest.png',
    heroImage: '/images/villas/overview-hero-arch.png',
    tagline: 'Harmonious Natural Living',
    about: "Nature's Nest Villas offers sprawling green spaces and open layout villas near the international airport corridor.",
    specs: {
      bhk: '3 BHK',
      area: '2400 Sq.Ft',
      facing: 'North Facing',
      bedrooms: '3 Bedrooms',
      parking: '2 Car Parking',
      bathrooms: '3 Bathrooms',
      floors: 'G+1 Floors'
    }
  },
  {
    id: 'elite-county-villas',
    name: 'Elite County Villas',
    location: 'Kokapet, Hyderabad',
    price: '₹ 3.20 Cr',
    bhk: '4 BHK',
    area: '3500 Sq.Ft',
    status: 'Available',
    image: '/images/villas/villa-elite-county.png',
    mobImage: '/images/villas/villa-elite-county.png',
    heroImage: '/images/villas/overview-hero-arch.png',
    tagline: 'Ultra Luxury Gated Sanctuary',
    about: 'Elite County Villas is designed for modern connoisseurs offering ultra-luxurious living spaces in Kokapet financial district.',
    specs: {
      bhk: '4 BHK',
      area: '3500 Sq.Ft',
      facing: 'East Facing',
      bedrooms: '4 Bedrooms',
      parking: '3 Car Parking',
      bathrooms: '5 Bathrooms',
      floors: 'G+2 Floors'
    }
  }
];

const villaPlotsLayout = [
  // Top row
  { id: 'v01', label: 'V01', status: 'available', bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'East Facing', road: '30 ft Road' },
  { id: 'v02', label: 'V02', status: 'available', bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'East Facing', road: '30 ft Road' },
  { id: 'v03', label: 'V03', status: 'available', bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'East Facing', road: '30 ft Road' },
  { id: 'v04', label: 'V04', status: 'available', bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'East Facing', road: '30 ft Road' },
  { id: 'v05', label: 'V05', status: 'available', bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'East Facing', road: '30 ft Road' },
  // Middle row
  { id: 'v06', label: 'V06', status: 'available', bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'West Facing', road: '30 ft Road' },
  { id: 'v07', label: 'V07', status: 'available', bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'West Facing', road: '30 ft Road' },
  { id: 'v08', label: 'V08', status: 'booked', isFeatured: true, bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'West Facing', road: '30 ft Road' },
  { id: 'v09', label: 'V09', status: 'available', bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'West Facing', road: '30 ft Road' },
  { id: 'v10', label: 'V10', status: 'available', bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'West Facing', road: '30 ft Road' },
  // Bottom row
  { id: 'v11', label: 'V11', status: 'available', bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'North Facing', road: '30 ft Road' },
  { id: 'v12', label: 'V12', status: 'available', bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'North Facing', road: '30 ft Road' },
  { id: 'v13', label: 'V13', status: 'sold', bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'North Facing', road: '30 ft Road' },
  { id: 'v14', label: 'V14', status: 'available', bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'North Facing', road: '30 ft Road' },
  { id: 'v15', label: 'V15', status: 'available', bhk: '4 BHK', area: '3200 Sq.Ft', price: '₹ 2.50 Cr', facing: 'North Facing', road: '30 ft Road' }
];

const villaCategories = [
  { key: 'exterior', name: 'Exterior', image: '/images/villas/v08-main-clean.png', thumb: '/images/villas/v08-thumb-exterior.png' },
  { key: 'living', name: 'Living Room', image: '/images/villas/v08-sub-1.png', thumb: '/images/villas/v08-thumb-living.png' },
  { key: 'master-bedroom', name: 'Master Bedroom', image: '/images/villas/v08-sub-2.png', thumb: '/images/villas/v08-thumb-master-bedroom.png' },
  { key: 'children-bedroom', name: 'Children Bedroom', image: '/images/villas/v08-sub-3.png', thumb: '/images/villas/v08-thumb-children-bedroom.png' },
  { key: 'kitchen', name: 'Kitchen', image: '/images/villas/v08-sub-4.png', thumb: '/images/villas/v08-thumb-kitchen.png' },
  { key: 'dining', name: 'Dining', image: '/images/villas/v08-main-clean.png', thumb: '/images/villas/v08-thumb-dining.png' },
  { key: 'bathroom', name: 'Bathroom', image: '/images/villas/v08-sub-2.png', thumb: '/images/villas/v08-thumb-bathroom.png' },
  { key: 'garden', name: 'Garden', image: '/images/villas/villa-vr-green.png', thumb: '/images/villas/v08-thumb-garden.png' }
];

const subGalleryImages = [
  '/images/villas/v08-sub-1.png',
  '/images/villas/v08-sub-2.png',
  '/images/villas/v08-sub-3.png',
  '/images/villas/v08-sub-4.png'
];

/* ═══════════════════ ICONS ═══════════════════ */
const PIN_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;

const HEART_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;

const BED_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"></path></svg>`;

const SEARCH_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;

const ARROW_RIGHT = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>`;

const BROCHURE_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;

const CALENDAR_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;

const MAP_PIN_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;

/* ═══════════════════ NAVIGATION HELPER ═══════════════════ */
if (typeof window !== 'undefined') {
  window._villaNav = function(path) {
    window.location.hash = path.startsWith('#') ? path : `#${path}`;
  };
}

/* ═══════════════════ ROUTE PARSER ═══════════════════ */
function parseVillaRoute(pathStr) {
  const p = pathStr.replace(/^#/, '').split('?')[0];

  if (p === '/villas' || p === '/villas/' || p === '/villas/listing') {
    return { screen: 'listing' };
  }

  // Success routes
  if (p.includes('/enquiry-success')) {
    return { screen: 'enquiry-success' };
  }
  if (p.includes('/site-visit-success')) {
    return { screen: 'site-visit-success' };
  }

  // Form routes
  if (p.includes('/enquiry')) {
    return { screen: 'enquiry' };
  }
  if (p.includes('/site-visit')) {
    return { screen: 'site-visit' };
  }

  // Layout / Master Plan route
  if (p.includes('/master-plan') || p.includes('/layout')) {
    return { screen: 'layout' };
  }

  // Villa details route: /villas/:projectId/villa/:villaId
  const villaMatch = p.match(/\/villas\/([^/]+)\/villa\/([^/]+)/);
  if (villaMatch) {
    return { screen: 'details', projectId: villaMatch[1], villaId: villaMatch[2] };
  }

  // Project overview route: /villas/:projectId
  const projMatch = p.match(/\/villas\/([^/]+)/);
  if (projMatch && projMatch[1]) {
    return { screen: 'overview', projectId: projMatch[1] };
  }

  return { screen: 'listing' };
}

/* ═══════════════════ MAIN EXPORT ═══════════════════ */
export function renderVillasPage(pathStr = '/villas') {
  const { screen, projectId, villaId } = parseVillaRoute(pathStr);

  if (villaId) {
    const foundUnit = villaPlotsLayout.find(u => u.id.toLowerCase() === villaId.toLowerCase());
    if (foundUnit) {
      currentVillaUnit = {
        ...currentVillaUnit,
        id: foundUnit.id,
        num: foundUnit.label,
        title: `Villa ${foundUnit.label} • ${foundUnit.bhk}`,
        price: foundUnit.price,
        area: foundUnit.area,
        status: foundUnit.status === 'on-hold' ? 'On Hold' : 'Available'
      };
      enquiryFormData.message = `I am interested in Villa ${foundUnit.label} at VR Green Villas.`;
    }
  }

  const html = `
    <div class="villas-journey-app" id="villas-journey-root">
      ${renderHeader({ currentPath: '#/villas' })}
      <main class="villas-journey-main" id="villas-screen-host">
        ${renderScreenContent(screen, projectId, villaId)}
      </main>
      ${renderFooter()}
    </div>
  `;

  return {
    html,
    init: () => {
      initStickyNav();
      initScrollTop();
      attachVillasEvents(screen);
    }
  };
}

function renderScreenContent(screen, projectId, villaId) {
  switch (screen) {
    case 'overview':
      return renderScreenOverview(projectId);
    case 'layout':
      return renderScreenLayout();
    case 'details':
      return renderScreenDetails();
    case 'enquiry':
      return renderScreenEnquiry();
    case 'enquiry-success':
      return renderScreenEnquirySuccess();
    case 'site-visit':
      return renderScreenSiteVisit();
    case 'site-visit-success':
      return renderScreenSiteVisitSuccess();
    default:
      return renderScreenListing();
  }
}

/* ═════════════════════════════════════════════════════════
   STEP 1 — VILLAS LISTING
   ═════════════════════════════════════════════════════════ */
function renderScreenListing() {
  const filtered = villasProjectsData.filter(v => {
    if (selectedFilter === '3bhk' && !v.bhk.includes('3')) return false;
    if (selectedFilter === '4bhk' && !v.bhk.includes('4')) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return v.name.toLowerCase().includes(q) || v.location.toLowerCase().includes(q);
    }
    return true;
  });

  const cardsHtml = filtered.map(v => `
    <div class="villas-card" onclick="window._villaNav('/villas/${v.id}')" data-id="${v.id}">
      <div class="villas-card-img-wrap">
        <picture>
          <source media="(max-width: 768px)" srcset="${v.mobImage || v.image}">
          <img src="${v.image}" alt="${v.name}" class="villas-card-img" loading="lazy" />
        </picture>
      </div>
      <div class="villas-card-body">
        <div class="villas-card-header">
          <h3 class="villas-card-title">${v.name}</h3>
          <button type="button" class="villas-card-fav" onclick="event.stopPropagation(); this.classList.toggle('active')" aria-label="Favorite">
            ${HEART_ICON}
          </button>
        </div>
        <div class="villas-card-loc">
          ${PIN_ICON} <span>${v.location}</span>
        </div>
        <div class="villas-card-specs">
          ${BED_ICON} <span>${v.bhk} | ${v.area}</span>
        </div>
        <div class="villas-card-bottom">
          <div class="villas-card-price">${v.price}</div>
          <span class="villas-badge-available">Available</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="villas-listing-page">
      <div class="villas-container">
        <h1 class="villas-listing-title">Villas</h1>

        <div class="villas-listing-layout">
          <!-- Sidebar Filters (Desktop & Mobile input) -->
          <aside class="villas-filter-sidebar">
            <div class="villas-search-box">
              <span class="villas-search-icon">${SEARCH_ICON}</span>
              <input type="text" class="villas-search-input" id="villas-search-input" placeholder="Search villas..." value="${searchQuery}" />
            </div>

            <!-- Mobile Pills -->
            <div class="villas-mobile-pills">
              <button type="button" class="villas-pill-btn ${selectedFilter === 'all' ? 'active' : ''}" data-filter="all">All</button>
              <button type="button" class="villas-pill-btn ${selectedFilter === '3bhk' ? 'active' : ''}" data-filter="3bhk">3 BHK</button>
              <button type="button" class="villas-pill-btn ${selectedFilter === '4bhk' ? 'active' : ''}" data-filter="4bhk">4 BHK</button>
            </div>

            <!-- Desktop Selects -->
            <select class="villas-filter-select" id="filter-projects">
              <option value="">All Projects</option>
              <option value="vr-green-villas">VR Green Villas</option>
              <option value="sr-luxury-villas">SR Luxury Villas</option>
              <option value="natures-nest-villas">Nature's Nest Villas</option>
              <option value="elite-county-villas">Elite County Villas</option>
            </select>

            <select class="villas-filter-select" id="filter-types">
              <option value="">All Villa Types</option>
              <option value="3bhk">3 BHK Luxury</option>
              <option value="4bhk">4 BHK Premium</option>
            </select>

            <select class="villas-filter-select" id="filter-price">
              <option value="">Price Range</option>
              <option value="under-2">Under ₹ 2.0 Cr</option>
              <option value="2-2.5">₹ 2.0 - 2.5 Cr</option>
              <option value="above-2.5">Above ₹ 2.5 Cr</option>
            </select>

            <select class="villas-filter-select" id="filter-bedrooms">
              <option value="">Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
            </select>

            <select class="villas-filter-select" id="filter-availability">
              <option value="">Availability</option>
              <option value="available">Available</option>
              <option value="on-hold">On Hold</option>
            </select>

            <button type="button" class="villas-btn-apply" id="villas-apply-filters">Apply Filters</button>
          </aside>

          <!-- Listing Cards Column -->
          <section class="villas-cards-feed" id="villas-cards-feed">
            ${cardsHtml}
          </section>
        </div>
      </div>
    </div>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 2 — PROJECT OVERVIEW
   ═════════════════════════════════════════════════════════ */
function renderScreenOverview(projectId = 'vr-green-villas') {
  const proj = villasProjectsData.find(p => p.id === projectId) || villasProjectsData[0];

  return `
    <div class="villas-overview-page">
      <div class="villas-container">
        <!-- Breadcrumb -->
        <nav class="villas-breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="sep">&gt;</span>
          <a href="#/villas">Villas</a>
          <span class="sep">&gt;</span>
          <span class="current">${proj.name}</span>
        </nav>

        <!-- Project Overview Card -->
        <div class="villas-overview-card">
          <!-- Hero Entrance Gate Image with Text Overlay -->
          <div class="villas-overview-hero-wrap">
            <picture>
              <source media="(max-width: 768px)" srcset="${proj.mobHeroImage || proj.heroImage}">
              <img src="${proj.heroImage}" alt="${proj.name}" class="villas-overview-hero-img" />
            </picture>
          </div>

          <div class="villas-overview-body">
            <!-- 4 Highlights Pills -->
            <div class="villas-highlights-grid">
              <div class="villas-highlight-pill">
                <div class="villas-highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                </div>
                <div class="villas-highlight-title">Premium Villas</div>
              </div>
              <div class="villas-highlight-pill">
                <div class="villas-highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2L9 9H2l6 4.5L5.5 21 12 16.5 18.5 21 16 13.5 22 9h-7z"></path></svg>
                </div>
                <div class="villas-highlight-title">Lush Greenery</div>
              </div>
              <div class="villas-highlight-pill">
                <div class="villas-highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                </div>
                <div class="villas-highlight-title">Club House</div>
              </div>
              <div class="villas-highlight-pill">
                <div class="villas-highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <div class="villas-highlight-title">24/7 Security</div>
              </div>
            </div>

            <!-- About Section -->
            <h2 class="villas-overview-section-title">About the Project</h2>
            <p class="villas-overview-desc">${proj.about}</p>

            <!-- Amenities Section -->
            <h2 class="villas-overview-section-title">Project Amenities</h2>
            <div class="villas-amenities-row">
              <div class="villas-amenity-card">
                <div class="villas-amenity-icon-box">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18M3 7v14M21 7v14M6 11h2M6 15h2M16 11h2M16 15h2M10 21V11h4v10M12 3l9 4H3l9-4z"></path></svg>
                </div>
                <span class="villas-amenity-name">Club House</span>
              </div>
              <div class="villas-amenity-card">
                <div class="villas-amenity-icon-box">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12h20M2 17h20M2 7h20"></path></svg>
                </div>
                <span class="villas-amenity-name">Swimming Pool</span>
              </div>
              <div class="villas-amenity-card">
                <div class="villas-amenity-icon-box">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path></svg>
                </div>
                <span class="villas-amenity-name">Landscaped Gardens</span>
              </div>
              <div class="villas-amenity-card">
                <div class="villas-amenity-icon-box">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="5" r="3"></circle><path d="M12 8v8M8 12l4 4 4-4M5 21h14"></path></svg>
                </div>
                <span class="villas-amenity-name">Children's Play Area</span>
              </div>
              <div class="villas-amenity-card">
                <div class="villas-amenity-icon-box">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <span class="villas-amenity-name">24/7 Security</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="villas-overview-actions">
              <button type="button" class="villas-btn-primary" onclick="window._villaNav('/villas/${proj.id}/master-plan')">
                View Master Plan
              </button>
              <button type="button" class="villas-btn-outline" onclick="window.print ? window.print() : null">
                ${BROCHURE_ICON}
                <span>Download Brochure</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 3 — 3D MASTER LAYOUT PLAN
   ═════════════════════════════════════════════════════════ */
function renderScreenLayout() {
  const isDev = typeof window !== 'undefined' && (window.location.search.includes('dev=true') || window._enableMasterPlanDev);

  return `
    <div class="villas-layout-page">
      <div class="villas-container">
        <!-- Breadcrumb -->
        <nav class="villas-breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="sep">&gt;</span>
          <a href="#/villas/vr-green-villas">VR Green Villas</a>
          <span class="sep">&gt;</span>
          <span class="current">Master Layout Plan</span>
        </nav>

        <!-- Master Layout Card -->
        <div class="villas-layout-card">
          <div class="villas-layout-header">
            <div>
              <h1 class="villas-layout-title">Master Layout Plan</h1>
              <div class="villas-layout-sub">VR Green Villas &bull; 3D Gated Community Plan</div>
            </div>
            ${isDev ? `
              <div class="vmp-dev-badge" style="background: #FEF3C7; color: #92400E; font-size: 0.8rem; font-weight: 700; padding: 4px 10px; border-radius: 6px; border: 1px dashed #D97706;">
                🛠️ Dev Test Mode Active
              </div>
            ` : ''}
          </div>

          <!-- Top Legend & Zoom Controls Bar -->
          <div class="vmp-top-bar">
            <div class="vmp-legend-bar">
              <div class="vmp-legend-item">
                <span class="vmp-legend-dot available"></span>
                <span>Available</span>
              </div>
              <div class="vmp-legend-item">
                <span class="vmp-legend-dot booked"></span>
                <span>Booked</span>
              </div>
              <div class="vmp-legend-item">
                <span class="vmp-legend-dot sold"></span>
                <span>Sold</span>
              </div>
            </div>

            <div class="vmp-controls-bar">
              <button type="button" class="vmp-zoom-btn" id="vmp-zoom-in" title="Zoom In">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              </button>
              <button type="button" class="vmp-zoom-btn" id="vmp-zoom-out" title="Zoom Out">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/></svg>
              </button>
              <button type="button" class="vmp-zoom-btn" id="vmp-zoom-reset" title="Reset View">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/></svg>
              </button>
            </div>
          </div>

          <!-- Interactive 3D Vector Map Canvas Stage -->
          <div class="vmp-stage-wrapper">
            <div class="vmp-canvas-scroll" id="vmp-canvas-scroll">
              <div class="vmp-canvas-wrap" id="vmp-canvas-wrap">
                <div id="vmp-canvas-container" style="width: 100%;">
                  ${renderMasterPlanSvgCode(villaPlotsLayout, 'v02')}
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Host for Clicked Villa Details -->
          <div id="vmp-modal-host"></div>

          <!-- Footer / Orientation -->
          <div class="villas-layout-footer">
            <div style="font-size: 0.88rem; color: #6B7280; font-weight: 500;">
              Click any villa on the master plan to inspect unit specifications.
            </div>

            <div class="villas-compass" title="Orientation: North">
              <span style="font-size: 0.9rem; font-weight: 800;">N</span>
              <svg width="18" height="24" viewBox="0 0 24 32" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L4 28l8-6 8 6L12 2z" fill="#11291E"></path>
              </svg>
            </div>
          </div>

          <!-- Development-only Status Tester Panel -->
          ${renderDevTesterHtml(isDev)}

        </div>
      </div>
    </div>
  `;
}

function renderDevTesterHtml(isDev) {
  return `
    <div class="vmp-dev-tester" id="vmp-dev-tester" style="${isDev ? 'display: block;' : 'display: none;'}">
      <div class="vmp-dev-header">
        <span>🛠️ Development Status Switcher (Test Suite)</span>
        <span style="font-size: 0.78rem; font-weight: 500; color: #78350F;">Live DOM & Data Source Tester</span>
      </div>
      <div class="vmp-dev-grid">
        <label for="vmp-dev-plot-select" style="font-weight: 700; color: #78350F;">Select Villa:</label>
        <select id="vmp-dev-plot-select" class="vmp-dev-select">
          ${villaPlotsLayout.map(p => `<option value="${p.id}">${p.label} (Current: ${p.status})</option>`).join('')}
        </select>
        <button type="button" class="vmp-dev-btn avail" onclick="window._handleDevStatusChange('available')">Set Available (Green)</button>
        <button type="button" class="vmp-dev-btn booked" onclick="window._handleDevStatusChange('booked')">Set Booked (Orange)</button>
        <button type="button" class="vmp-dev-btn sold" onclick="window._handleDevStatusChange('sold')">Set Sold (Red)</button>
      </div>
    </div>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 4 — VILLA DETAILS
   ═════════════════════════════════════════════════════════ */
function renderScreenDetails() {
  const currentCat = villaCategories[activeCatIdx] || villaCategories[0];

  const catThumbsHtml = villaCategories.map((cat, idx) => `
    <div class="villas-cat-thumb-item ${idx === activeCatIdx ? 'active' : ''}" onclick="window._switchVillaCat(${idx})">
      <img src="${cat.thumb}" alt="${cat.name}" />
      <span class="villas-cat-thumb-label">${cat.name}</span>
    </div>
  `).join('');

  const subThumbsHtml = subGalleryImages.map((src, idx) => `
    <img 
      src="${src}" 
      alt="Villa View ${idx + 1}" 
      class="villas-sub-thumb-img ${idx + 1 === activeSlideIdx ? 'active' : ''}" 
      onclick="window._switchVillaSlide(${idx + 1}, '${src}')" 
    />
  `).join('');

  return `
    <div class="villas-details-page">
      <div class="villas-container">
        <!-- Breadcrumb -->
        <nav class="villas-breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="sep">&gt;</span>
          <a href="#/villas/vr-green-villas">VR Green Villas</a>
          <span class="sep">&gt;</span>
          <span class="current">${currentVillaUnit.title}</span>
        </nav>

        <div class="villas-details-card">
          <!-- Gallery Layout: Left Sidebar Thumbs + Main Showcase -->
          <div class="villas-gallery-layout">
            <!-- Left Categories -->
            <div class="villas-cat-thumbs">
              ${catThumbsHtml}
            </div>

            <!-- Main Display Column -->
            <div class="villas-main-gallery">
              <div class="villas-main-image-wrap">
                <img src="${currentCat.image}" alt="${currentVillaUnit.title}" class="villas-main-image" id="villas-main-image" />
                <span class="villas-img-counter" id="villas-img-counter">${activeSlideIdx}/6</span>
                
                <button type="button" class="villas-nav-arrow prev" onclick="window._prevVillaSlide()" aria-label="Previous image">
                  &lsaquo;
                </button>
                <button type="button" class="villas-nav-arrow next" onclick="window._nextVillaSlide()" aria-label="Next image">
                  &rsaquo;
                </button>

                <button type="button" class="villas-fullscreen-btn" onclick="window._toggleFullscreen()" aria-label="Expand view">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="7" cy="7" r="1.5"/><circle cx="17" cy="7" r="1.5"/><circle cx="7" cy="17" r="1.5"/><circle cx="17" cy="17" r="1.5"/></svg>
                </button>
              </div>

              <div class="villas-view-subtitle">${currentCat.name} View</div>

              <!-- Row of 4 Sub-thumbnails -->
              <div class="villas-sub-thumbs">
                ${subThumbsHtml}
              </div>
            </div>
          </div>

          <!-- Villa Information -->
          <div class="villas-details-title-row">
            <h1 class="villas-details-title">${currentVillaUnit.title}</h1>
            <span class="villas-badge-available">&#10003; Available</span>
          </div>

          <div class="villas-price-row">
            <span class="villas-price-val">${currentVillaUnit.price}</span>
            <span class="villas-price-note">${currentVillaUnit.priceSub}</span>
          </div>

          <!-- 6-Grid Specifications -->
          <div class="villas-specs-grid">
            <div class="villas-spec-item">
              <div class="villas-spec-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 8V4m0 0h4M4 4l5 5m11-1v4m0-4h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
              </div>
              <div class="villas-spec-meta">
                <span class="villas-spec-val">${currentVillaUnit.area}</span>
                <span class="villas-spec-lbl">Built-up Area</span>
              </div>
            </div>

            <div class="villas-spec-item">
              <div class="villas-spec-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
              </div>
              <div class="villas-spec-meta">
                <span class="villas-spec-val">${currentVillaUnit.facing}</span>
                <span class="villas-spec-lbl">Facing</span>
              </div>
            </div>

            <div class="villas-spec-item">
              <div class="villas-spec-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/></svg>
              </div>
              <div class="villas-spec-meta">
                <span class="villas-spec-val">${currentVillaUnit.bedrooms} Bedrooms</span>
                <span class="villas-spec-lbl">Bedrooms</span>
              </div>
            </div>

            <div class="villas-spec-item">
              <div class="villas-spec-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="9" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <div class="villas-spec-meta">
                <span class="villas-spec-val">${currentVillaUnit.carParking} Car Parking</span>
                <span class="villas-spec-lbl">Car Parking</span>
              </div>
            </div>

            <div class="villas-spec-item">
              <div class="villas-spec-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6M2 12h20M6 12V5a2 2 0 0 1 2-2h1"/></svg>
              </div>
              <div class="villas-spec-meta">
                <span class="villas-spec-val">${currentVillaUnit.bathrooms} Bathrooms</span>
                <span class="villas-spec-lbl">Bathrooms</span>
              </div>
            </div>

            <div class="villas-spec-item">
              <div class="villas-spec-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h1M14 10h1M9 14h1M14 14h1M9 18h1M14 18h1"/></svg>
              </div>
              <div class="villas-spec-meta">
                <span class="villas-spec-val">${currentVillaUnit.floors} Floors</span>
                <span class="villas-spec-lbl">Floors</span>
              </div>
            </div>
          </div>

          <!-- 3 Action Buttons -->
          <div class="villas-actions-stack">
            <button type="button" class="villas-btn-primary" onclick="window._villaNav('/villas/vr-green-villas/villa/${currentVillaUnit.id}/enquiry')">
              <span>Send Enquiry</span>
              ${ARROW_RIGHT}
            </button>
            <button type="button" class="villas-btn-outline" onclick="window._villaNav('/villas/vr-green-villas/villa/${currentVillaUnit.id}/site-visit')">
              ${CALENDAR_ICON}
              <span>Book Site Visit</span>
            </button>
            <a href="https://maps.google.com/?q=Kompally+Hyderabad" target="_blank" rel="noopener noreferrer" class="villas-btn-outline">
              ${MAP_PIN_ICON}
              <span>View on Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 5A — SEND ENQUIRY FORM
   ═════════════════════════════════════════════════════════ */
function renderScreenEnquiry() {
  return `
    <div class="villas-form-page">
      <div class="villas-container">
        <!-- Breadcrumb -->
        <nav class="villas-breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="sep">&gt;</span>
          <a href="#/villas/vr-green-villas">VR Green Villas</a>
          <span class="sep">&gt;</span>
          <a href="#/villas/vr-green-villas/villa/${currentVillaUnit.id}">${currentVillaUnit.title}</a>
          <span class="sep">&gt;</span>
          <span class="current">Send Enquiry</span>
        </nav>

        <div class="villas-form-card">
          <div class="villas-form-header">
            <h1 class="villas-form-title">Send Enquiry</h1>
            <button type="button" class="villas-btn-close" onclick="window._villaNav('/villas/vr-green-villas/villa/${currentVillaUnit.id}')" aria-label="Close form">
              &times;
            </button>
          </div>
          <p class="villas-form-subtitle">Get in touch with our team. We will call you shortly.</p>

          <form id="villas-enquiry-form" onsubmit="window._submitVillaEnquiry(event)">
            <div class="villas-form-group">
              <label class="villas-form-label">Full Name <span class="req">*</span></label>
              <input type="text" class="villas-input" id="enquiry-name" placeholder="Enter your name" required value="${enquiryFormData.name}" />
            </div>

            <div class="villas-form-group">
              <label class="villas-form-label">Mobile Number <span class="req">*</span></label>
              <input type="tel" class="villas-input" id="enquiry-phone" placeholder="Enter mobile number" required value="${enquiryFormData.phone}" />
            </div>

            <div class="villas-form-group">
              <label class="villas-form-label">Email</label>
              <input type="email" class="villas-input" id="enquiry-email" placeholder="Enter your email" value="${enquiryFormData.email}" />
            </div>

            <div class="villas-form-group">
              <label class="villas-form-label">Preferred Date</label>
              <input type="date" class="villas-input" id="enquiry-date" value="${enquiryFormData.date}" />
            </div>

            <div class="villas-form-group">
              <label class="villas-form-label">Message (Optional)</label>
              <textarea class="villas-textarea" id="enquiry-message" rows="3">${enquiryFormData.message}</textarea>
            </div>

            <!-- Selected Property Card (Corresponds directly to selected villa) -->
            <div class="villas-selected-prop-card">
              <img src="${currentVillaUnit.thumb}" alt="${currentVillaUnit.title}" class="villas-selected-prop-thumb" />
              <div class="villas-selected-prop-meta">
                <div class="villas-selected-prop-eyebrow">Selected Property</div>
                <div class="villas-selected-prop-name">${currentVillaUnit.title}</div>
                <div class="villas-selected-prop-loc">${currentVillaUnit.projectName}, ${currentVillaUnit.location.split(',')[0]}</div>
                <div class="villas-selected-prop-price">${currentVillaUnit.price}</div>
              </div>
            </div>

            <!-- Consent Checkboxes -->
            <div class="villas-consent-group">
              <label class="villas-checkbox-label">
                <input type="checkbox" id="enquiry-whatsapp" checked />
                <span>I agree to be contacted via call/WhatsApp</span>
              </label>
              <label class="villas-checkbox-label">
                <input type="checkbox" id="enquiry-terms" checked required />
                <span>I accept the Terms &amp; Privacy Policy</span>
              </label>
            </div>

            <button type="submit" class="villas-btn-primary" style="width: 100%;">
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 6A — ENQUIRY SUCCESS
   ═════════════════════════════════════════════════════════ */
function renderScreenEnquirySuccess() {
  return `
    <div class="villas-success-page">
      <div class="villas-container">
        <div class="villas-success-card">
          <!-- Big Mint Checkmark Icon -->
          <div class="villas-success-checkmark-wrap">
            <div class="villas-success-check-inner">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          <h1 class="villas-success-title">Enquiry Submitted!</h1>
          <p class="villas-success-sub">
            Thank you for your interest.<br />
            Our team will contact you shortly.
          </p>

          <!-- What Happens Next 3 Steps Box -->
          <div class="villas-next-steps-box">
            <div class="villas-next-steps-title">What happens next?</div>
            
            <div class="villas-step-row">
              <div class="villas-step-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
              </div>
              <div class="villas-step-content">
                <span class="villas-step-num">1</span> Our team will review your details.
              </div>
            </div>

            <div class="villas-step-row">
              <div class="villas-step-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div class="villas-step-content">
                <span class="villas-step-num">2</span> You will receive a call from our sales team.
              </div>
            </div>

            <div class="villas-step-row">
              <div class="villas-step-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              </div>
              <div class="villas-step-content">
                <span class="villas-step-num">3</span> Get ready to explore your dream villa!
              </div>
            </div>
          </div>

          <!-- Back to Project Button -->
          <button type="button" class="villas-btn-back-project" onclick="window._villaNav('/villas/vr-green-villas')">
            Back to Project
          </button>

          <!-- Bottom Dream Villa Artwork -->
          <div class="villas-success-artwork-wrap">
            <img src="/images/villas/success-illustration.png" alt="Your Dream Villa is Just a Step Away!" class="villas-success-art-img" />
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 5B — BOOK SITE VISIT FORM
   ═════════════════════════════════════════════════════════ */
function renderScreenSiteVisit() {
  return `
    <div class="villas-form-page">
      <div class="villas-container">
        <!-- Breadcrumb -->
        <nav class="villas-breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="sep">&gt;</span>
          <a href="#/villas/vr-green-villas">VR Green Villas</a>
          <span class="sep">&gt;</span>
          <a href="#/villas/vr-green-villas/villa/${currentVillaUnit.id}">${currentVillaUnit.title}</a>
          <span class="sep">&gt;</span>
          <span class="current">Book Site Visit</span>
        </nav>

        <div class="villas-form-card">
          <div class="villas-form-header">
            <h1 class="villas-form-title">Book a Site Visit</h1>
            <button type="button" class="villas-btn-close" onclick="window._villaNav('/villas/vr-green-villas/villa/${currentVillaUnit.id}')" aria-label="Close form">
              &times;
            </button>
          </div>
          <p class="villas-form-subtitle">Schedule an exclusive private tour with our property expert.</p>

          <form id="villas-site-visit-form" onsubmit="window._submitVillaSiteVisit(event)">
            <!-- Selected Property Card -->
            <div class="villas-selected-prop-card">
              <img src="${currentVillaUnit.thumb}" alt="${currentVillaUnit.title}" class="villas-selected-prop-thumb" />
              <div class="villas-selected-prop-meta">
                <div class="villas-selected-prop-eyebrow">Selected Property</div>
                <div class="villas-selected-prop-name">${currentVillaUnit.title}</div>
                <div class="villas-selected-prop-loc">${currentVillaUnit.projectName}, ${currentVillaUnit.location.split(',')[0]}</div>
                <div class="villas-selected-prop-price">${currentVillaUnit.price}</div>
              </div>
            </div>

            <div class="villas-form-group">
              <label class="villas-form-label">Full Name <span class="req">*</span></label>
              <input type="text" class="villas-input" id="visit-name" placeholder="Enter your name" required value="${siteVisitFormData.name}" />
            </div>

            <div class="villas-form-group">
              <label class="villas-form-label">Mobile Number <span class="req">*</span></label>
              <input type="tel" class="villas-input" id="visit-phone" placeholder="Enter mobile number" required value="${siteVisitFormData.phone}" />
            </div>

            <div class="villas-form-group">
              <label class="villas-form-label">Email <span class="req">*</span></label>
              <input type="email" class="villas-input" id="visit-email" placeholder="Enter your email" required value="${siteVisitFormData.email}" />
            </div>

            <div class="villas-form-group">
              <label class="villas-form-label">Preferred Date <span class="req">*</span></label>
              <input type="date" class="villas-input" id="visit-date" required value="${siteVisitFormData.date}" />
            </div>

            <div class="villas-form-group">
              <label class="villas-form-label">Preferred Time Slot <span class="req">*</span></label>
              <select class="villas-select" id="visit-slot">
                <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
              </select>
            </div>

            <div class="villas-form-group">
              <label class="villas-form-label">Optional Message</label>
              <textarea class="villas-textarea" id="visit-message" placeholder="Any specific requirements or questions?">${siteVisitFormData.message}</textarea>
            </div>

            <button type="submit" class="villas-btn-primary" style="width: 100%;">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 6B — SITE VISIT SUCCESS
   ═════════════════════════════════════════════════════════ */
function renderScreenSiteVisitSuccess() {
  return `
    <div class="villas-success-page">
      <div class="villas-container">
        <div class="villas-success-card">
          <div class="villas-success-checkmark-wrap">
            <div class="villas-success-check-inner">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          <h1 class="villas-success-title">Site Visit Request Submitted!</h1>
          <p class="villas-success-sub">
            Thank you for scheduling a site visit.<br />
            Our representative will contact you shortly to confirm the appointment.
          </p>

          <!-- Selected Property Card -->
          <div class="villas-selected-prop-card" style="text-align: left; margin-bottom: 20px;">
            <img src="${currentVillaUnit.thumb}" alt="${currentVillaUnit.title}" class="villas-selected-prop-thumb" />
            <div class="villas-selected-prop-meta">
              <div class="villas-selected-prop-eyebrow">Scheduled Visit For</div>
              <div class="villas-selected-prop-name">${currentVillaUnit.title}</div>
              <div class="villas-selected-prop-loc">${currentVillaUnit.projectName}, ${currentVillaUnit.location}</div>
              <div class="villas-selected-prop-price">${currentVillaUnit.price}</div>
            </div>
          </div>

          <!-- What Happens Next -->
          <div class="villas-next-steps-box">
            <div class="villas-next-steps-title">What happens next?</div>
            
            <div class="villas-step-row">
              <div class="villas-step-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
              </div>
              <div class="villas-step-content">
                <span class="villas-step-num">Step 1:</span> Our team will review your visit request.
              </div>
            </div>

            <div class="villas-step-row">
              <div class="villas-step-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div class="villas-step-content">
                <span class="villas-step-num">Step 2:</span> The team will contact you to confirm the visit time.
              </div>
            </div>

            <div class="villas-step-row">
              <div class="villas-step-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>
              </div>
              <div class="villas-step-content">
                <span class="villas-step-num">Step 3:</span> Once confirmed, you will receive a confirmation message.
              </div>
            </div>
          </div>

          <!-- Back to Project Button -->
          <button type="button" class="villas-btn-back-project" onclick="window._villaNav('/villas/vr-green-villas')">
            Back to Project
          </button>

          <!-- Bottom Dream Villa Artwork -->
          <div class="villas-success-artwork-wrap">
            <img src="/images/villas/success-illustration.png" alt="Your Dream Villa is Just a Step Away!" class="villas-success-art-img" />
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ═══════════════════ EVENT ATTACHMENTS ═══════════════════ */
function attachVillasEvents(screen) {
  if (screen === 'listing') {
    const searchInput = document.getElementById('villas-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        const appEl = document.getElementById('app');
        if (appEl) {
          const p = renderVillasPage('/villas');
          appEl.innerHTML = p.html;
          if (p.init) p.init();
          const newInp = document.getElementById('villas-search-input');
          if (newInp) {
            newInp.focus();
            newInp.setSelectionRange(newInp.value.length, newInp.value.length);
          }
        }
      });
    }

    const pills = document.querySelectorAll('.villas-pill-btn');
    pills.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedFilter = btn.getAttribute('data-filter') || 'all';
        const appEl = document.getElementById('app');
        if (appEl) {
          const p = renderVillasPage('/villas');
          appEl.innerHTML = p.html;
          if (p.init) p.init();
        }
      });
    });

    const applyBtn = document.getElementById('villas-apply-filters');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        const types = document.getElementById('filter-types');
        if (types && types.value) {
          selectedFilter = types.value;
        }
        const appEl = document.getElementById('app');
        if (appEl) {
          const p = renderVillasPage('/villas');
          appEl.innerHTML = p.html;
          if (p.init) p.init();
        }
      });
    }
  }

  if (screen === 'layout') {
    const currentProject = villasProjectsData.find(p => p.id === 'vr-green-villas') || villasProjectsData[0];
    initVillaMasterPlan(villaPlotsLayout, currentProject);

    window._handleDevStatusChange = function(status) {
      const select = document.getElementById('vmp-dev-plot-select');
      if (!select) return;
      const villaId = select.value;
      window._setVillaStatusDev(villaId, status);
    };
  }

  // Global methods for gallery in details screen
  window._switchVillaCat = function(idx) {
    activeCatIdx = idx;
    const cat = villaCategories[idx];
    if (cat) {
      const mainImg = document.getElementById('villas-main-image');
      if (mainImg) mainImg.src = cat.image;
      const subtitle = document.querySelector('.villas-view-subtitle');
      if (subtitle) subtitle.textContent = `${cat.name} View`;
    }
    document.querySelectorAll('.villas-cat-thumb-item').forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });
  };

  window._switchVillaSlide = function(slideNum, src) {
    activeSlideIdx = slideNum;
    const mainImg = document.getElementById('villas-main-image');
    if (mainImg) mainImg.src = src;
    const counter = document.getElementById('villas-img-counter');
    if (counter) counter.textContent = `${slideNum}/6`;

    document.querySelectorAll('.villas-sub-thumb-img').forEach((el, i) => {
      el.classList.toggle('active', (i + 1) === slideNum);
    });
  };

  window._prevVillaSlide = function() {
    let nextIdx = activeSlideIdx - 1;
    if (nextIdx < 1) nextIdx = subGalleryImages.length;
    window._switchVillaSlide(nextIdx, subGalleryImages[nextIdx - 1]);
  };

  window._nextVillaSlide = function() {
    let nextIdx = activeSlideIdx + 1;
    if (nextIdx > subGalleryImages.length) nextIdx = 1;
    window._switchVillaSlide(nextIdx, subGalleryImages[nextIdx - 1]);
  };

  window._toggleFullscreen = function() {
    const mainImg = document.getElementById('villas-main-image');
    if (mainImg && mainImg.requestFullscreen) {
      mainImg.requestFullscreen().catch(() => {});
    }
  };

  window._submitVillaEnquiry = function(e) {
    e.preventDefault();
    const nameEl = document.getElementById('enquiry-name');
    const phoneEl = document.getElementById('enquiry-phone');
    const emailEl = document.getElementById('enquiry-email');
    const dateEl = document.getElementById('enquiry-date');
    const msgEl = document.getElementById('enquiry-message');

    enquiryFormData = {
      name: nameEl ? nameEl.value : '',
      phone: phoneEl ? phoneEl.value : '',
      email: emailEl ? emailEl.value : '',
      date: dateEl ? dateEl.value : '',
      message: msgEl ? msgEl.value : ''
    };

    window._villaNav(`/villas/vr-green-villas/villa/${currentVillaUnit.id}/enquiry-success`);
  };

  window._submitVillaSiteVisit = function(e) {
    e.preventDefault();
    const nameEl = document.getElementById('visit-name');
    const phoneEl = document.getElementById('visit-phone');
    const emailEl = document.getElementById('visit-email');
    const dateEl = document.getElementById('visit-date');
    const slotEl = document.getElementById('visit-slot');
    const msgEl = document.getElementById('visit-message');

    siteVisitFormData = {
      name: nameEl ? nameEl.value : '',
      phone: phoneEl ? phoneEl.value : '',
      email: emailEl ? emailEl.value : '',
      date: dateEl ? dateEl.value : '',
      timeSlot: slotEl ? slotEl.value : '',
      message: msgEl ? msgEl.value : ''
    };

    window._villaNav(`/villas/vr-green-villas/villa/${currentVillaUnit.id}/site-visit-success`);
  };
}
