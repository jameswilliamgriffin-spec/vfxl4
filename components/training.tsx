'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { PageHeroShader } from '@/components/page-hero-shader';
import { trainingSections } from '@/lib/training-data';

const ease = [0.22, 1, 0.36, 1] as const;

// Orange stays the lead so the section reads as the same brand, blue is the pairing
// asked for here specifically — kept out of the rest of the site, which runs on
// orange + viridian green.
const shaderColors = ['#080d14', '#f78f21', '#f9a83f', '#2f6fd9', '#0c2b52'];

// The dedicated training page the main nav will point at.
export const TRAINING_PAGE = '/training';

export function Training() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = trainingSections[activeIndex];
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.75, ease },
      };

  return (
    <section id="training" className="training">
      <div className="training-hero">
        <PageHeroShader colors={shaderColors} />
        <motion.div className="pm-header training-hero-copy" {...reveal}>
          <span className="pm-eyebrow">TRAINING</span>
          <h2>On programme training.</h2>
          <p>
            Alongside the work itself, taught sessions cover the things a production cannot be relied on to
            teach you in the right order — the principles underneath the craft, and the practice you need
            before you meet them on a live shot.
          </p>
          <a className="pm-cta" href={TRAINING_PAGE}>
            Explore the training
            <i aria-hidden="true">↗</i>
          </a>
        </motion.div>
      </div>

      <div className="training-system">
        <div className="training-header">
          <span>SESSION INDEX</span>
          <span>08 SESSIONS</span>
        </div>

        <div className="training-list">
          {trainingSections.map((session, index) => (
            <button
              type="button"
              key={session.number}
              className={activeIndex === index ? 'is-active' : ''}
              aria-pressed={activeIndex === index}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
            >
              <span className="training-number">{session.number}</span>
              <span className="training-title">{session.title}</span>
              <span className="training-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>

        <div className="training-detail">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.number}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
            >
              <span className="training-detail-scope">
                {active.scope === 'CORE' ? 'CORE / ALL PATHWAYS' : 'VARIES BY PATHWAY'}
              </span>
              <h3>{active.title}</h3>
              <p>{active.summary}</p>
              <ul className="training-covers">
                {active.covers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
