'use client';

import { useEffect, useRef } from 'react';

/**
 * Faint technical dot-grid painted on one <canvas> that fills the hero it sits in
 * (its parent element). At rest — and always for touch or prefers-reduced-motion —
 * it is a static grid. While the pointer is inside the hero, dots within a soft
 * radius ease toward slightly brighter, slightly larger, and nudged a hair away
 * from the cursor, with a quadratic falloff so distant dots barely move.
 *
 * The rAF loop only runs while the pointer is moving plus a short ease-out, then
 * stops itself, so an idle hero costs nothing. The static grid is pre-rendered to
 * an offscreen canvas and blitted in one drawImage per frame; only the ~100 dots
 * inside the influence radius are drawn individually.
 */
export function HeroDotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = ref.current;
    if (!canvasEl) return;
    const hostEl = canvasEl.parentElement;
    const context = canvasEl.getContext('2d');
    if (!hostEl || !context) return;

    // Re-bind to non-nullable consts so the nested render/resize closures below
    // don't each need a guard.
    const canvas = canvasEl;
    const host = hostEl;
    const ctx = context;

    const GAP = 28; // px between dots
    const BASE_R = 1; // resting dot radius
    const BASE_A = 0.05; // resting dot alpha
    const RADIUS = 120; // px reach of the cursor's influence
    const ADD_A = 0.2; // extra alpha at the cursor
    const ADD_R = 0.85; // extra radius at the cursor
    const SHIFT = 2; // max px a dot is nudged away from the cursor
    const EASE_POS = 0.15; // cursor follow
    const EASE_STR = 0.09; // influence fade in / out
    const RGB = '210, 226, 220';

    const interactive =
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !window.matchMedia('(hover: none), (pointer: coarse)').matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const cols: number[] = [];
    const rows: number[] = [];
    let base: HTMLCanvasElement | null = null;

    let tx = -9999; // target cursor, relative to the canvas
    let ty = -9999;
    let px = -9999; // eased cursor
    let py = -9999;
    let targetStr = 0; // 1 while pointer inside, 0 otherwise
    let str = 0; // eased influence strength
    let raf = 0;
    let running = false;

    function buildBase() {
      const b = document.createElement('canvas');
      b.width = Math.max(1, canvas.width);
      b.height = Math.max(1, canvas.height);
      const bc = b.getContext('2d');
      if (!bc) return;
      bc.setTransform(dpr, 0, 0, dpr, 0, 0);
      bc.fillStyle = `rgba(${RGB}, ${BASE_A})`;
      for (let j = 0; j < rows.length; j++) {
        for (let i = 0; i < cols.length; i++) {
          bc.beginPath();
          bc.arc(cols[i], rows[j], BASE_R, 0, Math.PI * 2);
          bc.fill();
        }
      }
      base = b;
    }

    function render() {
      ctx.clearRect(0, 0, w, h);
      if (base) ctx.drawImage(base, 0, 0, w, h);
      if (str <= 0.003) return;

      const minX = px - RADIUS;
      const maxX = px + RADIUS;
      const minY = py - RADIUS;
      const maxY = py + RADIUS;
      for (let j = 0; j < rows.length; j++) {
        const y = rows[j];
        if (y < minY || y > maxY) continue;
        for (let i = 0; i < cols.length; i++) {
          const x = cols[i];
          if (x < minX || x > maxX) continue;
          const dx = x - px;
          const dy = y - py;
          const d = Math.hypot(dx, dy);
          if (d > RADIUS) continue;
          let f = 1 - d / RADIUS;
          f *= f; // quadratic falloff
          f *= str;
          const inv = d > 0.001 ? 1 / d : 0;
          ctx.beginPath();
          ctx.fillStyle = `rgba(${RGB}, ${BASE_A + ADD_A * f})`;
          ctx.arc(
            x + dx * inv * SHIFT * f,
            y + dy * inv * SHIFT * f,
            BASE_R + ADD_R * f,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
    }

    function frame() {
      px += (tx - px) * EASE_POS;
      py += (ty - py) * EASE_POS;
      str += (targetStr - str) * EASE_STR;
      render();

      if (
        Math.abs(tx - px) < 0.2 &&
        Math.abs(ty - py) < 0.2 &&
        Math.abs(targetStr - str) < 0.003
      ) {
        px = tx;
        py = ty;
        str = targetStr;
        render();
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

    function resize() {
      const rect = host.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols.length = 0;
      rows.length = 0;
      const nx = Math.max(1, Math.floor(w / GAP));
      const ny = Math.max(1, Math.floor(h / GAP));
      const ox = (w - (nx - 1) * GAP) / 2;
      const oy = (h - (ny - 1) * GAP) / 2;
      for (let i = 0; i < nx; i++) cols.push(ox + i * GAP);
      for (let j = 0; j < ny; j++) rows.push(oy + j * GAP);

      buildBase();
      if (!running) render();
    }

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      if (px < -9000) {
        px = tx;
        py = ty;
      }
      targetStr = 1;
      start();
    }

    function onLeave() {
      targetStr = 0;
      start();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    if (interactive) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
      host.addEventListener('pointercancel', onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointercancel', onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero-dot-field" aria-hidden="true" />;
}
