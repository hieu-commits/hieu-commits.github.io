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
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduceMotion = reduceMotionQuery.matches;
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

  /* Pointer-driven curved-glass response: tilt and specular sheen follow the cursor. */
  const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!reduceMotion && finePointerQuery.matches) {
    const cards = document.querySelectorAll('.expertise-card, .project-card, .iteration-stage, .dna-hero, .dna-principle');
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    cards.forEach((card) => {
      if (!card.querySelector(':scope > .card-sheen')) {
        const sheen = document.createElement('span');
        sheen.className = 'card-sheen';
        sheen.setAttribute('aria-hidden', 'true');
        card.appendChild(sheen);
      }

      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
        const dx = x - 0.5;
        const dy = y - 0.5;

        /* Keep angles restrained so it feels like glass, not a spinning 3D tile. */
        card.style.setProperty('--tilt-x', `${(-dy * 7.2).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(dx * 8.5).toFixed(2)}deg`);
        card.style.setProperty('--shine-x', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--shine-y', `${(y * 100).toFixed(1)}%`);
        card.style.setProperty('--shine-pos-x', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--shine-pos-y', `${(y * 100).toFixed(1)}%`);
        card.style.setProperty('--shine-angle', `${(112 + dx * 24 + dy * 14).toFixed(1)}deg`);
      }, { passive: true });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
        card.style.setProperty('--shine-x', '50%');
        card.style.setProperty('--shine-y', '35%');
        card.style.setProperty('--shine-pos-x', '50%');
        card.style.setProperty('--shine-pos-y', '50%');
        card.style.setProperty('--shine-angle', '112deg');
      });
    });
  }
})();
