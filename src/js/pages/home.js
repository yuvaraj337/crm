import { renderHeader, initStickyNav } from '../components/header.js';
import { renderHero, initHeroSlider } from '../components/hero.js';
import { renderPropertyCategories } from '../components/propertyCategories.js';
import { renderFeaturedProperties, initFeaturedProjects } from '../components/featuredProperties.js';
import { renderFindProperty, initFindProperty } from '../components/findProperty.js';
import { renderFinalCTA } from '../components/finalCTA.js';
import { renderFooter, initScrollTop } from '../components/footer.js';

export function renderHomePage() {
  const html = `
    <div class="page-home">
      ${renderHeader({ currentPath: '#/' })}
      <main>
        ${renderHero()}
        ${renderPropertyCategories()}
        ${renderFeaturedProperties()}
        ${renderFindProperty()}
        ${renderFinalCTA()}
      </main>
      ${renderFooter()}
    </div>
  `;

  return {
    html,
    init: () => {
      initStickyNav();
      initHeroSlider();
      initFeaturedProjects();
      initFindProperty();
      initScrollTop();
    }
  };
}
