'use client';

import { useEffect, useRef } from 'react';

const FPS = 24;
const RUNTIME_SECONDS = 60; // full-page scroll maps to a one-minute "clip"

/**
 * Easter-egg HUD, bottom-left: a film-style timecode + frame count scrubbed by
 * page scroll position (it only moves when you scroll — no ticking). Writes
 * straight to the DOM on a rAF-throttled scroll listener; no React state.
 */
export function FrameCounter() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const frameEl = root.querySelector<HTMLElement>('[data-frame]');
    const tcEl = root.querySelector<HTMLElement>('[data-tc]');
    if (!frameEl || !tcEl) return;

    let raf = 0;
    const total = FPS * RUNTIME_SECONDS;

    const paint = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      const frames = Math.round(p * total);
      frameEl.textContent = String(frames).padStart(5, '0');
      const secs = Math.floor(frames / FPS);
      tcEl.textContent =
        `${String(Math.floor(secs / 60)).padStart(2, '0')}:` +
        `${String(secs % 60).padStart(2, '0')}:` +
        `${String(frames % FPS).padStart(2, '0')}`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={rootRef} className="frame-counter" aria-hidden="true">
      <span data-tc>00:00:00</span>
      <i />
      <span>
        FRAME <span data-frame>00000</span>
      </span>
    </div>
  );
}
