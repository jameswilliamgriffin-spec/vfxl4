'use client';

import { useEffect, useRef } from 'react';

/**
 * One fixed contextual tag that follows the cursor while it is over an element
 * carrying `data-cursor-label="…"`. Delegated listeners on the document, eased
 * on a rAF loop that parks itself at rest — no React state, no re-renders. The
 * real cursor is untouched. Inert for touch and prefers-reduced-motion.
 */
export function CursorField() {
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tagMaybe = tagRef.current;
    if (!tagMaybe) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const tag = tagMaybe;

    let tx = -200;
    let ty = -200;
    let cx = -200;
    let cy = -200;
    let raf = 0;
    let running = false;
    let shown = false;

    function frame() {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      tag.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      if (Math.abs(tx - cx) < 0.1 && Math.abs(ty - cy) < 0.1) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }

    function labelFor(node: EventTarget | null) {
      return node instanceof Element
        ? (node.closest('[data-cursor-label]') as HTMLElement | null)
        : null;
    }

    function onMove(e: PointerEvent) {
      tx = e.clientX + 16;
      ty = e.clientY + 18;
      if (!shown) {
        cx = tx;
        cy = ty;
      }
      start();
    }

    function onOver(e: PointerEvent) {
      const hit = labelFor(e.target);
      if (!hit) return;
      tag.textContent = hit.dataset.cursorLabel ?? '';
      tag.dataset.on = 'true';
      shown = true;
    }

    function onOut(e: PointerEvent) {
      const from = labelFor(e.target);
      if (!from) return;
      const to = labelFor(e.relatedTarget);
      if (to === from) return;
      if (to) {
        tag.textContent = to.dataset.cursorLabel ?? '';
      } else {
        tag.dataset.on = 'false';
        shown = false;
      }
    }

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  return <div ref={tagRef} className="cursor-tag" data-on="false" aria-hidden="true" />;
}
