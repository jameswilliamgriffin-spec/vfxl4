'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A small number that briefly scrambles through digits, then counts up and locks
 * when it first scrolls into view — production-readout flavour, not a slot
 * machine. Renders the final value immediately for reduced motion.
 */
export function Counter({ value, pad = 2 }: { value: number; pad?: number }) {
  const target = String(value).padStart(pad, '0');
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const scramble = 260; // ms of digit churn
      const settle = 420; // ms counting up after
      const tick = (now: number) => {
        const t = now - start;
        if (t < scramble) {
          setDisplay(
            Array.from({ length: pad }, () => Math.floor(Math.random() * 10)).join(''),
          );
          raf = requestAnimationFrame(tick);
        } else if (t < scramble + settle) {
          const p = (t - scramble) / settle;
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(String(Math.round(eased * value)).padStart(pad, '0'));
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(target);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          io.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, pad, target]);

  return (
    <span className="counter" ref={ref}>
      {display}
    </span>
  );
}
