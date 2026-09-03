'use client';

import type { ReactNode } from 'react';
import { useMagnetic } from '@/hooks/use-magnetic';

/**
 * The site's primary "explore" pill (.pm-cta), with a very restrained magnetic
 * pull: as the cursor nears, the label + arrow ease a few pixels toward it and
 * spring back. The <a> hitbox never moves.
 */
export function MagneticCta({ href, children }: { href: string; children: ReactNode }) {
  const { ref, innerRef } = useMagnetic<HTMLAnchorElement, HTMLSpanElement>({
    radius: 80,
    strength: 0.22,
    max: 4,
  });

  return (
    <a className="pm-cta" href={href} ref={ref}>
      <span className="pm-cta-inner" ref={innerRef}>
        {children}
      </span>
    </a>
  );
}
