/* SIGNAL COMMAND DECK — lightweight header state + HC Core pointer response.
   Existing script.js continues to own the mobile menu open/close behavior. */
(() => {
  'use strict';

  const topbar = document.getElementById('siteTopbar');
  const nav = document.getElementById('siteNav');
  const core = document.getElementById('signalCoreCard');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (topbar) {
    let scheduled = false;
    const updateTopbar = () => {
      topbar.classList.toggle('is-scrolled', window.scrollY > 18);
      scheduled = false;
    };
    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        window.requestAnimationFrame(updateTopbar);
      }
    };
    updateTopbar();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Keep the active navigation signal aligned with the section nearest the reading line. */
  if (nav) {
    const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
    const sectionLinks = navLinks
      .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
      .filter((item) => item.section);

    const setActive = (activeLink) => {
      navLinks.forEach((link) => {
        if (link === activeLink) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };

    let navFrame = 0;
    const updateActiveNav = () => {
      navFrame = 0;
      const readingLine = Math.max(116, window.innerHeight * 0.30);
      let active = sectionLinks[0];
      for (const item of sectionLinks) {
        if (item.section.getBoundingClientRect().top <= readingLine) active = item;
        else break;
      }
      if (active) setActive(active.link);
    };
    const scheduleActiveNav = () => {
      if (!navFrame) navFrame = window.requestAnimationFrame(updateActiveNav);
    };

    navLinks.forEach((link) => link.addEventListener('click', () => setActive(link)));
    updateActiveNav();
    window.addEventListener('scroll', scheduleActiveNav, { passive: true });
    window.addEventListener('resize', scheduleActiveNav, { passive: true });
  }

  /* Pointer-driven identity glass. Touch and reduced-motion users get a static core. */
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (core && finePointer && !reduceMotion) {
    let frame = 0;
    let latest = null;

    const applyPointer = () => {
      frame = 0;
      if (!latest) return;
      const rect = core.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = Math.min(1, Math.max(0, (latest.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (latest.clientY - rect.top) / rect.height));
      core.style.setProperty('--signal-mx', `${(x * 100).toFixed(1)}%`);
      core.style.setProperty('--signal-my', `${(y * 100).toFixed(1)}%`);
      core.style.setProperty('--signal-rx', `${((0.5 - y) * 4.4).toFixed(2)}deg`);
      core.style.setProperty('--signal-ry', `${((x - 0.5) * 5.2).toFixed(2)}deg`);
    };

    core.addEventListener('pointermove', (event) => {
      latest = event;
      if (!frame) frame = window.requestAnimationFrame(applyPointer);
    }, { passive: true });

    core.addEventListener('pointerleave', () => {
      latest = null;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      core.style.setProperty('--signal-mx', '50%');
      core.style.setProperty('--signal-my', '42%');
      core.style.setProperty('--signal-rx', '0deg');
      core.style.setProperty('--signal-ry', '0deg');
    });
  }
})();
