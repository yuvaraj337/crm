// ============================================================================
// REBUILT FROM SCRATCH — APARTMENT CUSTOMER JOURNEY (9 SCREENS)
// Authoritative visual match to reference/apartment-flow/ images
// ============================================================================

import { renderHeader, initStickyNav } from '../components/header.js';
import { renderFooter, initScrollTop } from '../components/footer.js';
import { renderApartmentFloorPlan, initApartmentFloorPlan } from '../components/apartmentFloorPlan.js';

/* ═══════════════════ APPLICATION STATE ═══════════════════ */
let selectedFilter = 'all';
let selectedTower = 'Tower A';
let selectedFloor = '7th Floor';
let activeRoomIdx = 0;
let enquiryName = '';
let siteVisitName = '';

let selectedUnit = {
  id: 'A-704',
  unitName: 'A-704 · 3 BHK',
  shortName: 'Unit 101 - 3 BHK',
  type: '3 BHK',
  projectName: 'VR Elite Towers',
  location: 'Kokapet, Hyderabad',
  price: '₹ 1.25 Cr',
  priceSub: '(All Inclusive)',
  shortPrice: '₹ 92 Lakhs*',
  size: '1,850 Sq.Ft.',
  floor: '7th Floor',
  facing: 'East Facing',
  beds: '3',
  baths: '3',
  balconies: '2',
  status: 'On Hold',
  thumb: '/images/journey/apt_elite_towers.jpg'
};

/* ═══════════════════ DATA MODELS ═══════════════════ */
const projectsData = [
  {
    id: 'vr-elite-towers',
    name: 'VR Elite Towers',
    location: 'Kokapet, Hyderabad',
    price: '₹ 75 Lakhs*',
    bhk: '2 & 3 BHK',
    bhkTypes: ['2', '3'],
    image: '/images/journey/apt_elite_towers.jpg',
    area: '5 Acres',
    towers: '3 Towers',
    floors: 'G+20 Floors',
    amenities: 'World Class',
    about: 'VR Elite Towers is a premium residential community in the heart of Kokapet, offering spacious 2 & 3 BHK apartments with modern amenities, excellent connectivity, and a lifestyle designed for the future.'
  },
  {
    id: 'vr-urban-heights',
    name: 'VR Urban Heights',
    location: 'Nallagandla, Hyderabad',
    price: '₹ 68 Lakhs*',
    bhk: '2 & 3 BHK',
    bhkTypes: ['2', '3'],
    image: '/images/journey/apt_urban_heights.jpg',
    area: '4 Acres',
    towers: '2 Towers',
    floors: 'G+18 Floors',
    amenities: 'World Class',
    about: 'VR Urban Heights offers modern living with spacious apartments and premium amenities at Nallagandla.'
  },
  {
    id: 'vr-lake-view',
    name: 'VR Lake View Residency',
    location: 'Patancheru, Hyderabad',
    price: '₹ 62 Lakhs*',
    bhk: '2 & 3 BHK',
    bhkTypes: ['2', '3'],
    image: '/images/journey/apt_lake_view.jpg',
    area: '3.5 Acres',
    towers: '2 Towers',
    floors: 'G+15 Floors',
    amenities: 'World Class',
    about: 'VR Lake View Residency provides serene lakeside living with premium amenities at Patancheru.'
  }
];

const floorUnitsData = [
  { id: 'A-701', num: 'A-701', type: '2 BHK', size: '1,200 Sq.Ft.', price: '₹ 95 Lakhs', facing: 'North Facing', beds: '2', baths: '2', balconies: '1', status: 'available', pos: { x: 40, y: 35, width: 275, height: 260 }, thumb: '/images/journey/room_living.jpg' },
  { id: 'A-702', num: 'A-702', type: '3 BHK', size: '1,450 Sq.Ft.', price: '₹ 1.20 Cr', facing: 'East Facing', beds: '3', baths: '3', balconies: '2', status: 'available', pos: { x: 335, y: 35, width: 230, height: 260 }, thumb: '/images/journey/room_living.jpg' },
  { id: 'A-703', num: 'A-703', type: '3 BHK', size: '1,500 Sq.Ft.', price: '₹ 1.28 Cr', facing: 'West Facing', beds: '3', baths: '3', balconies: '2', status: 'available', pos: { x: 585, y: 35, width: 275, height: 260 }, thumb: '/images/journey/room_living.jpg' },
  { id: 'A-704', num: 'A-704', type: '3 BHK', size: '1,850 Sq.Ft.', price: '₹ 1.25 Cr', facing: 'East Facing', beds: '3', baths: '3', balconies: '2', status: 'on_hold', isHighlight: true, pos: { x: 40, y: 375, width: 275, height: 270 }, thumb: '/images/journey/room_living.jpg' },
  { id: 'A-705', num: 'A-705', type: '2 BHK', size: '1,220 Sq.Ft.', price: '₹ 98 Lakhs', facing: 'North Facing', beds: '2', baths: '2', balconies: '1', status: 'available', pos: { x: 335, y: 385, width: 230, height: 260 }, thumb: '/images/journey/room_living.jpg' },
  { id: 'A-706', num: 'A-706', type: '3 BHK', size: '1,480 Sq.Ft.', price: '₹ 1.24 Cr', facing: 'South Facing', beds: '3', baths: '3', balconies: '2', status: 'available', pos: { x: 585, y: 375, width: 275, height: 270 }, thumb: '/images/journey/room_living.jpg' }
];

const roomStudioData = [
  {
    name: 'Living Room',
    image: '/images/journey/room_living.jpg',
    desc: 'Spacious living area with large windows and natural light.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v3"/><path d="M2 11v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-4 0v2H6v-2a2 2 0 00-4 0z"/><path d="M4 18v2M20 18v2"/></svg>`
  },
  {
    name: 'Kitchen',
    image: '/images/journey/room_thumb_1.jpg',
    desc: 'Modern modular kitchen with granite platform and premium fittings.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3"/><path d="M18 15v7"/></svg>`
  },
  {
    name: 'Master Bedroom',
    image: '/images/journey/room_thumb_2.jpg',
    desc: 'Lavish master bedroom with attached bathroom and wooden flooring.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 012 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`
  },
  {
    name: 'Bedroom 2',
    image: '/images/journey/room_thumb_3.jpg',
    desc: 'Comfortable guest bedroom with ample ventilation and wardrobe space.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 012 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`
  },
  {
    name: 'Bathroom',
    image: '/images/journey/room_thumb_4.jpg',
    desc: 'Contemporary branded sanitary ware with anti-skid ceramic tiling.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z"/><path d="M6 12V5a2 2 0 012-2 2 2 0 012 2v1"/></svg>`
  },
  {
    name: 'Balcony',
    image: '/images/journey/room_thumb_5.jpg',
    desc: 'Scenic open balcony overlooking landscaped gardens and city skyline.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="6" y1="12" x2="6" y2="18"/><line x1="10" y1="12" x2="10" y2="18"/><line x1="14" y1="12" x2="14" y2="18"/><line x1="18" y1="12" x2="18" y2="18"/></svg>`
  }
];

/* ═══════════════════ SVG ICONS ═══════════════════ */
const PIN_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
const CHECK_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
const ARROW_RIGHT = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

/* ═══════════════════ ROUTE PARSER ═══════════════════ */
function parseRoute(pathStr) {
  if (!pathStr || !pathStr.startsWith('/apartments')) {
    return { screen: 'listing' };
  }
  const p = pathStr.replace(/\/$/, '');
  if (p === '/apartments') return { screen: 'listing' };
  if (p === '/apartments/vr-elite-towers') return { screen: 'overview' };
  if (p === '/apartments/vr-elite-towers/floor-plan') return { screen: 'floorplan' };
  if (p.startsWith('/apartments/vr-elite-towers/unit/')) {
    const unitId = p.split('/').pop();
    return { screen: 'details', unitId };
  }
  if (p === '/apartments/vr-elite-towers/enquiry') return { screen: 'enquiry' };
  if (p === '/apartments/vr-elite-towers/enquiry-success') return { screen: 'enquiry-success' };
  if (p === '/apartments/vr-elite-towers/site-visit') return { screen: 'site-visit' };
  if (p === '/apartments/vr-elite-towers/site-visit/form') return { screen: 'site-visit-form' };
  if (p === '/apartments/vr-elite-towers/site-visit/success') return { screen: 'site-visit-success' };
  return { screen: 'listing' };
}

/* ═══════════════════ MAIN EXPORT ═══════════════════ */
export function renderApartmentsPage(pathStr = '/apartments') {
  const { screen, unitId } = parseRoute(pathStr);

  if (screen === 'details' && unitId) {
    const found = floorUnitsData.find(u => u.id.toLowerCase() === unitId.toLowerCase());
    if (found) {
      selectedUnit = {
        ...selectedUnit,
        id: found.id,
        unitName: `${found.id} · ${found.type}`,
        shortName: `Unit ${found.id.replace('A-', '')} - ${found.type}`,
        price: found.price,
        size: found.size,
        facing: found.facing,
        beds: found.beds,
        baths: found.baths,
        balconies: found.balconies
      };
      activeRoomIdx = 0;
    }
  }

  const html = `
    <div class="apt-journey-app" id="apt-journey-root">
      ${renderHeader({ currentPath: '#/apartments' })}
      <main class="apt-journey-main" id="apt-screen-host">
        ${renderScreenContent(screen)}
      </main>
      ${renderFooter()}
    </div>
  `;

  return {
    html,
    init: () => {
      initStickyNav();
      initScrollTop();
      attachEvents(screen);
    }
  };
}

function renderScreenContent(screen) {
  switch (screen) {
    case 'overview': return renderScreenOverview();
    case 'floorplan': return renderScreenFloorPlan();
    case 'details': return renderScreenDetails();
    case 'enquiry': return renderScreenEnquiry();
    case 'enquiry-success': return renderScreenEnquirySuccess();
    case 'site-visit': return renderScreenSiteVisit();
    case 'site-visit-form': return renderScreenSiteVisitForm();
    case 'site-visit-success': return renderScreenSiteVisitSuccess();
    default: return renderScreenListing();
  }
}

/* ═════════════════════════════════════════════════════════
   STEP 1 — APARTMENTS LISTING  (01_apartments_listing.png)
   ═════════════════════════════════════════════════════════ */
function renderScreenListing() {
  const filtered = projectsData.filter(p => {
    if (selectedFilter === '2bhk') return p.bhkTypes.includes('2');
    if (selectedFilter === '3bhk') return p.bhkTypes.includes('3');
    return true;
  });

  const cardsHtml = filtered.map(p => `
    <div class="apt-ref-card" data-project-id="${p.id}">
      <div class="apt-ref-card-img-wrap">
        <img src="${p.image}" alt="${p.name}" class="apt-ref-card-img" />
      </div>
      <div class="apt-ref-card-content">
        <h3 class="apt-ref-card-title">${p.name}</h3>
        <div class="apt-ref-card-loc">${PIN_ICON} <span>${p.location}</span></div>
        <div class="apt-ref-card-price">${p.price}</div>
        <div class="apt-ref-card-footer">
          <span class="apt-ref-card-bhk">${p.bhk}</span>
          <button type="button" class="apt-ref-btn-details" onclick="window._aptNav('/apartments/${p.id}')">
            <span>View Details</span> ${ARROW_RIGHT}
          </button>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section class="apt-ref-listing-page">
      <div class="apt-ref-container">
        <!-- Hero Header -->
        <div class="apt-ref-listing-header">
          <div class="apt-ref-eyebrow">Apartments</div>
          <h1 class="apt-ref-title">Modern Homes for a Better Lifestyle</h1>
          <p class="apt-ref-subtitle">2 &amp; 3 BHK apartments with world-class amenities in prime locations.</p>
          
          <!-- Category Tabs -->
          <div class="apt-ref-tabs-bar">
            <button class="apt-ref-tab ${selectedFilter === 'all' ? 'active' : ''}" onclick="window._aptFilterTabs('all')">All Projects</button>
            <button class="apt-ref-tab ${selectedFilter === '2bhk' ? 'active' : ''}" onclick="window._aptFilterTabs('2bhk')">2 BHK</button>
            <button class="apt-ref-tab ${selectedFilter === '3bhk' ? 'active' : ''}" onclick="window._aptFilterTabs('3bhk')">3 BHK</button>
          </div>
        </div>

        <!-- Cards List -->
        <div class="apt-ref-cards-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 2 — PROJECT OVERVIEW  (02_project_overview.png)
   ═════════════════════════════════════════════════════════ */
function renderScreenOverview() {
  const p = projectsData[0];
  return `
    <section class="apt-ref-overview-page">
      <div class="apt-ref-container">
        <!-- Breadcrumb -->
        <nav class="apt-ref-breadcrumb" aria-label="Breadcrumb">
          <a href="#/apartments">Home</a>
          <span class="sep">&gt;</span>
          <a href="#/apartments">Projects</a>
          <span class="sep">&gt;</span>
          <span class="curr">${p.name}</span>
        </nav>

        <!-- Header -->
        <div class="apt-ref-ov-header">
          <h1 class="apt-ref-ov-title">${p.name}</h1>
          <div class="apt-ref-ov-meta">
            <div class="apt-ref-ov-loc">${PIN_ICON} <span>${p.location}</span></div>
            <div class="apt-ref-rera-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 12 14 22 4"/></svg>
              <span>RERA Approved</span>
            </div>
          </div>
        </div>

        <!-- Hero Carousel & Thumbnails -->
        <div class="apt-ref-ov-hero-block">
          <div class="apt-ref-ov-main-img-wrap">
            <img src="${p.image}" alt="${p.name}" class="apt-ref-ov-main-img" id="apt-ov-main-photo" />
            <button type="button" class="apt-ref-ov-nav-btn prev" aria-label="Previous image">&lsaquo;</button>
            <button type="button" class="apt-ref-ov-nav-btn next" aria-label="Next image">&rsaquo;</button>
          </div>
          <div class="apt-ref-ov-thumbs-row">
            <img src="/images/journey/overview_thumb_1.jpg" alt="Interior View 1" class="apt-ref-ov-thumb active" onclick="document.getElementById('apt-ov-main-photo').src=this.src; document.querySelectorAll('.apt-ref-ov-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');" />
            <img src="/images/journey/overview_thumb_2.jpg" alt="Interior View 2" class="apt-ref-ov-thumb" onclick="document.getElementById('apt-ov-main-photo').src=this.src; document.querySelectorAll('.apt-ref-ov-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');" />
            <img src="/images/journey/overview_thumb_3.jpg" alt="Interior View 3" class="apt-ref-ov-thumb" onclick="document.getElementById('apt-ov-main-photo').src=this.src; document.querySelectorAll('.apt-ref-ov-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');" />
            <img src="/images/journey/overview_thumb_4.jpg" alt="Interior View 4" class="apt-ref-ov-thumb" onclick="document.getElementById('apt-ov-main-photo').src=this.src; document.querySelectorAll('.apt-ref-ov-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');" />
          </div>
        </div>

        <!-- Key Stats Cards Grid -->
        <div class="apt-ref-ov-stats-grid">
          <div class="apt-ref-stat-card">
            <div class="stat-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/></svg></div>
            <div class="stat-val">2 &amp; 3 BHK</div>
            <div class="stat-lbl">Configurations</div>
          </div>
          <div class="apt-ref-stat-card">
            <div class="stat-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></div>
            <div class="stat-val">${p.area}</div>
            <div class="stat-lbl">Project Area</div>
          </div>
          <div class="apt-ref-stat-card">
            <div class="stat-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
            <div class="stat-val">${p.towers}</div>
            <div class="stat-lbl">${p.floors}</div>
          </div>
          <div class="apt-ref-stat-card">
            <div class="stat-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
            <div class="stat-val">${p.amenities}</div>
            <div class="stat-lbl">Amenities</div>
          </div>
        </div>

        <!-- Sub Navigation Tabs -->
        <div class="apt-ref-ov-tabs-row">
          <button type="button" class="apt-ref-ov-tab active">Overview</button>
          <button type="button" class="apt-ref-ov-tab">Amenities</button>
          <button type="button" class="apt-ref-ov-tab">Location</button>
          <button type="button" class="apt-ref-ov-tab">Gallery</button>
          <button type="button" class="apt-ref-ov-tab" onclick="window._aptNav('/apartments/vr-elite-towers/floor-plan')">Floor Plan</button>
        </div>

        <!-- About Section -->
        <div class="apt-ref-ov-about-card">
          <h2 class="apt-ref-ov-about-title">About the Project</h2>
          <p class="apt-ref-ov-about-desc">${p.about}</p>
          <div class="apt-ref-ov-actions-row">
            <button type="button" class="apt-ref-btn-primary" onclick="window._aptNav('/apartments/vr-elite-towers/floor-plan')">
              <span>View Floor Plan</span> ${ARROW_RIGHT}
            </button>
            <button type="button" class="apt-ref-btn-outline" onclick="alert('Downloading VR Elite Towers Brochure...')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              <span>Download Brochure</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 3 — FLOOR PLAN  (03_select_tower_floor.png)
   ═════════════════════════════════════════════════════════ */
function renderScreenFloorPlan() {
  return `
    <section class="apt-ref-floorplan-page">
      <div class="apt-ref-container">
        <!-- Breadcrumb -->
        <nav class="apt-ref-breadcrumb" aria-label="Breadcrumb">
          <a href="#/apartments">Home</a>
          <span class="sep">&gt;</span>
          <a href="#/apartments/vr-elite-towers">VR Elite Towers</a>
          <span class="sep">&gt;</span>
          <span class="curr">Floor Plan</span>
        </nav>

        <h1 class="apt-ref-fp-heading">Floor Plan</h1>

        <!-- Dropdown Selectors -->
        <div class="apt-ref-fp-filters">
          <div class="filter-group">
            <label class="filter-label">Select Tower</label>
            <div class="select-wrapper">
              <select id="fp-tower-select" onchange="window._aptSetTower(this.value)">
                <option value="Tower A" ${selectedTower === 'Tower A' ? 'selected' : ''}>Tower A</option>
                <option value="Tower B">Tower B</option>
                <option value="Tower C">Tower C</option>
              </select>
            </div>
          </div>
          <div class="filter-group">
            <label class="filter-label">Select Floor</label>
            <div class="select-wrapper">
              <select id="fp-floor-select" onchange="window._aptSetFloor(this.value)">
                <option value="7th Floor" ${selectedFloor === '7th Floor' ? 'selected' : ''}>7th Floor</option>
                <option value="6th Floor">6th Floor</option>
                <option value="5th Floor">5th Floor</option>
                <option value="4th Floor">4th Floor</option>
                <option value="3rd Floor">3rd Floor</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Legend Row -->
        <div class="apt-ref-fp-legend">
          <div class="legend-item"><span class="dot available"></span> Available</div>
          <div class="legend-item"><span class="dot booked"></span> Booked</div>
          <div class="legend-item"><span class="dot hold"></span> On Hold</div>
        </div>

        <!-- 10,000% Exact Interactive 3D Architectural Floor Plan Stage -->
        ${renderApartmentFloorPlan({
          units: floorUnitsData,
          activeUnitId: selectedUnit.id,
          tower: selectedTower,
          floor: selectedFloor,
          projectName: 'VR Elite Towers'
        })}
      </div>
    </section>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 4 — APARTMENT DETAILS / ROOM VIEW  (04_apartment_details.png)
   ═════════════════════════════════════════════════════════ */
function renderScreenDetails() {
  const currentRoom = roomStudioData[activeRoomIdx] || roomStudioData[0];

  const roomNavButtons = roomStudioData.map((r, idx) => `
    <button type="button" class="apt-ref-room-nav-btn${idx === activeRoomIdx ? ' active' : ''}" onclick="window._aptSwitchRoom(${idx})">
      <span class="r-icon">${r.icon}</span>
      <span class="r-name">${r.name}</span>
    </button>
  `).join('');

  const roomThumbs = roomStudioData.map((r, idx) => `
    <img src="${r.image}" alt="${r.name}" class="apt-ref-room-thumb${idx === activeRoomIdx ? ' active' : ''}" onclick="window._aptSwitchRoom(${idx})" />
  `).join('');

  return `
    <section class="apt-ref-details-page">
      <div class="apt-ref-container">
        <!-- Breadcrumb -->
        <nav class="apt-ref-breadcrumb" aria-label="Breadcrumb">
          <a href="#/apartments">Home</a>
          <span class="sep">&gt;</span>
          <a href="#/apartments/vr-elite-towers">VR Elite Towers</a>
          <span class="sep">&gt;</span>
          <a href="#/apartments/vr-elite-towers/floor-plan">Tower A</a>
          <span class="sep">&gt;</span>
          <span class="curr">${selectedUnit.id}</span>
        </nav>

        <!-- Room Studio & Property Info Layout -->
        <div class="apt-ref-details-grid">
          <!-- Room Sidebar -->
          <div class="apt-ref-room-sidebar">${roomNavButtons}</div>

          <!-- Main Room Display Viewport -->
          <div class="apt-ref-room-viewport-card">
            <div class="viewport-main-photo-wrap">
              <img src="${currentRoom.image}" alt="${currentRoom.name}" class="viewport-photo" id="apt-detail-main-photo" />
              <button type="button" class="photo-nav-arrow prev" onclick="window._aptPrevRoom()" aria-label="Previous Room">&lsaquo;</button>
              <button type="button" class="photo-nav-arrow next" onclick="window._aptNextRoom()" aria-label="Next Room">&rsaquo;</button>
            </div>
            <div class="viewport-info-bar">
              <h3 class="viewport-room-name">${currentRoom.name}</h3>
              <p class="viewport-room-desc">${currentRoom.desc}</p>
            </div>
            <div class="viewport-thumbs-row">${roomThumbs}</div>
          </div>
        </div>

        <!-- Selected Apartment Property Info Box -->
        <div class="apt-ref-property-info-card">
          <div class="prop-info-top">
            <div>
              <h2 class="prop-unit-title">${selectedUnit.unitName}</h2>
              <div class="prop-price">${selectedUnit.price} <span class="sub">${selectedUnit.priceSub}</span></div>
            </div>
            <div class="prop-avail-badge">${CHECK_ICON} <span>Available</span></div>
          </div>

          <!-- Specs Grid -->
          <div class="prop-specs-grid">
            <div class="spec-cell"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> <strong>${selectedUnit.size}</strong><br/><small>Super Built-up</small></div>
            <div class="spec-cell"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18"/></svg> <strong>${selectedUnit.floor}</strong><br/><small>Floor No.</small></div>
            <div class="spec-cell"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><circle cx="12" cy="12" r="9"/><polygon points="12 3 14 10 21 12 14 14 12 21 10 14 3 12 10 10"/></svg> <strong>${selectedUnit.facing}</strong><br/><small>Facing</small></div>
            <div class="spec-cell"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="M2 4v16M2 8h18a2 2 0 012 2v10M2 17h20"/></svg> <strong>${selectedUnit.beds}</strong><br/><small>Bedrooms</small></div>
            <div class="spec-cell"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z"/></svg> <strong>${selectedUnit.baths}</strong><br/><small>Bathrooms</small></div>
            <div class="spec-cell"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="2" y1="12" x2="22" y2="12"/></svg> <strong>${selectedUnit.balconies}</strong><br/><small>Balconies</small></div>
          </div>

          <!-- Action Buttons -->
          <div class="prop-actions-row">
            <button type="button" class="apt-ref-btn-primary" onclick="window._aptNav('/apartments/vr-elite-towers/enquiry')">
              <span>Send Enquiry</span> ${ARROW_RIGHT}
            </button>
            <button type="button" class="apt-ref-btn-secondary" onclick="window._aptNav('/apartments/vr-elite-towers/site-visit')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>Book Site Visit</span>
            </button>
            <a href="https://maps.google.com/?q=Kokapet+Hyderabad" target="_blank" rel="noopener" class="apt-ref-btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>View on Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 5 — SEND ENQUIRY FORM  (05_send_enquiry.png)
   ═════════════════════════════════════════════════════════ */
function renderScreenEnquiry() {
  return `
    <section class="apt-ref-enquiry-page">
      <div class="apt-ref-container-narrow">
        <div class="apt-ref-form-card">
          <div class="form-card-header">
            <div>
              <h1 class="form-card-title">Send Enquiry</h1>
              <p class="form-card-sub">Get in touch with our team. We will call you shortly.</p>
            </div>
            <button type="button" class="close-x-btn" onclick="window._aptNav('/apartments/vr-elite-towers/unit/${selectedUnit.id.toLowerCase()}')">&times;</button>
          </div>

          <form id="apt-ref-enquiry-form" class="apt-ref-form">
            <div class="form-field">
              <label class="field-label">Full Name *</label>
              <input type="text" id="enq-input-name" class="field-input" placeholder="Enter your name" required />
            </div>
            <div class="form-field">
              <label class="field-label">Mobile Number *</label>
              <input type="tel" id="enq-input-mobile" class="field-input" placeholder="Enter mobile number" maxlength="10" required />
            </div>
            <div class="form-field">
              <label class="field-label">Email</label>
              <input type="email" id="enq-input-email" class="field-input" placeholder="Enter your email" />
            </div>
            <div class="form-field">
              <label class="field-label">Message (Optional)</label>
              <textarea id="enq-input-msg" class="field-textarea" rows="3">I am interested in ${selectedUnit.id} (${selectedUnit.type}) at ${selectedUnit.projectName}. Please share more details.</textarea>
            </div>

            <!-- Selected Property Details Box -->
            <div class="selected-property-box">
              <div class="box-label">Selected Property Details</div>
              <div class="box-content">
                <img src="${selectedUnit.thumb}" alt="${selectedUnit.projectName}" class="box-thumb" />
                <div class="box-meta">
                  <div class="box-title">${selectedUnit.unitName}</div>
                  <div class="box-project">${selectedUnit.projectName}</div>
                  <div class="box-loc">${selectedUnit.location}</div>
                  <div class="box-price">${selectedUnit.price}</div>
                </div>
              </div>
            </div>

            <button type="submit" class="apt-ref-btn-primary full">Submit Enquiry</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 6 — ENQUIRY SUCCESS  (06_enquiry_success.png)
   ═════════════════════════════════════════════════════════ */
function renderScreenEnquirySuccess() {
  return `
    <section class="apt-ref-success-page">
      <div class="apt-ref-container-narrow">
        <div class="apt-ref-success-card">
          <div class="success-icon-badge">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>

          <h1 class="success-title">Enquiry Submitted!</h1>
          <p class="success-sub">Thank you for your interest.<br/>Our team will contact you shortly.</p>

          <div class="next-steps-card">
            <h3 class="next-steps-title">What happens next?</h3>
            <div class="step-row">
              <div class="step-icon-circle"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
              <div class="step-text"><span>1</span> Our team will review your details.</div>
            </div>
            <div class="step-row">
              <div class="step-icon-circle"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>
              <div class="step-text"><span>2</span> You will receive a call from our sales team.</div>
            </div>
            <div class="step-row">
              <div class="step-icon-circle"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div class="step-text"><span>3</span> Get ready to explore your dream home!</div>
            </div>
          </div>

          <button type="button" class="apt-ref-btn-outline full" onclick="window._aptNav('/apartments/vr-elite-towers')">Back to Project</button>
        </div>
      </div>
    </section>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 7A — BOOK SITE VISIT: PROPERTY DETAILS  (07_book_site_visit_property_details.png)
   ═════════════════════════════════════════════════════════ */
function renderScreenSiteVisit() {
  return `
    <section class="apt-ref-sitevisit-details-page">
      <div class="apt-ref-container-narrow">
        <button type="button" class="back-link-btn" onclick="window._aptNav('/apartments/vr-elite-towers/unit/${selectedUnit.id.toLowerCase()}')">
          &larr; Back to VR Elite Towers
        </button>

        <div class="sv-hero-photo-wrap">
          <img src="/images/journey/room_living.jpg" alt="${selectedUnit.unitName}" class="sv-photo" id="sv-hero-photo" />
          <span class="sv-photo-counter">1/5</span>
        </div>

        <div class="sv-thumbs-row">
          <img src="/images/journey/room_living.jpg" alt="Living" class="sv-thumb active" onclick="document.getElementById('sv-hero-photo').src=this.src; document.querySelectorAll('.sv-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');" />
          <img src="/images/journey/room_thumb_1.jpg" alt="Kitchen" class="sv-thumb" onclick="document.getElementById('sv-hero-photo').src=this.src; document.querySelectorAll('.sv-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');" />
          <img src="/images/journey/room_thumb_2.jpg" alt="Master Bed" class="sv-thumb" onclick="document.getElementById('sv-hero-photo').src=this.src; document.querySelectorAll('.sv-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');" />
          <img src="/images/journey/room_thumb_3.jpg" alt="Bedroom 2" class="sv-thumb" onclick="document.getElementById('sv-hero-photo').src=this.src; document.querySelectorAll('.sv-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');" />
          <img src="/images/journey/room_thumb_4.jpg" alt="Bathroom" class="sv-thumb" onclick="document.getElementById('sv-hero-photo').src=this.src; document.querySelectorAll('.sv-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');" />
        </div>

        <div class="sv-details-card">
          <div class="sv-title-row">
            <h2 class="sv-unit-title">${selectedUnit.shortName}</h2>
            <span class="prop-avail-badge">${CHECK_ICON} <span>Available</span></span>
          </div>

          <div class="sv-specs-grid">
            <div class="sv-spec-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> <span>1620 Sq.Ft.</span></div>
            <div class="sv-spec-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><circle cx="12" cy="12" r="9"/><polygon points="12 3 14 10 21 12 14 14 12 21 10 14 3 12 10 10"/></svg> <span>${selectedUnit.facing}</span></div>
            <div class="sv-spec-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="M2 4v16M2 8h18a2 2 0 012 2v10M2 17h20"/></svg> <span>${selectedUnit.beds} Bedrooms</span></div>
            <div class="sv-spec-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1z"/></svg> <span>${selectedUnit.baths} Bathrooms</span></div>
            <div class="sv-spec-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="2" y1="12" x2="22" y2="12"/></svg> <span>${selectedUnit.balconies} Balconies</span></div>
          </div>

          <div class="sv-price-row">${selectedUnit.shortPrice} <span class="sub">(All inclusive)</span></div>

          <div class="sv-actions-col">
            <button type="button" class="apt-ref-btn-outline full" onclick="window._aptNav('/apartments/vr-elite-towers/enquiry')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
              <span>Send Enquiry</span>
            </button>
            <button type="button" class="apt-ref-btn-primary full" onclick="window._aptNav('/apartments/vr-elite-towers/site-visit/form')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>Book Site Visit</span>
            </button>
            <a href="https://maps.google.com/?q=Kokapet+Hyderabad" target="_blank" rel="noopener" class="apt-ref-btn-outline full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>View on Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 7B — BOOK SITE VISIT FORM  (08_book_site_visit_form.png)
   ═════════════════════════════════════════════════════════ */
function renderScreenSiteVisitForm() {
  const todayStr = new Date().toISOString().split('T')[0];
  return `
    <section class="apt-ref-sitevisit-form-page">
      <div class="apt-ref-container-narrow">
        <button type="button" class="back-link-btn" onclick="window._aptNav('/apartments/vr-elite-towers/site-visit')">
          &larr; Back
        </button>

        <h1 class="sv-form-title">Book a Site Visit</h1>
        <p class="sv-form-sub">Share your details and preferred date.<br/>Our team will contact you to confirm the visit.</p>

        <!-- Selected Property Summary -->
        <div class="selected-property-box compact">
          <div class="box-label">Selected Property</div>
          <div class="box-content">
            <img src="${selectedUnit.thumb}" alt="${selectedUnit.projectName}" class="box-thumb" />
            <div class="box-meta">
              <div class="box-project">${selectedUnit.projectName}</div>
              <div class="box-title">${selectedUnit.shortName}</div>
              <div class="box-loc">${selectedUnit.location}</div>
              <div class="box-price">${selectedUnit.shortPrice}</div>
            </div>
          </div>
        </div>

        <form id="apt-ref-sv-form" class="apt-ref-form">
          <div class="form-field">
            <label class="field-label">Full Name *</label>
            <input type="text" id="sv-input-name" class="field-input" placeholder="Siva Prasad" required />
          </div>
          <div class="form-field">
            <label class="field-label">Mobile Number *</label>
            <input type="tel" id="sv-input-mobile" class="field-input" placeholder="9876543210" maxlength="10" required />
          </div>
          <div class="form-field">
            <label class="field-label">Email</label>
            <input type="email" id="sv-input-email" class="field-input" placeholder="siva@example.com" />
          </div>
          <div class="form-field">
            <label class="field-label">Preferred Date *</label>
            <input type="date" id="sv-input-date" class="field-input" value="${todayStr}" required />
          </div>
          <div class="form-field">
            <label class="field-label">Preferred Time Slot *</label>
            <div class="select-wrapper">
              <select id="sv-input-time" class="field-input" required>
                <option value="10:00 AM - 12:00 PM" selected>10:00 AM - 12:00 PM</option>
                <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
              </select>
            </div>
          </div>
          <div class="form-field">
            <label class="field-label">Any Message (Optional)</label>
            <textarea id="sv-input-msg" class="field-textarea" rows="2" placeholder="I would like to visit with my family."></textarea>
          </div>

          <button type="submit" class="apt-ref-btn-primary full">Submit Request</button>
        </form>
      </div>
    </section>
  `;
}

/* ═════════════════════════════════════════════════════════
   STEP 7C — SITE VISIT REQUEST SUCCESS  (09_site_visit_success.png)
   ═════════════════════════════════════════════════════════ */
function renderScreenSiteVisitSuccess() {
  return `
    <section class="apt-ref-success-page">
      <div class="apt-ref-container-narrow">
        <div class="apt-ref-success-card">
          <div class="success-icon-badge">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>

          <h1 class="success-title">Site Visit Request Submitted!</h1>
          <p class="success-sub">Thank you, <strong>${siteVisitName || 'Guest'}</strong>!<br/>Your site visit request has been submitted. Our team will contact you shortly to confirm the visit.</p>

          <!-- Selected Property Summary -->
          <div class="selected-property-box compact">
            <div class="box-label">Selected Property</div>
            <div class="box-content">
              <img src="${selectedUnit.thumb}" alt="${selectedUnit.projectName}" class="box-thumb" />
              <div class="box-meta">
                <div class="box-project">${selectedUnit.projectName}</div>
                <div class="box-title">${selectedUnit.shortName}</div>
                <div class="box-loc">${selectedUnit.location}</div>
                <div class="box-price">${selectedUnit.shortPrice}</div>
              </div>
            </div>
          </div>

          <div class="next-steps-card">
            <h3 class="next-steps-title">What happens next?</h3>
            <div class="step-row">
              <div class="step-icon-circle"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
              <div class="step-text"><span>1</span> Our team will review your request.</div>
            </div>
            <div class="step-row">
              <div class="step-icon-circle"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>
              <div class="step-text"><span>2</span> The owner will call you to confirm the site visit.</div>
            </div>
            <div class="step-row">
              <div class="step-icon-circle"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3B2B" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>
              <div class="step-text"><span>3</span> Once confirmed, you will receive a confirmation message on WhatsApp.</div>
            </div>
          </div>

          <button type="button" class="apt-ref-btn-outline full" onclick="window._aptNav('/apartments/vr-elite-towers')">Back to Project</button>
        </div>
      </div>
    </section>
  `;
}

/* ═══════════════════ GLOBAL EVENT HANDLERS ═══════════════════ */
function attachEvents(screen) {
  // Navigation helper
  window._aptNav = (routePath) => {
    window.location.hash = '#' + routePath;
    window.scrollTo(0, 0);
  };

  // Filter tabs in listing
  window._aptFilterTabs = (f) => {
    selectedFilter = f;
    const host = document.getElementById('apt-screen-host');
    if (host) {
      host.innerHTML = renderScreenListing();
      attachEvents('listing');
    }
  };

  // Tower & Floor selectors
  window._aptSetTower = (val) => { selectedTower = val; };
  window._aptSetFloor = (val) => { selectedFloor = val; };

  // Initialize interactive 3D floor plan if on floorplan screen
  if (screen === 'floorplan') {
    initApartmentFloorPlan({ units: floorUnitsData });
  }

  // Select Unit -> Details with booking safety
  window._aptSelectUnit = (unitId) => {
    const found = floorUnitsData.find(u => u.id === unitId);
    if (!found) return;

    if (found.status === 'sold') {
      alert('This unit is sold out and unavailable for booking.');
      return;
    }

    selectedUnit = {
      ...selectedUnit,
      id: found.id,
      unitName: `${found.id} · ${found.type}`,
      shortName: `Unit ${found.id.replace('A-', '')} - ${found.type}`,
      price: found.price,
      size: found.size,
      facing: found.facing,
      beds: found.beds,
      baths: found.baths,
      balconies: found.balconies,
      status: found.status === 'on_hold' ? 'On Hold' : (found.status === 'booked' ? 'Booked' : (found.status === 'sold' ? 'Sold' : 'Available'))
    };
    activeRoomIdx = 0;
    window._aptNav('/apartments/vr-elite-towers/unit/' + found.id.toLowerCase());
  };

  // Room studio controls
  window._aptSwitchRoom = (idx) => {
    activeRoomIdx = idx;
    const host = document.getElementById('apt-screen-host');
    if (host) {
      host.innerHTML = renderScreenDetails();
      attachEvents('details');
    }
  };
  window._aptPrevRoom = () => {
    activeRoomIdx = (activeRoomIdx - 1 + roomStudioData.length) % roomStudioData.length;
    window._aptSwitchRoom(activeRoomIdx);
  };
  window._aptNextRoom = () => {
    activeRoomIdx = (activeRoomIdx + 1) % roomStudioData.length;
    window._aptSwitchRoom(activeRoomIdx);
  };

  // Enquiry submit handler
  if (screen === 'enquiry') {
    const form = document.getElementById('apt-ref-enquiry-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('enq-input-name').value.trim();
        const mobile = document.getElementById('enq-input-mobile').value.trim();
        if (!name || name.length < 2) { alert('Please enter your full name.'); return; }
        if (!/^[6-9]\d{9}$/.test(mobile)) { alert('Please enter a valid 10-digit mobile number.'); return; }
        enquiryName = name;
        window._aptNav('/apartments/vr-elite-towers/enquiry-success');
      });
    }
  }

  // Site visit form submit handler
  if (screen === 'site-visit-form') {
    const form = document.getElementById('apt-ref-sv-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('sv-input-name').value.trim();
        const mobile = document.getElementById('sv-input-mobile').value.trim();
        const date = document.getElementById('sv-input-date').value;
        if (!name || name.length < 2) { alert('Please enter your full name.'); return; }
        if (!/^[6-9]\d{9}$/.test(mobile)) { alert('Please enter a valid 10-digit mobile number.'); return; }
        if (!date) { alert('Please select a preferred date.'); return; }
        siteVisitName = name;
        window._aptNav('/apartments/vr-elite-towers/site-visit/success');
      });
    }
  }
}
