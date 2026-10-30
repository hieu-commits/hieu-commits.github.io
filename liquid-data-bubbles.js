/* Liquid Data Bubbles — creates a decorative bubble layer inside the existing footer.
   No changes to footer HTML are required. Safe to run if the layer already exists. */
(() => {
  'use strict';

  const initLiquidDataBubbles = () => {
    const footer = document.querySelector('.footer');
    if (!footer || footer.querySelector(':scope > .liquid-bubbles-layer')) return;

    const layer = document.createElement('div');
    layer.className = 'liquid-bubbles-layer';
    layer.setAttribute('aria-hidden', 'true');

    const bubbles = [
      { left: '4%',  size: 9,  drift: -16, rise: -166, duration: 12.8, delay: -7.1, opacity: .53, rest: -30, ring: false },
      { left: '10%', size: 14, drift: 21,  rise: -194, duration: 16.2, delay: -3.8, opacity: .48, rest: -82, ring: true  },
      { left: '17%', size: 6,  drift: -12, rise: -146, duration: 11.4, delay: -8.4, opacity: .57, rest: -54, ring: false },
      { left: '25%', size: 10, drift: 18,  rise: -184, duration: 14.6, delay: -5.5, opacity: .51, rest: -106, ring: false },
      { left: '33%', size: 16, drift: -23, rise: -204, duration: 17.5, delay: -11.2, opacity: .42, rest: -65, ring: true  },
      { left: '42%', size: 7,  drift: 13,  rise: -158, duration: 12.1, delay: -2.7, opacity: .54, rest: -120, ring: false },
      { left: '50%', size: 12, drift: -17, rise: -188, duration: 15.3, delay: -9.2, opacity: .48, rest: -42, ring: true  },
      { left: '59%', size: 6,  drift: 12,  rise: -152, duration: 11.8, delay: -4.9, opacity: .51, rest: -92, ring: false },
      { left: '67%', size: 15, drift: -22, rise: -202, duration: 17.1, delay: -6.6, opacity: .43, rest: -136, ring: true  },
      { left: '75%', size: 9,  drift: 16,  rise: -170, duration: 13.7, delay: -10.1, opacity: .53, rest: -74, ring: false },
      { left: '83%', size: 12, drift: -19, rise: -192, duration: 15.8, delay: -1.6, opacity: .47, rest: -115, ring: false },
      { left: '91%', size: 8,  drift: 14,  rise: -156, duration: 12.4, delay: -7.9, opacity: .53, rest: -50, ring: true  },
      { left: '37%', size: 5,  drift: 10,  rise: -138, duration: 10.9, delay: -6.2, opacity: .48, rest: -145, ring: false },
      { left: '71%', size: 6,  drift: -11, rise: -142, duration: 11.7, delay: -3.2, opacity: .49, rest: -24, ring: false }
    ];

    const number = (value, unit = 'px') => `${value}${unit}`;
    bubbles.forEach((config) => {
      const bubble = document.createElement('span');
      bubble.className = `liquid-bubble${config.ring ? ' is-ring' : ''}`;
      bubble.style.setProperty('--bubble-left', config.left);
      bubble.style.setProperty('--bubble-size', number(config.size));
      bubble.style.setProperty('--bubble-drift', number(config.drift));
      bubble.style.setProperty('--bubble-rise-y', number(config.rise));
      bubble.style.setProperty('--bubble-duration', number(config.duration, 's'));
      bubble.style.setProperty('--bubble-delay', number(config.delay, 's'));
      bubble.style.setProperty('--bubble-opacity', String(config.opacity));
      bubble.style.setProperty('--bubble-rest-y', number(config.rest));
      layer.appendChild(bubble);
    });

    footer.classList.add('liquid-bubbles-ready');
    footer.prepend(layer);

    /* Pause animation work while the footer is off-screen. */
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          layer.classList.toggle('is-active', entry.isIntersecting);
        });
      }, { rootMargin: '64px 0px 64px 0px', threshold: 0 });
      observer.observe(footer);
    } else {
      layer.classList.add('is-active');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLiquidDataBubbles, { once: true });
  } else {
    initLiquidDataBubbles();
  }
})();
