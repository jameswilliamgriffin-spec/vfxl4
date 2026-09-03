'use client';

import { useEffect, useRef } from 'react';

type Options = {
  /** max px translate on each axis */
  maxX?: number;
  maxY?: number;
  /** normalised (-1..1) pointer position within the frame */
  onMove?: (nx: number, ny: number) => void;
  onLeave?: () => void;
};

/**
 * Almost-imperceptible parallax: `frameRef` is the hover area, `targetRef` the
 * element that translates a few px toward the cursor. Eased on a rAF loop that
 * parks at rest; no React state. Inert for touch and prefers-reduced-motion.
 */
export function usePointerParallax<
  F extends HTMLElement = HTMLElement,
  T extends HTMLElement = HTMLElement,
>({ maxX = 6, maxY = 4, onMove, onLeave }: Options = {}) {
  const frameRef = useRef<F>(null);
  const targetRef = useRef<T>(null);
  const cbRef = useRef({ onMove, onLeave });
  cbRef.current = { onMove, onLeave };

  useEffect(() => {
    const frameMaybe = frameRef.current;
    const targetMaybe = targetRef.current;
    if (!frameMaybe || !targetMaybe) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    const frame = frameMaybe;
    const target = targetMaybe;

    let tnx = 0;
    let tny = 0;
    let nx = 0;
    let ny = 0;
    let raf = 0;
    let running = false;

    function tick() {
      nx += (tnx - nx) * 0.12;
      ny += (tny - ny) * 0.12;
      target.style.transform = `translate3d(${(nx * maxX).toFixed(2)}px, ${(ny * maxY).toFixed(2)}px, 0)`;
      if (Math.abs(tnx - nx) < 0.002 && Math.abs(tny - ny) < 0.002) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    }

    function onPointerMove(e: PointerEvent) {
      const r = frame.getBoundingClientRect();
      tnx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      tny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      cbRef.current.onMove?.(tnx, tny);
      start();
    }

    function onPointerLeave() {
      tnx = 0;
      tny = 0;
      cbRef.current.onLeave?.();
      start();
    }

    frame.addEventListener('pointermove', onPointerMove, { passive: true });
    frame.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      frame.removeEventListener('pointermove', onPointerMove);
      frame.removeEventListener('pointerleave', onPointerLeave);
      target.style.transform = '';
    };
  }, [maxX, maxY]);

  return { frameRef, targetRef };
}
