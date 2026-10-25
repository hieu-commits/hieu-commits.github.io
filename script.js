(() => {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });

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
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -28px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const copyButton = document.getElementById('copyProfile');
  const feedback = document.getElementById('copyFeedback');
  if (copyButton && feedback) {
    copyButton.addEventListener('click', async () => {
      const profileUrl = 'https://github.com/hieu-commits';
      try {
        await navigator.clipboard.writeText(profileUrl);
        feedback.textContent = 'Copied: ' + profileUrl;
      } catch (error) {
        feedback.textContent = 'Profile link: ' + profileUrl;
      }
    });
  }
})();
