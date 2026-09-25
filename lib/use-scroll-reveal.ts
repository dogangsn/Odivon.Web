'use client';

import { useEffect } from 'react';

export function useScrollReveal(watch?: string) {
  useEffect(() => {
    const root = document.getElementById('main');
    if (!root || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.revealed = 'true';
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });

    targets.forEach(target => {
      if (target.getBoundingClientRect().top < window.innerHeight - 28) target.dataset.revealed = 'true';
      else observer.observe(target);
    });
    root.dataset.motionReady = 'true';

    return () => {
      observer.disconnect();
      delete root.dataset.motionReady;
    };
  }, [watch]);
}
