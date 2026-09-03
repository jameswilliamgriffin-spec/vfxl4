'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';

type Pos = { x: number; y: number }; // percent of the field box

// Calm-water feel: gentle push, soft rest spring, light link tension, damping that
// allows a hair of overshoot. Movement travels through the graph because the link
// tension force chases each neighbour's current displacement a frame at a time.
const RADIUS = 300; // px — proximity reach; cards react before the cursor arrives
const PUSH = 0.5; // accel at full cursor influence
const K_REST = 0.045; // pull back to origin
const K_LINK = 0.02; // soft tension between connected cards
const DAMP = 0.86; // velocity damping (slight overshoot, natural settle)
const MAX_OFF = 14; // px cap per axis
const MAX_ROT = 1.1; // deg cap
const ROT_DAMP = 0.87;
const INFL_DECAY = 0.5; // influence lost per hop through the network
const INFL_EASE = 0.16; // how fast influence propagates / fades
const EPS = 0.04;

/**
 * Turns a set of positioned cards + an edge list into one softly connected
 * floating system. The caller's field element must contain `.pm-physics` wrappers
 * in `positions` order and `.pm-links line` elements in `edges` order. Runs a
 * single rAF loop that parks itself at rest; never sets React state. Inert for
 * touch, reduced motion and the stacked (<=1300px) layout.
 */
export function useFloatingNetwork(
  fieldRef: RefObject<HTMLElement | null>,
  positions: Pos[],
  edges: [number, number][],
) {
  useEffect(() => {
    const fieldMaybe = fieldRef.current;
    if (!fieldMaybe) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const field = fieldMaybe;
    const canRun = () => window.matchMedia('(hover: hover) and (min-width: 1301px)').matches;
    if (!canRun()) return;

    const nodeEls = Array.from(field.querySelectorAll<HTMLElement>('.pm-physics'));
    const lineEls = Array.from(field.querySelectorAll<SVGLineElement>('.pm-links line'));
    if (nodeEls.length !== positions.length) return;

    const n = positions.length;
    const adj: number[][] = positions.map(() => []);
    for (const [a, b] of edges) {
      if (a >= 0 && b >= 0) {
        adj[a].push(b);
        adj[b].push(a);
      }
    }

    const ox = new Float32Array(n);
    const oy = new Float32Array(n);
    const vx = new Float32Array(n);
    const vy = new Float32Array(n);
    const rot = new Float32Array(n);
    const vrot = new Float32Array(n);
    const infl = new Float32Array(n);
    const nextInfl = new Float32Array(n);

    let W = 1;
    let H = 1;
    let cx = -9999;
    let cy = -9999;
    let pointerIn = false;
    let raf = 0;
    let running = false;

    function measure() {
      const r = field.getBoundingClientRect();
      W = r.width || 1;
      H = r.height || 1;
    }
    measure();

    function loop() {
      let moving = false;

      for (let i = 0; i < n; i++) {
        const nx = (positions[i].x / 100) * W;
        const ny = (positions[i].y / 100) * H;
        let direct = 0;
        let fx = 0;
        let fy = 0;

        if (pointerIn) {
          const dx = nx - cx;
          const dy = ny - cy;
          const d = Math.hypot(dx, dy) || 0.001;
          const f = Math.max(0, 1 - d / RADIUS);
          direct = f * f;
          if (direct > 0) {
            fx = (dx / d) * PUSH * direct;
            fy = (dy / d) * PUSH * direct;
          }
        }

        // influence spreads: own cursor hit, or a neighbour's influence minus a hop
        let best = direct;
        for (const j of adj[i]) {
          const via = infl[j] * INFL_DECAY;
          if (via > best) best = via;
        }
        nextInfl[i] = infl[i] + (best - infl[i]) * INFL_EASE;

        // soft link tension toward each neighbour's current displacement
        for (const j of adj[i]) {
          fx += (ox[j] - ox[i]) * K_LINK;
          fy += (oy[j] - oy[i]) * K_LINK;
        }
        // rest spring
        fx -= ox[i] * K_REST;
        fy -= oy[i] * K_REST;

        vx[i] = (vx[i] + fx) * DAMP;
        vy[i] = (vy[i] + fy) * DAMP;
        ox[i] = Math.max(-MAX_OFF, Math.min(MAX_OFF, ox[i] + vx[i]));
        oy[i] = Math.max(-MAX_OFF, Math.min(MAX_OFF, oy[i] + vy[i]));

        const tRot = Math.max(-MAX_ROT, Math.min(MAX_ROT, -ox[i] * 0.05 + vx[i] * 0.5));
        vrot[i] = (vrot[i] + (tRot - rot[i]) * 0.08) * ROT_DAMP;
        rot[i] += vrot[i];

        const el = nodeEls[i];
        el.style.transform = `translate(${ox[i].toFixed(2)}px, ${oy[i].toFixed(2)}px) rotate(${rot[i].toFixed(3)}deg)`;
        el.style.setProperty('--infl', nextInfl[i].toFixed(3));

        if (
          Math.abs(ox[i]) > EPS ||
          Math.abs(oy[i]) > EPS ||
          Math.abs(vx[i]) > EPS ||
          Math.abs(vy[i]) > EPS ||
          nextInfl[i] > 0.006
        ) {
          moving = true;
        }
      }
      infl.set(nextInfl);

      for (let k = 0; k < lineEls.length; k++) {
        const e = edges[k];
        if (!e) continue;
        const [a, b] = e;
        const line = lineEls[k];
        line.setAttribute('x1', (positions[a].x + (ox[a] * 100) / W).toFixed(2));
        line.setAttribute('y1', (positions[a].y + (oy[a] * 100) / H).toFixed(2));
        line.setAttribute('x2', (positions[b].x + (ox[b] * 100) / W).toFixed(2));
        line.setAttribute('y2', (positions[b].y + (oy[b] * 100) / H).toFixed(2));
        const g = Math.max(infl[a], infl[b]);
        line.style.stroke =
          g > 0.01 ? `rgba(178, 222, 208, ${(0.26 + g * 0.4).toFixed(3)})` : '';
      }

      if (moving || pointerIn) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
        for (const el of nodeEls) {
          el.style.transform = '';
          el.style.removeProperty('--infl');
        }
        for (const line of lineEls) line.style.stroke = '';
      }
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: PointerEvent) {
      if (!canRun()) {
        pointerIn = false;
        return;
      }
      const r = field.getBoundingClientRect();
      W = r.width || 1;
      H = r.height || 1;
      cx = e.clientX - r.left;
      cy = e.clientY - r.top;
      pointerIn = true;
      start();
    }

    function onLeave() {
      pointerIn = false;
      start();
    }

    field.addEventListener('pointermove', onMove, { passive: true });
    field.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', measure, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      field.removeEventListener('pointermove', onMove);
      field.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', measure);
      for (const el of nodeEls) {
        el.style.transform = '';
        el.style.removeProperty('--infl');
      }
      for (const line of lineEls) line.style.stroke = '';
    };
  }, [fieldRef, positions, edges]);
}
