import type Lenis from 'lenis';

/**
 * The one Lenis instance the app runs, made reachable outside App.tsx.
 *
 * App.tsx creates it (behind a dynamic import, skipped entirely for
 * prefers-reduced-motion) but never exposed it anywhere. Every component that
 * needed to trigger a scroll had no way to reach it, so each one called the
 * browser's own `window.scrollTo({ behavior: 'smooth' })` instead — which
 * animates the same scroll position Lenis's own rAF loop is independently
 * driving. Two competing animation loops fighting for one scrollTop is what
 * "everything feels jerky" was: not four separate bugs in four components,
 * one native-smooth-scroll call fighting Lenis on every frame it ran.
 *
 * A plain module-level ref, not React context — nothing here needs to
 * trigger a re-render when Lenis mounts, it only needs to be *reachable*.
 */
export const lenisRef: { current: Lenis | null } = { current: null };

/**
 * Scroll the page. Routes through Lenis when it's running (so scroll-driven
 * things stay in sync with it); falls back to the browser's own smooth
 * scroll only when Lenis never started — reduced-motion users, or the brief
 * window before the dynamic import resolves on first load.
 */
export const scrollToTop = () => {
  if (lenisRef.current) {
    lenisRef.current.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
