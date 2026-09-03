'use client';

import { motion, useReducedMotion } from 'motion/react';

/**
 * The homepage's shared section-transition motion: a 1px orange line that draws
 * left-to-right along a section's top edge as it enters view. Drop it in as the
 * first child of a `position: relative` section.
 */
export function SectionRule() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      className="section-rule"
      aria-hidden="true"
      {...(reduceMotion
        ? {}
        : {
            initial: { scaleX: 0 },
            whileInView: { scaleX: 1 },
            viewport: { once: true, amount: 0.8 },
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          })}
    />
  );
}
