/**
 * 10,000% Pixel-Perfect Interactive 3D Architectural Apartment Floor Plan Component
 * Matches the reference design with extreme visual fidelity and full interactivity
 */

export const DEFAULT_FLOOR_UNITS = [
  {
    id: 'A-701',
    num: 'A-701',
    type: '2 BHK',
    size: '1,200 Sq.Ft.',
    price: '₹ 95 Lakhs',
    priceSub: '(All Inclusive)',
    facing: 'North Facing',
    beds: '2',
    baths: '2',
    balconies: '1',
    status: 'available',
    rect: { left: '2.5%', top: '3.5%', width: '32%', height: '44%' },
    badgePos: { left: '17.2%', top: '23.8%' },
    thumb: '/images/journey/room_living.jpg'
  },
  {
    id: 'A-702',
    num: 'A-702',
    type: '3 BHK',
    size: '1,450 Sq.Ft.',
    price: '₹ 1.20 Cr',
    priceSub: '(All Inclusive)',
    facing: 'East Facing',
    beds: '3',
    baths: '3',
    balconies: '2',
    status: 'available',
    rect: { left: '35.2%', top: '3.5%', width: '29.5%', height: '44%' },
    badgePos: { left: '50%', top: '23.8%' },
    thumb: '/images/journey/room_living.jpg'
  },
  {
    id: 'A-703',
    num: 'A-703',
    type: '3 BHK',
    size: '1,500 Sq.Ft.',
    price: '₹ 1.28 Cr',
    priceSub: '(All Inclusive)',
    facing: 'West Facing',
    beds: '3',
    baths: '3',
    balconies: '2',
    status: 'available',
    rect: { left: '65.2%', top: '3.5%', width: '32.3%', height: '44%' },
    badgePos: { left: '81.8%', top: '23.8%' },
    thumb: '/images/journey/room_living.jpg'
  },
  {
    id: 'A-704',
    num: 'A-704',
    type: '3 BHK',
    size: '1,850 Sq.Ft.',
    price: '₹ 1.25 Cr',
    priceSub: '(All Inclusive)',
    facing: 'East Facing',
    beds: '3',
    baths: '3',
    balconies: '2',
    status: 'on_hold',
    isHighlight: true,
    rect: { left: '2.5%', top: '53.5%', width: '33.5%', height: '43.5%' },
    badgePos: { left: '17.2%', top: '73.2%' },
    thumb: '/images/journey/room_living.jpg'
  },
  {
    id: 'A-705',
    num: 'A-705',
    type: '2 BHK',
    size: '1,220 Sq.Ft.',
    price: '₹ 98 Lakhs',
    priceSub: '(All Inclusive)',
    facing: 'North Facing',
    beds: '2',
    baths: '2',
    balconies: '1',
    status: 'available',
    rect: { left: '36.5%', top: '57.5%', width: '28%', height: '39.5%' },
    badgePos: { left: '50%', top: '73.2%' },
    thumb: '/images/journey/room_living.jpg'
  },
  {
    id: 'A-706',
    num: 'A-706',
    type: '3 BHK',
    size: '1,480 Sq.Ft.',
    price: '₹ 1.24 Cr',
    priceSub: '(All Inclusive)',
    facing: 'South Facing',
    beds: '3',
    baths: '3',
    balconies: '2',
    status: 'available',
    rect: { left: '65.2%', top: '53.5%', width: '32.3%', height: '43.5%' },
    badgePos: { left: '81.8%', top: '73.2%' },
    thumb: '/images/journey/room_living.jpg'
  }
];

const UNIT_POS_MAP = {
  'A-701': { rect: { left: '2.5%', top: '3.5%', width: '32%', height: '44%' }, badgePos: { left: '17.2%', top: '23.8%' } },
  'A-702': { rect: { left: '35.2%', top: '3.5%', width: '29.5%', height: '44%' }, badgePos: { left: '50%', top: '23.8%' } },
  'A-703': { rect: { left: '65.2%', top: '3.5%', width: '32.3%', height: '44%' }, badgePos: { left: '81.8%', top: '23.8%' } },
  'A-704': { rect: { left: '2.5%', top: '53.5%', width: '33.5%', height: '43.5%' }, badgePos: { left: '17.2%', top: '73.2%' } },
  'A-705': { rect: { left: '36.5%', top: '57.5%', width: '28%', height: '39.5%' }, badgePos: { left: '50%', top: '73.2%' } },
  'A-706': { rect: { left: '65.2%', top: '53.5%', width: '32.3%', height: '43.5%' }, badgePos: { left: '81.8%', top: '73.2%' } }
};

/**
 * Render Floor Plan Stage matching 10000% reference design
 */
export function renderApartmentFloorPlan(options = {}) {
  const {
    units = DEFAULT_FLOOR_UNITS,
    activeUnitId = 'A-704'
  } = options;

  const unitHotspotsHtml = units.map(unit => {
    const meta = UNIT_POS_MAP[unit.id] || { rect: { left: '0', top: '0', width: '30%', height: '30%' }, badgePos: { left: '15%', top: '15%' } };
    const rect = unit.rect || meta.rect;
    const badgePos = unit.badgePos || meta.badgePos;

    const isActive = unit.id === activeUnitId || unit.status === 'on_hold';
    const isHold = unit.status === 'on_hold';
    const isBooked = unit.status === 'booked';
    const isSold = unit.status === 'sold';

    let overlayClass = '';
    if (isHold) overlayClass = 'status-hold';
    else if (isBooked) overlayClass = 'status-booked';
    else if (isSold) overlayClass = 'status-sold';
    else if (isActive) overlayClass = 'status-active';

    return `
      <!-- Unit Interactive Floor Area & Ambient Status Tint -->
      <div class="afp-unit-zone ${overlayClass}" 
           id="afp-zone-${unit.id}"
           style="left: ${rect.left}; top: ${rect.top}; width: ${rect.width}; height: ${rect.height};"
           onclick="window._aptSelectUnit('${unit.id}')"
           title="${unit.id} - ${unit.type} (${(unit.status || 'available').toUpperCase()})">
      </div>

      <!-- Floating Unit Badge -->
      <button type="button" 
              class="afp-unit-badge ${isHold ? 'badge-hold' : (isBooked ? 'badge-booked' : (isSold ? 'badge-sold' : 'badge-available'))} ${unit.id === activeUnitId ? 'badge-selected' : ''}"
              id="afp-badge-${unit.id}"
              style="left: ${badgePos.left}; top: ${badgePos.top};"
              onclick="window._aptSelectUnit('${unit.id}')"
              aria-label="${unit.id} ${unit.type}">
        <span class="afp-badge-num">${unit.num || unit.id}</span>
        <span class="afp-badge-type">${unit.type}</span>
      </button>
    `;
  }).join('');

  return `
    <div class="afp-stage-wrap" id="afp-stage-wrap">
      <div class="afp-stage-card">
        <div class="afp-render-container">
          <!-- 3D Architectural Base Floor Plan -->
          <img src="/images/journey/apt_floor_plan_rendered.png" alt="Architectural Floor Plan" class="afp-render-img" />
          
          <!-- Interactive Dynamic Layers & Floating Badges -->
          <div class="afp-interactive-overlay">
            ${unitHotspotsHtml}
          </div>
        </div>

        <!-- Centered Bottom Caption -->
        <div class="afp-bottom-caption">
          Click on a unit to view details
        </div>
      </div>
    </div>
  `;
}

/**
 * Event Initializer
 */
export function initApartmentFloorPlan(options = {}) {
  const { units = DEFAULT_FLOOR_UNITS } = options;

  // Dev live status testing helper
  window._setUnitStatusDev = function(unitId, newStatus) {
    const target = units.find(u => u.id.toLowerCase() === unitId.toLowerCase());
    if (!target) return;
    target.status = newStatus;
    
    const zone = document.getElementById(`afp-zone-${target.id}`);
    const badge = document.getElementById(`afp-badge-${target.id}`);
    
    if (zone && badge) {
      zone.className = `afp-unit-zone status-${newStatus}`;
      badge.className = `afp-unit-badge badge-${newStatus}`;
    }
  };
}
