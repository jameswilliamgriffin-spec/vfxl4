'use client';

import { MeshGradient } from '@paper-design/shaders-react';
import { useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

// Matches the interior pages's own desktop breakpoint. Gated in JS rather than hidden with
// CSS so phones never pay for a WebGL context they will not see.
const DESKTOP = '(min-width: 900px)';

// Same shader as the homepage hero, but pitched brighter: there is no photography on
// these pages for it to sit behind, so the dark anchor colour that keeps it subtle over
// the green-screen plate would leave it barely visible here.
const defaultColors = ['#f78f21', '#f9a83f', '#b85a14', '#8bcab8', '#123028'];

export function PageHeroShader({ colors = defaultColors }: { colors?: string[] }) {
  const reduceMotion = useReducedMotion();
  const [onDesktop, setOnDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP);
    const update = () => setOnDesktop(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  if (!onDesktop) return null;

  return (
    <div className="ksb-hero-shader" aria-hidden="true">
      <MeshGradient
        className="ksb-hero-mesh"
        colors={colors}
        distortion={0.95}
        swirl={0.72}
        grainMixer={0.34}
        grainOverlay={0.18}
        speed={reduceMotion ? 0 : 0.8}
        frame={reduceMotion ? 9000 : 0}
        maxPixelCount={1600 * 700}
      />
      <div className="ksb-hero-grain" />
      <div className="ksb-hero-scrim" />
    </div>
  );
}
