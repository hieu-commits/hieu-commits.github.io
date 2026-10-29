/* THE THINKING ATLAS / click-to-explore + scroll-synced spatial map. */
(() => {
  const atlas = document.querySelector('[data-thinking-atlas]');
  if (!atlas) return;

  const nodeButtons = Array.from(atlas.querySelectorAll('[data-atlas-node]'));
  const steps = Array.from(atlas.querySelectorAll('[data-atlas-step]'));
  const currentLabel = atlas.querySelector('[data-atlas-current-label]');
  const counter = atlas.querySelector('[data-atlas-counter]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const indexById = new Map(steps.map((step, index) => [step.dataset.atlasStep, index]));
  let lastManualSelection = 0;

  function setActive(id) {
    if (!indexById.has(id)) return;
    const index = indexById.get(id);
    atlas.dataset.active = id;
    nodeButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.atlasNode === id));
    });
    steps.forEach((step) => {
      const active = step.dataset.atlasStep === id;
      step.classList.toggle('is-active', active);
    });
    const activeStep = steps[index];
    const label = activeStep.querySelector('.atlas-step-meta')?.textContent || id.toUpperCase();
    if (currentLabel) currentLabel.textContent = `${String(index + 1).padStart(2, '0')} / ${id.toUpperCase()}`;
    if (counter) counter.innerHTML = `${String(index + 1).padStart(2, '0')} <i>/ ${String(steps.length).padStart(2, '0')}</i>`;
    atlas.dataset.currentLabel = label;
  }

  nodeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const id = button.dataset.atlasNode;
      const target = atlas.querySelector(`#atlas-step-${id}`);
      lastManualSelection = Date.now();
      setActive(id);
      if (target) {
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        target.focus({ preventScroll: true });
      }
    });

    /* Arrow keys let keyboard users move around the spatial map without hunting through tabs. */
    button.addEventListener('keydown', (event) => {
      const previousKeys = ['ArrowLeft', 'ArrowUp'];
      const nextKeys = ['ArrowRight', 'ArrowDown'];
      let nextIndex = index;
      if (previousKeys.includes(event.key)) nextIndex = (index - 1 + nodeButtons.length) % nodeButtons.length;
      else if (nextKeys.includes(event.key)) nextIndex = (index + 1) % nodeButtons.length;
      else return;
      event.preventDefault();
      nodeButtons[nextIndex].focus();
      nodeButtons[nextIndex].click();
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (Date.now() - lastManualSelection < 700) return;
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) setActive(visible[0].target.dataset.atlasStep);
    }, {
      root: null,
      rootMargin: '-28% 0px -45% 0px',
      threshold: [0, 0.12, 0.3, 0.55]
    });
    steps.forEach((step) => observer.observe(step));
  }

  setActive(atlas.dataset.active || 'observe');
})();
