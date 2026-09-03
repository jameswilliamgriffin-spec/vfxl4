'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';
import { trainingSections } from '@/lib/training-data';

const ease = [0.22, 1, 0.36, 1] as const;

export function TrainingBrowser() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = trainingSections[activeIndex];

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const destinations: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: trainingSections.length - 1,
    };
    const requested = destinations[event.key];
    if (requested === undefined) return;

    event.preventDefault();
    const next = (requested + trainingSections.length) % trainingSections.length;
    setActiveIndex(next);
    buttonRefs.current[next]?.focus();
  }

  return (
    <section className="training-page-content" aria-labelledby="training-sections-heading">
      <h2 id="training-sections-heading" className="sr-only">
        Training sections
      </h2>
      <div className="pathway-system training-page-system">
        <div className="pathway-header">
          <span>TRAINING SELECTOR</span>
          <span>08 SECTIONS</span>
          <span>HOVER / FOCUS TO INSPECT</span>
        </div>

        <div className="pathway-list training-page-list" role="tablist" aria-label="Training sections" aria-orientation="vertical">
          {trainingSections.map((section, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.button
                ref={(node) => {
                  buttonRefs.current[index] = node;
                }}
                id={`training-tab-${section.number}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="training-section-panel"
                tabIndex={isActive ? 0 : -1}
                key={section.number}
                className={isActive ? 'is-active' : ''}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                {...(reduceMotion
                  ? {}
                  : {
                      initial: { opacity: 0, x: -24 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true, amount: 0.55 },
                      transition: { duration: 0.55, delay: index * 0.045, ease },
                    })}
              >
                <span className="pathway-number">{section.number}</span>
                <span className="pathway-name">
                  {section.title}
                  <strong>
                    {section.scope === 'CORE' ? 'CORE / ALL PATHWAYS' : 'PATHWAY DEVELOPMENT'}
                  </strong>
                </span>
                <span className="pathway-arrow" aria-hidden="true">
                  {'↗︎'}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div
          id="training-section-panel"
          className="pathway-visual training-page-visual"
          role="tabpanel"
          aria-labelledby={`training-tab-${active.number}`}
          tabIndex={0}
        >
          <div className="pathway-frame training-page-frame">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${active.number}-${active.image}`}
                src={active.image}
                alt={active.alt}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, scale: 1.05, clipPath: 'inset(0 0 100% 0)' }
                }
                animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)' }}
                exit={
                  reduceMotion
                    ? {}
                    : { opacity: 0, clipPath: 'inset(100% 0 0 0)' }
                }
                transition={{ duration: 0.55, ease }}
              />
            </AnimatePresence>
            <div className="pathway-grade" aria-hidden="true" />
            <div className="visual-index">
              <span>TRAINING</span>
              <strong>{active.number}</strong>
              <i />
            </div>
            <div className="visual-coordinates" aria-hidden="true">
              <span>
                <i>VIRIDIAN FX</i>53.9591° N&nbsp;&nbsp;/&nbsp;&nbsp;1.0815° W
              </span>
              <span>
                <i>CREATIVE ALLIANCE</i>52.4862° N&nbsp;&nbsp;/&nbsp;&nbsp;1.8904° W
              </span>
            </div>
            <div className="frame-corners" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="pathway-detail training-page-detail">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.number}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease }}
              >
                <span className="detail-eyebrow">
                  TRAINING {active.number} /{' '}
                  {active.scope === 'CORE' ? 'CORE' : 'PATHWAY'}
                </span>
                <h3>{active.title}</h3>
                <p>{active.summary}</p>
                <ul className="training-page-covers">
                  {active.covers.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
