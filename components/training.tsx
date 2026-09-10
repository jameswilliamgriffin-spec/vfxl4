'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { Counter } from '@/components/counter';
import { MagneticCta } from '@/components/magnetic-cta';
import { PageHeroShader } from '@/components/page-hero-shader';
import { ScrambleText } from '@/components/scramble-text';
import { SectionRule } from '@/components/section-rule';
import { SESSION_LENGTH, trainingSessions } from '@/lib/training-data';

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
  const active = trainingSessions[activeIndex];
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
      <SectionRule />
      <div className="training-hero">
        <PageHeroShader colors={shaderColors} />
        <motion.div className="pm-header training-hero-copy" {...reveal}>
          <ScrambleText className="pm-eyebrow" text="TRAINING" />
          <h2>On programme training.</h2>
          <p>
            Eight taught sessions cover the core knowledge a production cannot be relied on to teach you in
            the right order — the principles under the craft, mapped to the standard you are assessed
            against, taught alongside your workplace projects.
          </p>
          <MagneticCta href={TRAINING_PAGE}>
            Explore the training
            <i aria-hidden="true">{'↗︎'}</i>
          </MagneticCta>
        </motion.div>
      </div>

      <div className="training-system">
        <div className="training-header">
          <span>SESSION INDEX</span>
          <span><Counter value={8} pad={2} /> SESSIONS</span>
        </div>

        <div className="training-list">
          {trainingSessions.map((session, index) => (
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
              <span className="training-arrow" aria-hidden="true">{'↗︎'}</span>
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
              <span className="training-detail-scope">CORE KNOWLEDGE · {SESSION_LENGTH}</span>
              <h3>{active.title}</h3>
              <span className="training-sub">{active.subtitle}</span>
              <p>{active.summary}</p>
              <div className="training-ksb" aria-label="Criteria covered">
                {active.knowledge.map((code) => (
                  <span key={code} className="duty-chip duty-chip-K">{code}</span>
                ))}
                {active.skills.map((code) => (
                  <span key={code} className="duty-chip duty-chip-S">{code}</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
