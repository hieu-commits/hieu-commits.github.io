/*
 * HIEU COMMITS — FOUNDATION QUALITY ENHANCEMENTS
 * No dependencies. Safe to add after the site's existing deferred scripts.
 */
(() => {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /*
   * Progressive enhancement:
   * - Without this script, CSS leaves all .reveal content visible.
   * - Motion is enabled only after IntersectionObserver is ready.
   * - If observer setup fails, remove the motion class and reveal everything.
   */
  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  const showAllRevealItems = () => {
    root.classList.remove('foundation-motion-ready');
    revealItems.forEach((item) => item.classList.add('is-visible'));
  };

  if (reduceMotion || !('IntersectionObserver' in window) || revealItems.length === 0) {
    showAllRevealItems();
  } else {
    try {
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.08,
        rootMargin: '0px 0px -7% 0px'
      });

      /* Mark the document only after observer construction succeeds. */
      root.classList.add('foundation-motion-ready');
      revealItems.forEach((item) => observer.observe(item));
    } catch (error) {
      showAllRevealItems();
    }
  }

  /*
   * Phase 01 — do not present a generic profile-repositories link as if a
   * Planned build already had its own repository. Keep the visible status
   * honest until a direct project URL is added to the HTML.
   */
  document.querySelectorAll('.project-card').forEach((card) => {
    const state = card.querySelector('.project-state');
    if (!state || !/planned\s+build/i.test(state.textContent || '')) return;

    const projectTitle = card.querySelector('h3')?.textContent?.trim() || 'This project';
    const genericLinks = card.querySelectorAll(
      '.project-footer a[href*="github.com/hieu-commits?tab=repositories"]'
    );

    genericLinks.forEach((link) => {
      const pending = document.createElement('span');
      pending.className = 'project-link-pending';
      pending.textContent = 'Repository pending';
      pending.setAttribute('aria-label', `${projectTitle}: repository not published yet`);
      link.replaceWith(pending);
    });
  });

  /* Improve the mobile menu's accessible name and Escape-key behavior. */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');

  if (menuToggle && nav) {
    const syncMenuName = () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
    };

    syncMenuName();
    menuToggle.addEventListener('click', syncMenuName);
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) syncMenuName();
    });

    /* Capture before the existing menu handler closes the panel. */
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || menuToggle.getAttribute('aria-expanded') !== 'true') return;
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
      menuToggle.focus();
    }, true);

    const desktopQuery = window.matchMedia('(min-width: 901px)');
    const closeOnDesktop = (event) => {
      if (!event.matches) return;
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
    };
    if (desktopQuery.addEventListener) desktopQuery.addEventListener('change', closeOnDesktop);
    else if (desktopQuery.addListener) desktopQuery.addListener(closeOnDesktop);
  }
})();
