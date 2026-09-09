import { renderHomePage } from './pages/home.js';
import { renderOpenPlotsPage } from './pages/openPlots.js';
import { renderPropertyDetailPage } from './pages/propertyDetail.js';
import { renderProjectDetail } from './pages/projectDetailEngine.js';
import { renderApartmentsPage } from './pages/apartmentsJourney.js';
import { renderVillasPage } from './pages/villasJourney.js';
import { renderFarmlandsPage } from './pages/farmlandsJourney.js';
import { renderCrmPage } from './pages/crmDashboard.js';
import './components/aiAssistant.js';
import '../styles/aiAssistant.css';
import {
  renderAboutPage,
  renderServicesPage,
  renderContactPage,
  renderResourcesPage,
  renderMediaPage,
  renderCategoryListingPage,
  renderStaticPage
} from './pages/staticPages.js';
import './components/siteVisitModal.js';
import './components/sharedBookSiteVisit.js';

const routes = {
  '/crm': renderCrmPage,
  '/': renderHomePage,
  '/open-plots': renderOpenPlotsPage,
  '/open-plots.html': renderOpenPlotsPage,
  '/villas': () => renderVillasPage('/villas'),
  '/vr-green-meadows': () => renderProjectDetail('vr-green-meadows'),
  '/vr-prime-meadows': () => renderProjectDetail('vr-green-meadows'),
  '/amodha': () => renderProjectDetail('vr-green-meadows'),
  '/amodha.html': () => renderProjectDetail('vr-green-meadows'),
  '/apartments': () => renderApartmentsPage('listing'),
  '/vr-elite-towers': () => renderApartmentsPage('overview'),
  '/vr-green-villas': () => renderVillasPage('/villas/vr-green-villas'),
  '/vr-heights': () => renderProjectDetail('vr-heights'),
  '/vr-agro-lands': () => renderProjectDetail('vr-agro-lands'),
  '/about': renderAboutPage,
  '/services': renderServicesPage,
  '/resources': renderResourcesPage,
  '/media': renderMediaPage,
  '/contact': renderContactPage,
  '/farmlands': () => renderFarmlandsPage('/farmlands'),
};

function router() {
  const hash = window.location.hash || '#/';
  let path = hash.replace(/^#/, '');

  // Strip query params if any
  const cleanPath = path.split('?')[0];

  const appEl = document.getElementById('app');
  if (!appEl) return;

  // Scroll to top on route change
  window.scrollTo(0, 0);

  // Exact route match
  if (routes[cleanPath]) {
    const page = routes[cleanPath]();
    appEl.innerHTML = page.html;
    if (page.init) page.init();
    return;
  }

  // Dynamic apartments journey route: /apartments/...
  if (cleanPath.startsWith('/apartments')) {
    const page = renderApartmentsPage(cleanPath);
    appEl.innerHTML = page.html;
    if (page.init) page.init();
    return;
  }

  // Dynamic villas journey route: /villas/...
  if (cleanPath.startsWith('/villas')) {
    const page = renderVillasPage(cleanPath);
    appEl.innerHTML = page.html;
    if (page.init) page.init();
    return;
  }

  // Dynamic farmlands journey route: /farmlands/...
  if (cleanPath.startsWith('/farmlands')) {
    const page = renderFarmlandsPage(cleanPath);
    appEl.innerHTML = page.html;
    if (page.init) page.init();
    return;
  }

  // Dynamic property route: /property/:id
  if (cleanPath.startsWith('/property/')) {
    const propId = cleanPath.replace('/property/', '');
    const page = renderPropertyDetailPage(propId);
    appEl.innerHTML = page.html;
    if (page.init) page.init();
    return;
  }

  // Dynamic guides route: /guides/:id
  if (cleanPath.startsWith('/guides/')) {
    const guideName = cleanPath.replace('/guides/', '').replace(/-/g, ' ').toUpperCase();
    const page = renderStaticPage(
      `${guideName} BUYER GUIDE`,
      'Complete legal, connectivity, and development insights.',
      `
        <p style="margin-bottom: 20px;">Welcome to the official <strong>${guideName} Buyer Guide</strong> by VR Real Estates. When investing in real estate, thorough due diligence and on-ground analysis are paramount.</p>
        <div style="background: #f0f7ff; border-left: 4px solid #0e4b9e; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
          <h4 style="color: #0e4b9e; margin-bottom: 8px;">Key Verification Steps:</h4>
          <ul>
            <li>Verify 100% HMDA / DTCP master plan permissions and layouts.</li>
            <li>Confirm road widening, regional ring road corridors, and zone demarcations.</li>
            <li>Inspect physical boundary stones, blacktop roads, and electricity connections.</li>
          </ul>
        </div>
        <button class="nav-cta-blue" onclick="window.openSiteVisitModal('${guideName} Guide')">Download Full PDF Guide</button>
      `,
      hash
    );
    appEl.innerHTML = page.html;
    if (page.init) page.init();
    return;
  }

  // Dynamic location route: /location/:id
  if (cleanPath.startsWith('/location/')) {
    const locName = cleanPath.replace('/location/', '').toUpperCase();
    const page = renderStaticPage(
      `PROPERTY IN ${locName}`,
      `Explore high-potential real estate and open plot opportunities across ${locName}.`,
      `
        <p style="margin-bottom: 20px;">Discover verified properties and fast-appreciating ventures in <strong>${locName}</strong>. All projects are hand-picked and vetted for clear titles, approved layouts, and immediate registration.</p>
        <div style="margin-top: 24px;">
          <a href="#/open-plots" class="hero-split-btn">
            <span class="hero-btn-main">Explore Open Plots in ${locName}</span>
            <span class="hero-btn-arrow">&raquo;</span>
          </a>
        </div>
      `,
      hash
    );
    appEl.innerHTML = page.html;
    if (page.init) page.init();
    return;
  }

  // Fallback to home
  const page = renderHomePage();
  appEl.innerHTML = page.html;
  if (page.init) page.init();
}

window.addEventListener('hashchange', router);
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', router);
} else {
  router();
}
