'use client';

import { useEffect, useRef } from 'react';

type Options = {
  /** px beyond the element's own bounds where the pull begins */
  radius?: number;
  /** fraction of the cursor offset applied */
  strength?: number;
  /** hard cap on the shift, px */
  max?: number;
};

/**
 * Subtle magnetic pull. `ref` goes on the element whose bounds define the pull
 * zone; `innerRef` goes on the element that actually moves (so the hitbox stays
 * put). Eased on a rAF loop that stops itself at rest — never sets React state,
 * so no re-renders. Inert for touch and prefers-reduced-motion.
 */
export function useMagnetic<
  T extends HTMLElement = HTMLElement,
  I extends HTMLElement = HTMLElement,
>({ radius = 90, strength = 0.3, max = 4 }: Options = {}) {
  const ref = useRef<T>(null);
  const innerRef = useRef<I>(null);

  useEffect(() => {
    const elMaybe = ref.current;
    const innerMaybe = innerRef.current;
    if (!elMaybe || !innerMaybe) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    const el = elMaybe;
    const inner = innerMaybe;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let running = false;

    const clamp = (v: number) => (v < -max ? -max : v > max ? max : v);

    function frame() {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      if (Math.abs(tx - cx) < 0.05 && Math.abs(ty - cy) < 0.05) {
        cx = tx;
        cy = ty;
        inner.style.transform = cx === 0 && cy === 0 ? '' : `translate(${cx}px, ${cy}px)`;
        running = false;
        return;
      }
      inner.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const reachX = r.width / 2 + radius;
      const reachY = r.height / 2 + radius;
      if (Math.abs(dx) > reachX || Math.abs(dy) > reachY) {
        tx = 0;
        ty = 0;
      } else {
        tx = clamp(dx * strength);
        ty = clamp(dy * strength);
      }
      start();
    }

    function onLeave() {
      tx = 0;
      ty = 0;
      start();
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      inner.style.transform = '';
    };
  }, [radius, strength, max]);

  return { ref, innerRef };
}
