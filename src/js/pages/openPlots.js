import { renderHeader, initStickyNav } from '../components/header.js';
import { renderFooter, initScrollTop } from '../components/footer.js';

export const openPlotsData = [
  {
    id: 'vr-green-meadows',
    title: 'VR Green Meadows',
    location: 'Shadnagar, Hyderabad',
    size: '200 – 400 Sq. Yds',
    price: '₹ 32,00,000',
    rate: '(₹ 16,000 / Sq.Yd)',
    image: '/images/plots/plot_vr_green_meadows.jpg',
    tags: [
      { label: 'Gated Community', icon: '🍃' },
      { label: 'Wide Roads', icon: '🛣️' },
      { label: 'Parks & Greenery', icon: '🌲' }
    ],
    status: 'Available',
    link: '#/vr-green-meadows'
  },
  {
    id: 'elite-county-plots',
    title: 'Elite County Plots',
    location: 'Kokapet, Hyderabad',
    size: '250 – 500 Sq. Yds',
    price: '₹ 36,00,000',
    rate: '(₹ 18,000 / Sq.Yd)',
    image: '/images/plots/plot_elite_county.jpg',
    tags: [
      { label: 'HMDA Approved', icon: '🛡️' },
      { label: 'High Appreciation', icon: '📊' },
      { label: 'Lush Green Surroundings', icon: '🌲' }
    ],
    status: 'Available',
    link: '#/vr-green-meadows'
  },
  {
    id: 'natures-nest-plots',
    title: "Nature's Nest Plots",
    location: 'Shankarpally, Hyderabad',
    size: '150 – 300 Sq. Yds',
    price: '₹ 28,50,000',
    rate: '(₹ 19,000 / Sq.Yd)',
    image: '/images/plots/plot_natures_nest.jpg',
    tags: [
      { label: 'DTCP Approved', icon: '🛡️' },
      { label: 'Secure Community', icon: '🛡️' },
      { label: 'Peaceful Environment', icon: '🌲' }
    ],
    status: 'Available',
    link: '#/vr-green-meadows'
  },
  {
    id: 'siri-agro-plots',
    title: 'Siri Agro Plots',
    location: 'Maheshwaram, Hyderabad',
    size: '200 – 500 Sq. Yds',
    price: '₹ 24,00,000',
    rate: '(₹ 12,000 / Sq.Yd)',
    image: '/images/plots/plot_siri_agro.jpg',
    tags: [
      { label: 'Clear Titles', icon: '🍃' },
      { label: 'Black Top Roads', icon: '🛣️' },
      { label: 'Ready for Construction', icon: '🌲' }
    ],
    status: 'Available',
    link: '#/vr-green-meadows'
  },
  {
    id: 'svr-developers-plots',
    title: 'SVR Developers Plots',
    location: 'Yadagirigutta, Hyderabad',
    size: '167 – 400 Sq. Yds',
    price: '₹ 21,00,000',
    rate: '(₹ 12,500 / Sq.Yd)',
    image: '/images/plots/plot_svr_developers.jpg',
    tags: [
      { label: 'Great Connectivity', icon: '🍃' },
      { label: 'Growing Location', icon: '🌲' },
      { label: 'Secure Investment', icon: '🛡️' }
    ],
    status: 'Available',
    link: '#/vr-green-meadows'
  }
];

export function renderOpenPlotsPage() {
  const cardsHtml = openPlotsData.map(plot => `
    <a href="${plot.link}" class="plot-card-horizontal" data-plot-id="${plot.id}">
      <!-- Thumbnail Image -->
      <div class="plot-card-thumb-wrap">
        <img src="${plot.image}" alt="${plot.title}" class="plot-card-thumb" loading="lazy" />
      </div>

      <!-- Main Plot Information -->
      <div class="plot-card-info">
        <h3 class="plot-card-name">${plot.title}</h3>
        
        <div class="plot-card-loc-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="plot-card-loc-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>${plot.location}</span>
        </div>

        <div class="plot-card-dim-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>
          <span>${plot.size}</span>
        </div>

        <div class="plot-card-price-row">
          <span class="plot-card-price-main">${plot.price}</span>
          <span class="plot-card-price-rate">${plot.rate}</span>
        </div>

        <!-- Tags / Highlights -->
        <div class="plot-card-tags-row">
          ${plot.tags.map(t => `
            <div class="plot-tag-item">
              <span class="plot-tag-icon">${t.icon}</span>
              <span>${t.label}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right Side Actions / Badge -->
      <div class="plot-card-actions-side">
        <div class="plot-card-top-pills">
          <button type="button" class="plot-fav-btn" onclick="event.preventDefault(); event.stopPropagation(); this.classList.toggle('active');" aria-label="Save Property">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <span class="plot-status-pill available">Available</span>
        </div>

        <div class="plot-card-arrow-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </a>
  `).join('');

  const html = `
    <div class="open-plots-page">
      ${renderHeader({ currentPath: '#/open-plots', isOpenPlots: true })}
      
      <div class="open-plots-container">
        <!-- Top Breadcrumb -->
        <div class="open-plots-top-nav">
          <nav class="open-plots-breadcrumb" aria-label="Breadcrumb">
            <a href="#/">Home</a>
            <span class="sep">&gt;</span>
            <span class="current">Open Plots</span>
          </nav>
        </div>

        <!-- Page Main Heading -->
        <div class="open-plots-header-section">
          <h1 class="open-plots-main-title">Open Plots</h1>
          <p class="open-plots-main-subtitle">Find your perfect plot in prime locations</p>
        </div>

        <!-- Two Column Layout: Filters & Cards List -->
        <div class="open-plots-layout-grid">
          
          <!-- Column 1: Left Filter Sidebar -->
          <aside class="plots-filter-card" aria-label="Filter Plots">
            <div class="plots-filter-header">
              <h2 class="plots-filter-title">Find Your Plot</h2>
              <button type="button" class="plots-reset-btn" id="plots-reset-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                <span>Reset</span>
              </button>
            </div>

            <!-- Search input -->
            <div class="plots-search-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="plots-search-icon"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="plots-search-input" class="plots-search-input" placeholder="Search plots..." />
            </div>

            <!-- Select Filters -->
            <div class="plots-select-group">
              <div class="plots-select-wrap">
                <select id="filter-project">
                  <option value="">All Projects</option>
                  <option value="vr-green-meadows">VR Green Meadows</option>
                  <option value="elite-county">Elite County Plots</option>
                  <option value="natures-nest">Nature's Nest Plots</option>
                  <option value="siri-agro">Siri Agro Plots</option>
                  <option value="svr-developers">SVR Developers Plots</option>
                </select>
              </div>
            </div>

            <div class="plots-select-group">
              <div class="plots-select-wrap">
                <select id="filter-location">
                  <option value="">All Locations</option>
                  <option value="shadnagar">Shadnagar, Hyderabad</option>
                  <option value="kokapet">Kokapet, Hyderabad</option>
                  <option value="shankarpally">Shankarpally, Hyderabad</option>
                  <option value="maheshwaram">Maheshwaram, Hyderabad</option>
                  <option value="yadagirigutta">Yadagirigutta, Hyderabad</option>
                </select>
              </div>
            </div>

            <div class="plots-select-group">
              <div class="plots-select-wrap">
                <select id="filter-size">
                  <option value="">Plot Size (Sq. Yds)</option>
                  <option value="150-250">150 – 250 Sq. Yds</option>
                  <option value="250-400">200 – 400 Sq. Yds</option>
                  <option value="400+">400+ Sq. Yds</option>
                </select>
              </div>
            </div>

            <div class="plots-select-group">
              <div class="plots-select-wrap">
                <select id="filter-price">
                  <option value="">Price Range</option>
                  <option value="under-25">Below ₹ 25 Lakhs</option>
                  <option value="25-35">₹ 25 Lakhs – ₹ 35 Lakhs</option>
                  <option value="above-35">Above ₹ 35 Lakhs</option>
                </select>
              </div>
            </div>

            <div class="plots-select-group">
              <div class="plots-select-wrap">
                <select id="filter-facing">
                  <option value="">Facing</option>
                  <option value="east">East Facing</option>
                  <option value="west">West Facing</option>
                  <option value="north">North Facing</option>
                  <option value="south">South Facing</option>
                </select>
              </div>
            </div>

            <div class="plots-select-group">
              <div class="plots-select-wrap">
                <select id="filter-availability">
                  <option value="">Availability</option>
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>

            <button type="button" class="plots-apply-btn" id="plots-apply-btn">
              Apply Filters
            </button>
          </aside>

          <!-- Column 2: Right Plots List -->
          <main class="plots-cards-list" id="plots-cards-list">
            ${cardsHtml}
          </main>

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

      const searchInput = document.getElementById('plots-search-input');
      const resetBtn = document.getElementById('plots-reset-btn');
      const applyBtn = document.getElementById('plots-apply-btn');
      const projectFilter = document.getElementById('filter-project');
      const locationFilter = document.getElementById('filter-location');
      const cards = document.querySelectorAll('.plot-card-horizontal');

      function filterCards() {
        const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
        const loc = (locationFilter ? locationFilter.value : '').toLowerCase();
        const proj = (projectFilter ? projectFilter.value : '').toLowerCase();

        cards.forEach(card => {
          const text = card.textContent.toLowerCase();
          const matchesQuery = !query || text.includes(query);
          const matchesLoc = !loc || text.includes(loc);
          const matchesProj = !proj || card.getAttribute('data-plot-id').includes(proj);

          if (matchesQuery && matchesLoc && matchesProj) {
            card.style.display = 'grid';
          } else {
            card.style.display = 'none';
          }
        });
      }

      if (searchInput) searchInput.addEventListener('input', filterCards);
      if (applyBtn) applyBtn.addEventListener('click', filterCards);
      if (locationFilter) locationFilter.addEventListener('change', filterCards);
      if (projectFilter) projectFilter.addEventListener('change', filterCards);

      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          if (projectFilter) projectFilter.value = '';
          if (locationFilter) locationFilter.value = '';
          cards.forEach(c => c.style.display = 'grid');
        });
      }
    }
  };
}
