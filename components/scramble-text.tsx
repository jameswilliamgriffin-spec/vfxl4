'use client';

import { useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { isIntroDone, subscribeIntro } from '@/lib/intro-state';

// Character-resolve effect for eyebrows / kickers, echoing the site intro: each
// position holds a random glyph until the time-driven "locked" front sweeps past
// it. Runs once, when the element is in view and the opening overlay has lifted.
// Renders the real text on the server and until it runs, so it never hides
// content and there is no hydration mismatch.

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+*#<>[]{}';

function scramble(text: string, progress: number) {
  const locked = Math.floor(progress * text.length);
  let out = '';
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === ' ' || ch === '\n') out += ch;
    else if (i < locked) out += ch;
    else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
  }
  return out;
}

type ScrambleTextProps = {
  text: string;
  className?: string;
  /** element to render; defaults to a span */
  as?: 'span' | 'div' | 'p';
  /** ms the resolve takes */
  duration?: number;
  /** ms to wait before resolving once it is eligible to run */
  delay?: number;
};

export function ScrambleText({
  text,
  className,
  as: Tag = 'span',
  duration = 620,
  delay = 90,
}: ScrambleTextProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(text);
  const gate = useRef({ visible: false, introDone: isIntroDone(), ran: false });

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const state = gate.current;
    let raf = 0;

    const run = () => {
      if (state.ran || !state.visible || !state.introDone) return;
      state.ran = true;
      const startAt = performance.now() + delay;
      const tick = (now: number) => {
        const progress = (now - startAt) / duration;
        if (progress < 0) {
          raf = requestAnimationFrame(tick);
          return;
        }
        setDisplay(scramble(text, Math.min(1, progress)));
        if (progress < 1) raf = requestAnimationFrame(tick);
        else setDisplay(text);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            state.visible = true;
            run();
          }
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    const unsubscribe = subscribeIntro(() => {
      state.introDone = true;
      run();
    });

    return () => {
      observer.disconnect();
      unsubscribe();
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion, text, duration, delay]);

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
