(() => {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        menuToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const revealItems = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const copyButton = document.getElementById('copyPortfolio');
  const feedback = document.getElementById('copyFeedback');
  if (copyButton && feedback) {
    copyButton.addEventListener('click', async () => {
      const portfolioUrl = 'https://hieu-commits.github.io/';
      try {
        await navigator.clipboard.writeText(portfolioUrl);
        feedback.textContent = 'Copied portfolio URL: ' + portfolioUrl;
      } catch (error) {
        feedback.textContent = 'Portfolio URL: ' + portfolioUrl;
      }
    });
  }
})();
