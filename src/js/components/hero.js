import heroFarm from '../../assets/hero/hero-farm.jpeg';
import heroVilla from '../../assets/hero/hero-villa.jpeg';
import heroPlots from '../../assets/hero/hero-apartments.jpeg';
import heroApartments from '../../assets/hero/hero-plots.jpeg';

export const heroSlidesData = [
  {
    id: 'farmlands',
    category: 'FARM LANDS',
    categoryIcon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
    titleLine1: 'A Greener<br/>Tomorrow,',
    titleLine2: 'A Wiser Investment',
    desc: 'Managed farm lands that bring you closer to nature and long-term value.',
    primaryCta: 'Explore Farm Lands',
    primaryLink: '#/farmlands',
    secondaryCta: 'Talk to an Expert',
    benefits: [
      {
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/></svg>`,
        title: 'Clean &',
        subtitle: 'Green Living'
      },
      {
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
        title: 'High Growth',
        subtitle: 'Potential'
      },
      {
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
        title: 'Transparent',
        subtitle: '& Secure'
      }
    ],
    taglineHtml: `<span class="ref-handwritten">Land for a Better Life</span>`,
    image: heroFarm,
    floatingCardText: 'Nature Generates Wealth'
  },
  {
    id: 'villas',
    category: 'LUXURY VILLAS',
    categoryIcon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    titleLine1: 'Your Dream<br/>Home, A Brighter',
    titleLine2: 'Tomorrow',
    desc: 'Thoughtfully designed villas that offer modern living, more space and a better future for you and your family.',
    primaryCta: 'Explore Villas',
    primaryLink: '#/villas',
    secondaryCta: 'Talk to an Expert',
    benefits: [
      {
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/></svg>`,
        title: 'Spacious',
        subtitle: 'Living'
      },
      {
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 11 12 14 22 4"></polyline></svg>`,
        title: 'Prime',
        subtitle: 'Locations'
      },
      {
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        title: 'Trusted',
        subtitle: 'Investment'
      }
    ],
    taglineHtml: `<span class="ref-handwritten">Spaces for a Better Tomorrow</span>`,
    image: heroVilla,
    floatingCardText: 'Modern Homes for a Healthier Tomorrow'
  },
  {
    id: 'openplots',
    category: 'OPEN PLOTS',
    categoryIcon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
    titleLine1: 'Invest in Land,<br/>Invest in a',
    titleLine2: 'Better Tomorrow',
    desc: 'HMDA & DTCP approved open plots in fast-growing corridors of Telangana & Andhra Pradesh.',
    primaryCta: 'Explore Open Plots',
    primaryLink: '#/open-plots',
    secondaryCta: 'Talk to an Expert',
    benefits: [
      {
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/></svg>`,
        title: 'Prime',
        subtitle: 'Locations'
      },
      {
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
        title: 'High Growth',
        subtitle: 'Potential'
      },
      {
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 11 12 14 22 4"></polyline></svg>`,
        title: 'Clear Titles',
        subtitle: '& Secure Investment'
      }
    ],
    taglineHtml: `<div class="ref-sub-line"><span class="sub-rule"></span><span class="sub-text">LAND BUILDS LEGACIES</span><span class="sub-rule"></span></div>`,
    image: heroPlots,
    floatingCardText: 'Strategic Locations Stronger Futures'
  },
  {
    id: 'apartments',
    category: 'PREMIUM APARTMENTS',
    categoryIcon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="2"></line><line x1="8" y1="6" x2="8" y2="6.01"></line><line x1="16" y1="6" x2="16" y2="6.01"></line><line x1="8" y1="10" x2="8" y2="10.01"></line><line x1="16" y1="10" x2="16" y2="10.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="8" y1="18" x2="8" y2="18.01"></line><line x1="16" y1="18" x2="16" y2="18.01"></line></svg>`,
    titleLine1: 'Elevated Living,',
    titleLine2: 'A Brighter Future',
    desc: 'Modern 2 & 3 BHK apartments with world-class amenities in prime locations.',
    primaryCta: 'Explore Apartments',
    primaryLink: '#/apartments',
    secondaryCta: 'Talk to an Expert',
    benefits: [
      {
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        title: 'Modern',
        subtitle: 'Amenities'
      },
      {
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
        title: 'Prime',
        subtitle: 'Locations'
      },
      {
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 11 12 14 22 4"></polyline></svg>`,
        title: 'Trusted',
        subtitle: 'Investment'
      }
    ],
    taglineHtml: `<div class="ref-sub-line"><span class="sub-rule"></span><span class="sub-text">HOMES THAT GROW WITH YOU</span><span class="sub-rule"></span></div>`,
    image: heroApartments,
    floatingCardText: 'Sustainable Communities Stronger Tomorrows'
  }
];

export function renderHero() {
  const slidesHtml = heroSlidesData.map((slide, index) => {
    return `
      <div class="ref-hero-slide ${index === 0 ? 'active' : ''}" data-slide-index="${index}" id="hero-slide-${index}">
        <div class="ref-hero-left">
          <!-- Category Eyebrow -->
          <div class="ref-hero-category">
            <span class="ref-hero-cat-icon">${slide.categoryIcon}</span>
            <span class="ref-hero-cat-name">${slide.category}</span>
          </div>

          <!-- Large Serif Headline with Split Colors -->
          <h1 class="ref-hero-headline">
            <span class="headline-green">${slide.titleLine1}</span><br/>
            <span class="headline-gold">${slide.titleLine2}</span>
          </h1>

          <!-- Supporting Text -->
          <p class="ref-hero-desc">${slide.desc}</p>

          <!-- Dual CTAs -->
          <div class="ref-hero-ctas">
            <a href="${slide.primaryLink}" class="ref-hero-btn-primary">
              <span>${slide.primaryCta}</span>
              <span class="btn-arrow">&rarr;</span>
            </a>
            <button class="ref-hero-btn-secondary" onclick="window.openSiteVisitModal ? window.openSiteVisitModal('${slide.category}') : window.location.href='tel:+919490634829'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>${slide.secondaryCta}</span>
            </button>
          </div>

          <!-- 3 Benefits Items -->
          <div class="ref-hero-benefits">
            ${slide.benefits.map(b => `
              <div class="ref-benefit-item">
                <div class="ref-benefit-icon-circle">
                  ${b.icon}
                </div>
                <div class="ref-benefit-label">
                  <strong>${b.title}</strong>
                  <span>${b.subtitle}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Decorative Tagline -->
          <div class="ref-hero-tagline-wrap">
            ${slide.taglineHtml}
          </div>
        </div>

        <!-- Right Side: Property Visual with Organic Boundary & Exact Shadow -->
        <div class="ref-hero-right">
          <div class="ref-hero-visual-frame">
            <!-- 1. Organic White Card Base with Exact Reference Drop-Shadow -->
            <svg class="ref-hero-shadow-card-svg" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true" style="overflow: visible;">
              <path d="M 0.257,0 C 0.162,0 0.1061,0.0298 0.0838,0.0909 C 0.067,0.1364 0,0.2926 0,0.3849 C 0,0.4631 0.1006,0.7614 0.1464,0.8679 C 0.1687,0.9205 0.2011,1 0.257,1 L 0.95,1 Q 1,1 1,0.94 L 1,0.06 Q 1,0 0.95,0 Z" 
                    fill="#FFFFFF" 
                    stroke="#FFFFFF" 
                    stroke-width="36" 
                    vector-effect="non-scaling-stroke" 
                    stroke-linejoin="round" />
            </svg>

            <!-- 2. The Photo Container Clipped to the Organic Curve -->
            <div class="ref-hero-visual-container">
              <img src="${slide.image}" alt="${slide.category}" class="ref-hero-main-img" />
              
              <!-- Cursive Image Tagline Overlay -->
              ${slide.imageTagline ? `
              <div class="ref-hero-image-tagline">
                <span class="ref-hero-image-tagline-text">${slide.imageTagline}</span>
              </div>
              ` : ''}

              <!-- Floating Info Card Overlay -->
              <div class="ref-hero-floating-card">
                <div class="ref-hero-floating-card-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <div class="ref-hero-floating-card-text">${slide.floatingCardText}</div>
              </div>

              <!-- Interactive Arrow Controls Overlay matching screenshot placement -->
              <div class="ref-hero-arrows-overlay">
                <button class="ref-hero-nav-arrow prev" aria-label="Previous Slide" data-action="prev">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button class="ref-hero-nav-arrow next" aria-label="Next Slide" data-action="next">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <section class="ref-hero-section" id="ref-hero-section">
      <!-- SVG clip-path definition for organic hero image shape matching reference exactly -->
      <svg width="0" height="0" style="position:absolute; width:0; height:0; opacity:0; pointer-events:none; overflow:hidden;" aria-hidden="true">
        <defs>
          <clipPath id="hero-organic-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.257,0 C 0.162,0 0.1061,0.0298 0.0838,0.0909 C 0.067,0.1364 0,0.2926 0,0.3849 C 0,0.4631 0.1006,0.7614 0.1464,0.8679 C 0.1687,0.9205 0.2011,1 0.257,1 L 0.95,1 Q 1,1 1,0.94 L 1,0.06 Q 1,0 0.95,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <!-- Background subtle leaves flourish -->
      <div class="ref-hero-bg-flourish"></div>

      <div class="ref-hero-container">
        <div class="ref-hero-slider-track" id="ref-hero-track">
          ${slidesHtml}
        </div>

        <!-- 4 Slide Indicator Pills at Bottom -->
        <div class="ref-hero-indicators" id="ref-hero-indicators">
          ${heroSlidesData.map((_, idx) => `
            <button class="ref-hero-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Go to slide ${idx + 1}"></button>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function initHeroSlider() {
  // Clean up any existing hero autoplay timer to prevent multiple intervals running simultaneously
  if (window.__heroAutoplayTimer) {
    clearInterval(window.__heroAutoplayTimer);
    window.__heroAutoplayTimer = null;
  }

  const slides = document.querySelectorAll('.ref-hero-slide');
  const dots = document.querySelectorAll('.ref-hero-dot');
  const arrows = document.querySelectorAll('.ref-hero-nav-arrow');
  const section = document.getElementById('ref-hero-section');

  if (!slides.length) return;

  let currentIndex = 0;
  const AUTOPLAY_INTERVAL = 4000; // 4 seconds per slide

  // Detect current active slide index if set in markup
  slides.forEach((slide, idx) => {
    if (slide.classList.contains('active')) {
      currentIndex = idx;
    }
  });

  const showSlide = (index) => {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('active');
    }
  };

  const nextSlide = () => showSlide(currentIndex + 1);
  const prevSlide = () => showSlide(currentIndex - 1);

  const stopAutoplay = () => {
    if (window.__heroAutoplayTimer) {
      clearInterval(window.__heroAutoplayTimer);
      window.__heroAutoplayTimer = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    const isHovered = section ? section.matches(':hover') : false;
    if (!isHovered) {
      window.__heroAutoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    }
  };

  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  // Setup click events on all arrows across slides
  arrows.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const action = btn.getAttribute('data-action');
      if (action === 'prev') {
        prevSlide();
      } else {
        nextSlide();
      }
      resetAutoplay();
    };
  });

  // Setup click events on dots
  dots.forEach(dot => {
    dot.onclick = (e) => {
      e.preventDefault();
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(idx);
      resetAutoplay();
    };
  });

  if (section) {
    section.onmouseenter = () => {
      stopAutoplay();
    };
    section.onmouseleave = () => {
      startAutoplay();
    };
  }

  // Start initial autoplay timer
  startAutoplay();
}
