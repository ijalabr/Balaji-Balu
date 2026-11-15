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


const systemCopy = {
  integration: {
    title: 'Integration & structure',
    description: 'Connect design intent, build readiness and shop-floor feedback so the aircraft comes together with clear ownership and configuration.'
  },
  test: {
    title: 'Functional test',
    description: 'Support the 737 functional test program across build stations, improving test execution, ATA compliance and resolution of production constraints.'
  },
  manufacturing: {
    title: 'Manufacturing',
    description: 'Turn process planning, quality feedback and station needs into practical actions that keep production work moving.'
  },
  digital: {
    title: 'Digital engineering',
    description: 'Apply Python, VBA, Power Automate, SharePoint and Power BI to improve repeatable work, reporting visibility and collaboration.'
  },
  delivery: {
    title: 'Program delivery',
    description: 'Align engineering, production, quality and people around clear priorities, visible risks, capability building and measurable improvement.'
  }
};

const aircraftMap = document.querySelector('.aircraft-map');
const systemTitle = document.querySelector('#system-title');
const systemDescription = document.querySelector('#system-description');
document.querySelectorAll('.system-control').forEach((control) => {
  control.addEventListener('click', () => {
    const key = control.dataset.system;
    const copy = systemCopy[key];
    document.querySelectorAll('.system-control').forEach((item) => {
      const selected = item === control;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    aircraftMap.dataset.activeSystem = key;
    systemTitle.textContent = copy.title;
    systemDescription.textContent = copy.description;
  });
});

