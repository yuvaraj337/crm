// ============================================================================
// 3D ARCHITECTURAL CODE-DRIVEN MASTER LAYOUT PLAN
// High-fidelity interactive vector master plan matching architectural blueprint
// ============================================================================

/**
 * Generates lush 3D spherical trees with realistic radial foliage gradients and drop shadows.
 */
function renderTree(cx, cy, r, id = '') {
  return `
    <g class="vmp-tree" data-tree="${id}">
      <!-- Soft cast shadow -->
      <ellipse cx="${cx + r * 0.18}" cy="${cy + r * 0.22}" rx="${r * 1.05}" ry="${r * 0.85}" fill="rgba(14, 38, 18, 0.35)" filter="url(#vmp-tree-blur)" />
      <!-- Outer dark foliage -->
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#vmp-tree-grad-base)" />
      <!-- Middle lush layer -->
      <circle cx="${cx - r * 0.08}" cy="${cy - r * 0.08}" r="${r * 0.82}" fill="url(#vmp-tree-grad-mid)" />
      <!-- Highlight canopy crown -->
      <circle cx="${cx - r * 0.18}" cy="${cy - r * 0.2}" r="${r * 0.48}" fill="url(#vmp-tree-grad-top)" />
      <circle cx="${cx + r * 0.12}" cy="${cy - r * 0.1}" r="${r * 0.35}" fill="url(#vmp-tree-grad-top)" opacity="0.8" />
    </g>
  `;
}

/**
 * Generate perimeter tree line around the boundary
 */
function renderPerimeterTrees() {
  let trees = '';
  const topY = 28;
  const bottomY = 620;
  const leftX = 42;
  const rightX = 932;
  const radius = 17;

  // Top row trees (X from 50 to 920, spacing ~36)
  for (let x = 50; x <= 920; x += 36) {
    trees += renderTree(x, topY, radius, `top-${x}`);
  }

  // Bottom row trees (leaving gap for Entry/Exit at 430-560)
  for (let x = 50; x <= 920; x += 36) {
    if (x >= 430 && x <= 560) continue;
    trees += renderTree(x, bottomY, radius, `bot-${x}`);
  }

  // Left column trees (Y from 62 to 590, spacing ~36)
  for (let y = 62; y <= 590; y += 36) {
    trees += renderTree(leftX, y, radius, `left-${y}`);
  }

  // Right column trees (Y from 62 to 590, spacing ~36)
  for (let y = 62; y <= 590; y += 36) {
    trees += renderTree(rightX, y, radius, `right-${y}`);
  }

  return trees;
}

/**
 * Render individual Villa Unit with 3D Architectural Rooftop Massing
 */
function renderVillaUnit(villa, x, y, width, height, isSelected = false) {
  const isAvailable = villa.status === 'available';
  const isBooked = villa.status === 'booked' || villa.status === 'on-hold';
  const isSold = villa.status === 'sold';

  let fillGradient = 'url(#vmp-roof-available)';
  let strokeColor = '#E2EAD8';
  let strokeWidth = '1.5';
  let statusText = 'Available';
  let statusColor = '#16A34A';
  let idColor = '#0F1E2C';
  let bhkColor = '#4B5563';
  let outerFilter = 'url(#vmp-roof-shadow)';

  if (isAvailable && isSelected) {
    fillGradient = 'url(#vmp-roof-selected)';
    strokeColor = '#22C55E';
    strokeWidth = '2.5';
    statusText = 'Available';
    statusColor = '#15803D';
    outerFilter = 'url(#vmp-glow-green)';
  } else if (isBooked) {
    fillGradient = 'url(#vmp-roof-booked)';
    strokeColor = '#F59E0B';
    strokeWidth = '2';
    statusText = 'Booked';
    statusColor = '#D97706';
    idColor = '#78350F';
    bhkColor = '#92400E';
    outerFilter = 'url(#vmp-glow-amber)';
  } else if (isSold) {
    fillGradient = 'url(#vmp-roof-sold)';
    strokeColor = '#F43F5E';
    strokeWidth = '2';
    statusText = 'Sold';
    statusColor = '#E11D48';
    idColor = '#881337';
    bhkColor = '#9F1239';
    outerFilter = 'url(#vmp-glow-rose)';
  }

  // Lot Dimensions & Offset
  const lotPadX = 6;
  const lotPadY = 6;
  const lotW = width + lotPadX * 2;
  const lotH = height + lotPadY * 2;
  const lotX = x - lotPadX;
  const lotY = y - lotPadY;

  return `
    <g class="vmp-lot-group" data-villa-id="${villa.id}" data-status="${villa.status}">
      <!-- Paved Lot Base -->
      <rect x="${lotX}" y="${lotY}" width="${lotW}" height="${lotH}" rx="6" fill="#E3E8E0" stroke="#C8D2C4" stroke-width="1.2" />

      <!-- Rear Garden Green Strip -->
      <rect x="${lotX + 2}" y="${lotY + 2}" width="${lotW - 4}" height="10" rx="3" fill="#6DAF2B" opacity="0.9" />
      
      <!-- Front Paved Entry / Driveway -->
      <rect x="${lotX + lotW * 0.3}" y="${lotY + lotH - 8}" width="${lotW * 0.4}" height="7" fill="#F1F4EE" />
      
      <!-- Corner Shade Trees -->
      ${renderTree(lotX + 6, lotY + 6, 8, `lot-${villa.id}-tl`)}
      ${renderTree(lotX + lotW - 6, lotY + 6, 8, `lot-${villa.id}-tr`)}
      ${renderTree(lotX + 6, lotY + lotH - 6, 7.5, `lot-${villa.id}-bl`)}
      ${renderTree(lotX + lotW - 6, lotY + lotH - 6, 7.5, `lot-${villa.id}-br`)}

      <!-- 3D Elevated Villa Rooftop -->
      <g class="vmp-villa-interactive" 
         role="button" 
         tabindex="0" 
         aria-label="Villa ${villa.label}, ${villa.bhk}, ${statusText}"
         onclick="window._selectMasterPlanVilla('${villa.id}')">
        
        <!-- Extruded 3D Massing Base (Elevation Depth) -->
        <rect x="${x}" y="${y + 4}" width="${width}" height="${height}" rx="12" fill="rgba(15, 30, 20, 0.28)" filter="${outerFilter}" />
        <rect x="${x}" y="${y + 2}" width="${width}" height="${height}" rx="12" fill="#CAD2C5" />

        <!-- Top Rooftop Face -->
        <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="12" 
              fill="${fillGradient}" 
              stroke="${strokeColor}" 
              stroke-width="${strokeWidth}" 
              class="vmp-roof-rect" />

        <!-- Subtle Top Bevel Highlight -->
        <path d="M ${x + 12} ${y + 1} L ${x + width - 12} ${y + 1}" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity="0.75" />

        <!-- Villa ID Text -->
        <text x="${x + width / 2}" y="${y + height * 0.38}" 
              fill="${idColor}" 
              font-family="'Plus Jakarta Sans', sans-serif" 
              font-size="18" 
              font-weight="800" 
              text-anchor="middle" 
              letter-spacing="0.5"
              class="vmp-text-id">
          ${villa.label}
        </text>

        <!-- BHK Subtitle -->
        <text x="${x + width / 2}" y="${y + height * 0.60}" 
              fill="${bhkColor}" 
              font-family="'Plus Jakarta Sans', sans-serif" 
              font-size="12" 
              font-weight="600" 
              text-anchor="middle"
              class="vmp-text-bhk">
          ${villa.bhk}
        </text>

        <!-- Status Text -->
        <text x="${x + width / 2}" y="${y + height * 0.82}" 
              fill="${statusColor}" 
              font-family="'Plus Jakarta Sans', sans-serif" 
              font-size="12" 
              font-weight="700" 
              text-anchor="middle"
              class="vmp-text-status">
          ${statusText}
        </text>
      </g>
    </g>
  `;
}

/**
 * Render the Right Amenities Column (Park, Clubhouse, Amenities)
 */
function renderRightAmenities() {
  return `
    <!-- AMENITIES COLUMN GROUP -->
    <g class="vmp-amenities-column">
      
      <!-- 1. TOP RIGHT: PARK -->
      <g class="vmp-park-zone" id="vmp-zone-park">
        <!-- Park Lawn Base -->
        <rect x="748" y="54" width="128" height="152" rx="10" fill="#8AC743" stroke="#CAD6C3" stroke-width="2" />
        
        <!-- Inner Garden Walkway -->
        <rect x="762" y="68" width="100" height="96" rx="6" fill="#A1D857" stroke="#DCE8C8" stroke-width="1" />
        
        <!-- Play / Climbing Ladder Structure -->
        <g class="vmp-park-ladder" transform="translate(798, 78)">
          <rect x="0" y="0" width="28" height="74" rx="4" fill="#C59B3F" stroke="#9A7828" stroke-width="1.2" opacity="0.85" />
          <!-- Ladder rungs -->
          <line x1="4" y1="12" x2="24" y2="12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
          <line x1="4" y1="24" x2="24" y2="24" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
          <line x1="4" y1="36" x2="24" y2="36" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
          <line x1="4" y1="48" x2="24" y2="48" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
          <line x1="4" y1="60" x2="24" y2="60" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
        </g>

        <!-- Park Trees -->
        ${renderTree(766, 72, 13, 'park-1')}
        ${renderTree(856, 72, 13, 'park-2')}
        ${renderTree(762, 186, 14, 'park-3')}
        ${renderTree(856, 186, 14, 'park-4')}

        <!-- PARK Title Label -->
        <text x="812" y="190" 
              fill="#265C30" 
              font-family="'Plus Jakarta Sans', sans-serif" 
              font-size="14" 
              font-weight="800" 
              letter-spacing="2" 
              text-anchor="middle">
          PARK
        </text>
      </g>

      <!-- 2. MIDDLE RIGHT: CLUB HOUSE WITH 3D POOL -->
      <g class="vmp-clubhouse-zone" id="vmp-zone-clubhouse">
        <!-- Paved Terrace Deck -->
        <rect x="748" y="242" width="128" height="178" rx="10" fill="#E2E7DD" stroke="#CAD6C3" stroke-width="2" />
        
        <!-- Sparkling Swimming Pool Area -->
        <g class="vmp-pool-wrap" transform="translate(766, 256)">
          <!-- Pool outer rim -->
          <rect x="0" y="0" width="92" height="124" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
          <!-- Blue Water with Depth Gradient -->
          <rect x="4" y="4" width="84" height="116" rx="4" fill="url(#vmp-pool-water)" />
          
          <!-- Pool Lane & Water Grid Reflections -->
          <line x1="32" y1="8" x2="32" y2="116" stroke="#FFFFFF" stroke-width="1" stroke-dasharray="6,6" opacity="0.4" />
          <line x1="60" y1="8" x2="60" y2="116" stroke="#FFFFFF" stroke-width="1" stroke-dasharray="6,6" opacity="0.4" />
          
          <!-- Stainless Pool Entry Ladders -->
          <rect x="10" y="6" width="10" height="6" rx="2" fill="#E2E8F0" stroke="#64748B" stroke-width="0.8" />
          <rect x="72" y="6" width="10" height="6" rx="2" fill="#E2E8F0" stroke="#64748B" stroke-width="0.8" />
        </g>

        <!-- Deck Trees & Planters -->
        ${renderTree(758, 252, 10, 'club-1')}
        ${renderTree(866, 252, 10, 'club-2')}
        ${renderTree(758, 408, 10, 'club-3')}
        ${renderTree(866, 408, 10, 'club-4')}

        <!-- CLUB HOUSE Label -->
        <text x="812" y="342" 
              fill="#0F1E2C" 
              font-family="'Plus Jakarta Sans', sans-serif" 
              font-size="13" 
              font-weight="800" 
              letter-spacing="1.5" 
              text-anchor="middle">
          CLUB
        </text>
        <text x="812" y="358" 
              fill="#0F1E2C" 
              font-family="'Plus Jakarta Sans', sans-serif" 
              font-size="13" 
              font-weight="800" 
              letter-spacing="1.5" 
              text-anchor="middle">
          HOUSE
        </text>
      </g>

      <!-- 3. BOTTOM RIGHT: AMENITIES & PLAY PLAZA -->
      <g class="vmp-amenities-zone" id="vmp-zone-amenities">
        <!-- Sand / Terracotta Courtyard Base -->
        <rect x="748" y="448" width="128" height="162" rx="10" fill="#EFE0CD" stroke="#DDC8AF" stroke-width="2" />
        
        <!-- White Canopy / Gazebo Pavilion -->
        <g class="vmp-gazebo" transform="translate(784, 462)">
          <rect x="0" y="4" width="56" height="42" rx="6" fill="rgba(0,0,0,0.12)" filter="url(#vmp-tree-blur)" />
          <rect x="0" y="0" width="56" height="42" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" />
          <rect x="8" y="6" width="40" height="30" rx="3" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="0.8" />
        </g>

        <!-- AMENITIES Label -->
        <text x="812" y="528" 
              fill="#1F2937" 
              font-family="'Plus Jakarta Sans', sans-serif" 
              font-size="12" 
              font-weight="800" 
              letter-spacing="1.5" 
              text-anchor="middle">
          AMENITIES
        </text>

        <!-- Playground Equipment (Colorful Swings, Slide, Bench) -->
        <g class="vmp-play-equipment" transform="translate(770, 542)">
          <!-- Swing Set (Red & Blue A-Frame) -->
          <polygon points="6,24 16,4 26,24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linejoin="round" />
          <line x1="16" y1="4" x2="38" y2="4" stroke="#EF4444" stroke-width="2.5" />
          <polygon points="28,24 38,4 48,24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linejoin="round" />
          <!-- Swings -->
          <line x1="22" y1="4" x2="22" y2="16" stroke="#0284C7" stroke-width="1" />
          <line x1="26" y1="4" x2="26" y2="16" stroke="#0284C7" stroke-width="1" />
          <rect x="20" y="16" width="8" height="3" rx="1" fill="#F59E0B" />
          
          <line x1="32" y1="4" x2="32" y2="16" stroke="#0284C7" stroke-width="1" />
          <line x1="36" y1="4" x2="36" y2="16" stroke="#0284C7" stroke-width="1" />
          <rect x="30" y="16" width="8" height="3" rx="1" fill="#F59E0B" />

          <!-- Kids Slide Structure -->
          <g transform="translate(56, 0)">
            <rect x="0" y="4" width="6" height="20" fill="#0284C7" />
            <path d="M 4 6 Q 14 10 24 24" fill="none" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round" />
          </g>

          <!-- Wooden Park Bench -->
          <g transform="translate(24, 28)">
            <rect x="0" y="0" width="34" height="6" rx="2" fill="#B45309" stroke="#78350F" stroke-width="0.8" />
            <line x1="4" y1="6" x2="4" y2="9" stroke="#4B5563" stroke-width="1.5" />
            <line x1="30" y1="6" x2="30" y2="9" stroke="#4B5563" stroke-width="1.5" />
          </g>
        </g>

        <!-- Surrounding Corner Trees -->
        ${renderTree(758, 458, 11, 'amen-1')}
        ${renderTree(866, 458, 11, 'amen-2')}
        ${renderTree(758, 598, 12, 'amen-3')}
        ${renderTree(866, 598, 12, 'amen-4')}
      </g>

    </g>
  `;
}

/**
 * Render Main SVG Master Plan Canvas
 */
export function renderMasterPlanSvgCode(plots = [], selectedVillaId = 'v02') {
  // 3 Rows x 5 Columns Layout Parameters
  const colX = [84, 204, 324, 444, 564];
  const villaW = 98;
  const villaH = 82;

  // Row Y positions
  const row1Y = 96;
  const row2Y = 276;
  const row3Y = 456;

  // Generate 15 Villas HTML
  const villasHtml = plots.map((villa, idx) => {
    let row = 0;
    let col = 0;
    if (idx < 5) {
      row = 0;
      col = idx;
    } else if (idx < 10) {
      row = 1;
      col = idx - 5;
    } else {
      row = 2;
      col = idx - 10;
    }

    const x = colX[col];
    const y = row === 0 ? row1Y : (row === 1 ? row2Y : row3Y);
    const isSelected = villa.id.toLowerCase() === selectedVillaId.toLowerCase();

    return renderVillaUnit(villa, x, y, villaW, villaH, isSelected);
  }).join('');

  return `
    <svg class="vmp-canvas-svg" viewBox="0 0 1000 680" xmlns="http://www.w3.org/2000/svg" id="vmp-canvas-svg">
      <defs>
        <!-- Tree foliage gradients -->
        <radialGradient id="vmp-tree-grad-base" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#439A26" />
          <stop offset="70%" stop-color="#2D721A" />
          <stop offset="100%" stop-color="#19480F" />
        </radialGradient>

        <radialGradient id="vmp-tree-grad-mid" cx="30%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#6DC83A" />
          <stop offset="65%" stop-color="#3FA422" />
          <stop offset="100%" stop-color="#246A14" />
        </radialGradient>

        <radialGradient id="vmp-tree-grad-top" cx="25%" cy="25%" r="50%">
          <stop offset="0%" stop-color="#A2EA60" />
          <stop offset="60%" stop-color="#73D035" />
          <stop offset="100%" stop-color="#4CA722" />
        </radialGradient>

        <!-- Swimming pool gradient -->
        <linearGradient id="vmp-pool-water" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" />
          <stop offset="50%" stop-color="#0EA5E9" />
          <stop offset="100%" stop-color="#0284C7" />
        </linearGradient>

        <!-- Villa rooftop gradients -->
        <linearGradient id="vmp-roof-available" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#F2F5ED" />
        </linearGradient>

        <linearGradient id="vmp-roof-selected" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F0FDF4" />
          <stop offset="100%" stop-color="#DCFCE7" />
        </linearGradient>

        <linearGradient id="vmp-roof-booked" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FEF3C7" />
          <stop offset="100%" stop-color="#FDE68A" />
        </linearGradient>

        <linearGradient id="vmp-roof-sold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFE4E6" />
          <stop offset="100%" stop-color="#FECDD3" />
        </linearGradient>

        <!-- Asphalt gradient -->
        <linearGradient id="vmp-road-asphalt" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#383D43" />
          <stop offset="50%" stop-color="#42474E" />
          <stop offset="100%" stop-color="#383D43" />
        </linearGradient>

        <!-- Drop Shadows & Glow Filters -->
        <filter id="vmp-tree-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        <filter id="vmp-roof-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#142818" flood-opacity="0.22" />
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.1" />
        </filter>

        <filter id="vmp-glow-green" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#22C55E" flood-opacity="0.45" />
          <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#15803D" flood-opacity="0.25" />
        </filter>

        <filter id="vmp-glow-amber" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#F59E0B" flood-opacity="0.45" />
          <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#B45309" flood-opacity="0.25" />
        </filter>

        <filter id="vmp-glow-rose" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#F43F5E" flood-opacity="0.45" />
          <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#BE123C" flood-opacity="0.25" />
        </filter>
      </defs>

      <!-- ═════════════════ 1. OUTER HEDGE BOUNDARY ═════════════════ -->
      <g class="vmp-master-boundary">
        <!-- Perimeter Lawn & Drop Shadow -->
        <rect x="24" y="16" width="928" height="620" rx="28" fill="#589B27" stroke="#3D7417" stroke-width="4" filter="url(#vmp-roof-shadow)" />
        <rect x="34" y="26" width="908" height="600" rx="22" fill="#75BA31" />
      </g>

      <!-- ═════════════════ 2. ASPHALT ROAD NETWORK ═════════════════ -->
      <g class="vmp-roads-network">
        <!-- Concrete Road Sidewalk Borders -->
        <!-- Road 1 (Between Row 1 & Row 2) -->
        <rect x="64" y="196" width="648" height="58" fill="#CAD2C5" />
        <rect x="64" y="199" width="648" height="52" fill="url(#vmp-road-asphalt)" />
        
        <!-- Road 2 (Between Row 2 & Row 3) -->
        <rect x="64" y="376" width="648" height="58" fill="#CAD2C5" />
        <rect x="64" y="379" width="648" height="52" fill="url(#vmp-road-asphalt)" />

        <!-- Vertical Connecting Road on Right -->
        <rect x="686" y="54" width="48" height="556" fill="#CAD2C5" />
        <rect x="689" y="54" width="42" height="556" fill="url(#vmp-road-asphalt)" />

        <!-- Entrance Road at Bottom Center -->
        <rect x="466" y="556" width="68" height="88" fill="#CAD2C5" />
        <rect x="469" y="556" width="62" height="88" fill="url(#vmp-road-asphalt)" />

        <!-- Center Dashed Markings -->
        <!-- Road 1 Centerline -->
        <line x1="72" y1="225" x2="688" y2="225" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="14,14" opacity="0.9" />
        <!-- Road 2 Centerline -->
        <line x1="72" y1="405" x2="688" y2="405" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="14,14" opacity="0.9" />
        <!-- Right Road Centerline -->
        <line x1="710" y1="62" x2="710" y2="598" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="14,14" opacity="0.9" />
        <!-- Entrance Road Centerline -->
        <line x1="500" y1="562" x2="500" y2="636" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="10,10" opacity="0.9" />

        <!-- ROAD LABELS: "30 FT WIDE ROAD" -->
        <text x="388" y="229" 
              fill="#FFFFFF" 
              font-family="'Plus Jakarta Sans', sans-serif" 
              font-size="12" 
              font-weight="800" 
              letter-spacing="2.5" 
              text-anchor="middle">
          30 FT WIDE ROAD
        </text>

        <text x="388" y="409" 
              fill="#FFFFFF" 
              font-family="'Plus Jakarta Sans', sans-serif" 
              font-size="12" 
              font-weight="800" 
              letter-spacing="2.5" 
              text-anchor="middle">
          30 FT WIDE ROAD
        </text>
      </g>

      <!-- ═════════════════ 3. VILLA PLOTS (15 UNITS) ═════════════════ -->
      <g class="vmp-villas-layer">
        ${villasHtml}
      </g>

      <!-- ═════════════════ 4. RIGHT AMENITIES COLUMN ═════════════════ -->
      ${renderRightAmenities()}

      <!-- ═════════════════ 5. PERIMETER TREE LINE ═════════════════ -->
      <g class="vmp-perimeter-trees">
        ${renderPerimeterTrees()}
      </g>

      <!-- ═════════════════ 6. ENTRANCE GATE & ARROWS ═════════════════ -->
      <g class="vmp-entrance-gate">
        <!-- Dual Gate Posts / Pillars -->
        <!-- Left Gate Post -->
        <rect x="460" y="608" width="12" height="26" rx="3" fill="#D97706" stroke="#B45309" stroke-width="1.2" />
        <rect x="458" y="606" width="16" height="5" rx="1.5" fill="#FDE68A" />
        <circle cx="466" cy="604" r="3" fill="#F59E0B" />

        <!-- Right Gate Post -->
        <rect x="528" y="608" width="12" height="26" rx="3" fill="#D97706" stroke="#B45309" stroke-width="1.2" />
        <rect x="526" y="606" width="16" height="5" rx="1.5" fill="#FDE68A" />
        <circle cx="534" cy="604" r="3" fill="#F59E0B" />
      </g>
    </svg>

    <!-- ENTRY / EXIT OUTSIDE LABEL -->
    <div class="vmp-entry-exit-label">
      <div class="vmp-arrows">&#8593; &#8595;</div>
      <div class="vmp-label-text">ENTRY / EXIT</div>
    </div>
  `;
}

/**
 * Render Selected Villa Details Sheet / Modal
 */
export function renderVillaDetailsModal(villa, project) {
  if (!villa) return '';

  const isAvailable = villa.status === 'available';
  const isBooked = villa.status === 'booked' || villa.status === 'on-hold';
  const isSold = villa.status === 'sold';

  let statusClass = 'available';
  let statusBadgeText = 'Available for Booking';
  let statusIcon = '✓';
  let actionButtonsHtml = '';

  if (isAvailable) {
    statusClass = 'available';
    statusBadgeText = 'Available for Booking';
    actionButtonsHtml = `
      <button type="button" class="vmp-btn-action primary" onclick="window._proceedToVillaEnquiry('${villa.id}')">
        <span>Send Enquiry</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
      <button type="button" class="vmp-btn-action outline" onclick="window._proceedToVillaSiteVisit('${villa.id}')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span>Book a Site Visit</span>
      </button>
    `;
  } else if (isBooked) {
    statusClass = 'booked';
    statusBadgeText = 'Already Booked / On Hold';
    statusIcon = '⏳';
    actionButtonsHtml = `
      <div class="vmp-protected-banner warning">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>This villa is currently on hold. You can join the waitlist for updates.</span>
      </div>
      <button type="button" class="vmp-btn-action outline" onclick="window._proceedToVillaEnquiry('${villa.id}')">
        <span>Enquire for Waitlist</span>
      </button>
    `;
  } else if (isSold) {
    statusClass = 'sold';
    statusBadgeText = 'Sold Out';
    statusIcon = '✕';
    actionButtonsHtml = `
      <div class="vmp-protected-banner danger">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        <span>This unit has been sold and is no longer available.</span>
      </div>
      <button type="button" class="vmp-btn-action disabled" disabled>
        <span>Unit Unavailable</span>
      </button>
    `;
  }

  return `
    <div class="vmp-modal-backdrop" id="vmp-modal-backdrop" onclick="window._closeVillaModal(event)">
      <div class="vmp-modal-content" onclick="event.stopPropagation()">
        
        <!-- Header -->
        <div class="vmp-modal-header">
          <div class="vmp-modal-heading">
            <span class="vmp-badge-pill ${statusClass}">
              <span class="vmp-badge-icon">${statusIcon}</span>
              <span>${statusBadgeText}</span>
            </span>
            <h2 class="vmp-modal-title">Villa ${villa.label} &bull; ${villa.bhk}</h2>
            <div class="vmp-modal-sub">${project.name} &bull; ${project.location}</div>
          </div>
          <button type="button" class="vmp-modal-close" onclick="window._closeVillaModal()" aria-label="Close details">
            &times;
          </button>
        </div>

        <!-- Price Callout -->
        <div class="vmp-price-box">
          <div class="vmp-price-main">${villa.price}</div>
          <div class="vmp-price-sub">(All Inclusive &bull; Ready to Register)</div>
        </div>

        <!-- Specification 4-Grid -->
        <div class="vmp-specs-grid">
          <div class="vmp-spec-item">
            <span class="vmp-spec-lbl">Built-up Area</span>
            <span class="vmp-spec-val">${villa.area || '3200 Sq.Ft'}</span>
          </div>
          <div class="vmp-spec-item">
            <span class="vmp-spec-lbl">Facing</span>
            <span class="vmp-spec-val">${villa.facing || 'East Facing'}</span>
          </div>
          <div class="vmp-spec-item">
            <span class="vmp-spec-lbl">Road Width</span>
            <span class="vmp-spec-val">${villa.road || '30 ft Wide'}</span>
          </div>
          <div class="vmp-spec-item">
            <span class="vmp-spec-lbl">Structure</span>
            <span class="vmp-spec-val">G+1 Luxury Triplex</span>
          </div>
        </div>

        <!-- Action Section -->
        <div class="vmp-modal-actions">
          ${actionButtonsHtml}
        </div>

      </div>
    </div>
  `;
}

/**
 * Main Controller & Event Binding for 3D Master Layout Plan
 */
export function initVillaMasterPlan(plots = [], project = {}) {
  let selectedId = 'v02';
  let zoomLevel = 1;

  const canvasWrap = document.getElementById('vmp-canvas-wrap');
  const zoomInBtn = document.getElementById('vmp-zoom-in');
  const zoomOutBtn = document.getElementById('vmp-zoom-out');
  const zoomResetBtn = document.getElementById('vmp-zoom-reset');

  function updateZoom(newZoom) {
    zoomLevel = Math.min(Math.max(newZoom, 0.75), 1.8);
    if (canvasWrap) {
      canvasWrap.style.transform = `scale(${zoomLevel})`;
      canvasWrap.style.transformOrigin = 'center center';
    }
  }

  if (zoomInBtn) zoomInBtn.addEventListener('click', () => updateZoom(zoomLevel + 0.15));
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => updateZoom(zoomLevel - 0.15));
  if (zoomResetBtn) zoomResetBtn.addEventListener('click', () => updateZoom(1));

  // Global handler for selecting a villa
  window._selectMasterPlanVilla = function(villaId) {
    selectedId = villaId;
    const villa = plots.find(p => p.id.toLowerCase() === villaId.toLowerCase()) || plots[0];
    
    // Render and append modal to screen
    const existingModal = document.getElementById('vmp-modal-backdrop');
    if (existingModal) existingModal.remove();

    const modalHtml = renderVillaDetailsModal(villa, project);
    const host = document.getElementById('vmp-modal-host');
    if (host) {
      host.innerHTML = modalHtml;
    }

    // Update active highlight on SVG without full reload
    document.querySelectorAll('.vmp-lot-group').forEach(el => {
      const elId = el.getAttribute('data-villa-id');
      const isThis = elId && elId.toLowerCase() === villaId.toLowerCase();
      const roof = el.querySelector('.vmp-roof-rect');
      const status = el.getAttribute('data-status');
      
      if (isThis && status === 'available') {
        if (roof) {
          roof.setAttribute('fill', 'url(#vmp-roof-selected)');
          roof.setAttribute('stroke', '#22C55E');
          roof.setAttribute('stroke-width', '2.5');
        }
      } else if (status === 'available') {
        if (roof) {
          roof.setAttribute('fill', 'url(#vmp-roof-available)');
          roof.setAttribute('stroke', '#E2EAD8');
          roof.setAttribute('stroke-width', '1.5');
        }
      }
    });
  };

  // Close modal
  window._closeVillaModal = function() {
    const existingModal = document.getElementById('vmp-modal-backdrop');
    if (existingModal) existingModal.remove();
  };

  // Safe navigation with booking protection
  window._proceedToVillaEnquiry = function(villaId) {
    const villa = plots.find(p => p.id.toLowerCase() === villaId.toLowerCase());
    if (villa && villa.status === 'sold') {
      alert('This unit is sold out and unavailable for enquiry.');
      return;
    }
    window._closeVillaModal();
    if (window._villaNav) {
      window._villaNav(`/villas/${project.id || 'vr-green-villas'}/villa/${villaId}/enquiry`);
    }
  };

  window._proceedToVillaSiteVisit = function(villaId) {
    const villa = plots.find(p => p.id.toLowerCase() === villaId.toLowerCase());
    // Strict booking protection: Sold and Booked units cannot proceed to site visit booking
    if (villa && (villa.status === 'sold' || villa.status === 'booked')) {
      alert('This villa is not currently available for booking.');
      return;
    }
    window._closeVillaModal();
    if (window._villaNav) {
      window._villaNav(`/villas/${project.id || 'vr-green-villas'}/villa/${villaId}/site-visit`);
    }
  };

  // Live Status Tester function (Development / Testing Mode only)
  window._setVillaStatusDev = function(villaId, newStatus) {
    const target = plots.find(p => p.id.toLowerCase() === villaId.toLowerCase());
    if (!target) return;
    target.status = newStatus;

    // Refresh Master Plan SVG in place
    const canvasContainer = document.getElementById('vmp-canvas-container');
    if (canvasContainer) {
      canvasContainer.innerHTML = renderMasterPlanSvgCode(plots, selectedId);
    }
  };
}
