/* Scroll-reveal enhancement: leaves content visible if scripting or observers fail. */
(() => {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const selectors = [
      '.section .section-head', '.section .center.narrow',
      '.section .service-card', '.section .blog-card',
      '.family-v2-benefits article', '.family-v2-concern-list article',
      '.family-v2-steps article', '.family-v2-review-grid .card',
      '.section .faq-box', '.section .info-panel',
      '.section .cta-wide', '.family-v2-final-inner',
      '.section .leader-card'
    ];
    const items = Array.from(new Set(document.querySelectorAll(selectors.join(','))));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('fn-show');
        observer.unobserve(entry.target);
      });
    }, {threshold:0.08, rootMargin:'0px 0px -38px 0px'});
    items.forEach((el, index) => {
      // No flash/hidden items already occupying initial viewport.
      if (el.getBoundingClientRect().top < window.innerHeight * .86) return;
      el.style.setProperty('--fn-delay', `${(index % 3) * 105}ms`);
      el.classList.add('fn-observe');
      observer.observe(el);
    });
  });
})();
