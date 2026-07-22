import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Initializes Lenis smooth scrolling once at the app root.
 * Respects prefers-reduced-motion by skipping smoothing entirely.
 * Listens for custom 'lenis-stop' / 'lenis-start' events so other
 * components (e.g. MobileMenu) can pause smooth scroll when overlays open.
 */
export function useLenis() {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);

    function handleStop() {
      lenis.stop();
    }

    function handleStart() {
      lenis.start();
    }

    window.addEventListener('lenis-stop', handleStop);
    window.addEventListener('lenis-start', handleStart);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('lenis-stop', handleStop);
      window.removeEventListener('lenis-start', handleStart);
      lenis.destroy();
    };
  }, []);
}
