'use client';

import { Fragment, useEffect, useRef } from 'react';

// Monochrome take on Andrea Catanzaro's "Stack Overflow Instagram Effect".
// Hovering a line ripples a brief glitch outward from its centre character:
// an opacity dip, a ~50% chance the glyph scrambles to a random character (and
// picks up a 2px inspect-style outline), a ~34% chance of a △x width annotation
// — then it snaps back. No colour, no dependencies. Desktop hover only; skipped
// for reduced motion. The heading is split in JSX so it renders intact without
// JS, and words are kept whole so lines still wrap only at spaces.

const GLYPHS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>%&@!#$^*()-_+=[]{}|/:;?~'.split('');

const STAGGER = 26; // ms per character out from the centre
const HOLD = 300; // ms a character stays glitched

type Line = { text: string; accent?: boolean };

export function ScrambleHeading({ lines }: { lines: Line[] }) {
  const rootRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    const lineEls = Array.from(root.querySelectorAll<HTMLElement>('[data-sh-line]'));
    const timers = new Set<number>();
    const active = new Map<HTMLElement, () => void>();

    function restore(char: HTMLElement) {
      const undo = active.get(char);
      if (undo) {
        undo();
        active.delete(char);
      }
    }

    function glitch(char: HTMLElement) {
      restore(char);
      const orig = char.dataset.ch ?? char.textContent ?? '';
      if (char.dataset.ch === undefined) char.dataset.ch = orig;

      char.classList.add('is-flash');
      if (Math.random() < 0.5) {
        char.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        char.classList.add('is-outline');
      }
      if (Math.random() < 0.34) {
        const detail = document.createElement('span');
        detail.className = 'sh-detail';
        detail.textContent = `△x = ${Math.round(char.offsetWidth)}px`;
        char.appendChild(detail);
      }

      const onFlashEnd = () => char.classList.remove('is-flash');
      char.addEventListener('animationend', onFlashEnd, { once: true });

      const revert = window.setTimeout(() => {
        char.textContent = char.dataset.ch ?? orig;
        char.classList.remove('is-outline');
        active.delete(char);
      }, HOLD);
      timers.add(revert);

      active.set(char, () => {
        window.clearTimeout(revert);
        timers.delete(revert);
        char.removeEventListener('animationend', onFlashEnd);
        char.classList.remove('is-flash', 'is-outline');
        char.textContent = char.dataset.ch ?? orig;
      });
    }

    function ripple(line: HTMLElement) {
      const chars = Array.from(line.querySelectorAll<HTMLElement>('.sh-char'));
      chars.forEach(restore);
      const mid = (chars.length - 1) / 2;
      chars.forEach((char, i) => {
        const t = window.setTimeout(() => glitch(char), Math.abs(i - mid) * STAGGER);
        timers.add(t);
      });
    }

    const bound = lineEls.map((line) => {
      const handler = () => ripple(line);
      line.addEventListener('mouseenter', handler);
      return { line, handler };
    });

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      active.forEach((undo) => undo());
      bound.forEach(({ line, handler }) => line.removeEventListener('mouseenter', handler));
    };
  }, []);

  return (
    <h2 className="overview-heading-title" ref={rootRef}>
      {lines.map((line, li) => {
        const words = line.text.split(' ');
        return (
          <span
            key={li}
            data-sh-line
            className={line.accent ? 'sh-line sh-line--accent' : 'sh-line'}
          >
            {words.map((word, wi) => (
              <Fragment key={wi}>
                <span className="sh-word">
                  {Array.from(word).map((ch, ci) => (
                    <span className="sh-char" key={ci}>
                      {ch}
                    </span>
                  ))}
                </span>
                {wi < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </span>
        );
      })}
    </h2>
  );
}
