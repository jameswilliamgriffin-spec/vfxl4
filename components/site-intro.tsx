'use client';

import { useEffect, useRef, useState } from 'react';
import { finishIntro } from '@/lib/intro-state';

// Full-screen opening sequence, adapted from the Viridian Academy sister site:
// a drafting grid settles, a scan line passes, and "VISUAL EFFECTS LEVEL 4"
// resolves from noise while a measure fills — then the overlay lifts to reveal
// the site. Rendered in the initial HTML so it covers the page immediately; the
// exit and the character-resolve run on the client. Reduced motion hides it
// outright (CSS) and settles the hero straight away.

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+*#<>[]{}';
const FINAL = 'VISUAL EFFECTS LEVEL 4';
const RUN_MS = 2350;
const EXIT_MS = 640;

function scramble(progress: number) {
  const locked = Math.floor(progress * FINAL.length);
  let out = '';
  for (let i = 0; i < FINAL.length; i += 1) {
    const ch = FINAL[i];
    if (ch === ' ') out += ' ';
    else if (i < locked) out += ch;
    else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
  }
  return out;
}

export function SiteIntro() {
  const [display, setDisplay] = useState(FINAL);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const endRef = useRef<() => void>(() => {});

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      finishIntro();
      setGone(true);
      return;
    }

    document.body.classList.add('intro-running');

    let raf = 0;
    let startAt = 0;
    let ended = false;

    const tick = (now: number) => {
      if (!startAt) startAt = now;
      const progress = Math.min(1, (now - startAt) / RUN_MS);
      setDisplay(scramble(progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const end = () => {
      if (ended) return;
      ended = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      setDisplay(FINAL);
      document.body.classList.remove('intro-running');
      document.body.classList.add('site-ready');
      finishIntro();
      setLeaving(true);
      window.setTimeout(() => setGone(true), EXIT_MS);
    };
    endRef.current = end;

    const timer = window.setTimeout(end, RUN_MS + 240);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      document.body.classList.remove('intro-running');
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`site-intro${leaving ? ' is-leaving' : ''}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="site-intro-grid" />
      <div className="site-intro-drawing">
        <span className="si-axis si-axis-x" />
        <span className="si-axis si-axis-y" />
        <span className="si-orbit si-orbit-one" />
        <span className="si-orbit si-orbit-two" />
        <span className="si-crosshair" />
      </div>
      <div className="site-intro-interface">
        <div className="si-coordinates">CREATIVE ALLIANCE &times; VIRIDIAN FX / BUILD 04</div>
        <div className="si-lockup">
          <div className="si-status">ASSEMBLING / TRAINING / MAKING</div>
          <div className="si-scramble">{display}</div>
          <div className="si-sub">LEVEL 4 &middot; JUNIOR VISUAL EFFECTS APPRENTICESHIP</div>
          <div className="si-progress">
            <span />
          </div>
        </div>
        <button
          className="si-skip"
          type="button"
          onClick={() => endRef.current()}
        >
          SKIP &rarr;
        </button>
      </div>
    </div>
  );
}
