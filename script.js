const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    navigation.classList.remove('is-open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll('.metric, .story, .role, .education-card');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach((target) => target.classList.add('reveal'));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((target) => observer.observe(target));
}

const mapFocus = {
  structures: {
    number: '01',
    title: 'Structures & integration',
    description: 'Connect build readiness, assembly configuration and shop-floor feedback so engineering intent stays aligned with production.'
  },
  propulsion: {
    number: '02',
    title: 'Functional test',
    description: 'Support aircraft system readiness through functional test execution, issue closure and cross-functional coordination.'
  },
  systems: {
    number: '03',
    title: 'Aircraft systems',
    description: 'Connect engineering, production, quality and test with clear ownership.'
  },
  interior: {
    number: '04',
    title: 'Engineering design',
    description: 'Coordinate specialized assembly design with attention to safety, reliability and production readiness.'
  },
  manufacturing: {
    number: '05',
    title: 'Manufacturing flow',
    description: 'Turn process planning, quality feedback and station needs into practical actions that improve repeatable work.'
  }
};

const mapControls = document.querySelectorAll('[data-focus]');
mapControls.forEach((control) => {
  control.addEventListener('click', () => {
    const key = control.dataset.focus;
    const focus = mapFocus[key];
    mapControls.forEach((item) => {
      const selected = item.dataset.focus === key;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.querySelector('#map-readout-index').textContent = focus.number;
    document.querySelector('#map-readout-title').textContent = focus.title;
    document.querySelector('#map-readout-copy').textContent = focus.description;
  });
});

