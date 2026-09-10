'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';
import { Counter } from '@/components/counter';
import { ksbs } from '@/lib/ksb-data';
import { SESSION_LENGTH, trainingSessions } from '@/lib/training-data';

const ease = [0.22, 1, 0.36, 1] as const;

// Full official ST1325 wording, keyed by code, for the expanded criteria list.
const ksbById = new Map(ksbs.map((k) => [k.id, k]));
const fullText = (codes: string[]) =>
  codes.map((id) => ({ id, text: ksbById.get(id)?.text ?? '' }));

export function TrainingBrowser() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  // Click peels the image away and reveals the full breakdown. Clicking the
  // active session again collapses it; clicking another switches and stays open.
  const [expanded, setExpanded] = useState(false);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = trainingSessions[activeIndex];

  // Hover / focus only previews while collapsed.
  function preview(index: number) {
    if (!expanded) setActiveIndex(index);
  }

  // On mobile the panel sits below the full list, so bring it into view on open.
  function revealPanel() {
    if (typeof window === 'undefined' || window.innerWidth > 760) return;
    requestAnimationFrame(() =>
      panelRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      }),
    );
  }

  function selectOrToggle(index: number) {
    if (index === activeIndex) {
      setExpanded((v) => {
        if (!v) revealPanel();
        return !v;
      });
    } else {
      setActiveIndex(index);
      setExpanded(true);
      revealPanel();
    }
  }

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const destinations: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: trainingSessions.length - 1,
    };
    const requested = destinations[event.key];
    if (requested === undefined) return;

    event.preventDefault();
    const next = (requested + trainingSessions.length) % trainingSessions.length;
    setActiveIndex(next);
    buttonRefs.current[next]?.focus();
  }

  return (
    <section className="training-page-content" aria-labelledby="training-sessions-heading">
      <h2 id="training-sessions-heading" className="sr-only">
        Training sessions
      </h2>
      <div className="pathway-system training-page-system">
        <div className="pathway-header">
          <span>SESSION SELECTOR</span>
          <span><Counter value={8} pad={2} /> SESSIONS</span>
          <span>CLICK TO OPEN</span>
        </div>

        <div className="pathway-list training-page-list" role="tablist" aria-label="Training sessions" aria-orientation="vertical">
          {trainingSessions.map((session, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.button
                ref={(node) => {
                  buttonRefs.current[index] = node;
                }}
                id={`training-tab-${session.number}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-expanded={isActive && expanded}
                aria-controls="training-section-panel"
                tabIndex={isActive ? 0 : -1}
                key={session.number}
                className={isActive ? 'is-active' : ''}
                onMouseEnter={() => preview(index)}
                onFocus={() => preview(index)}
                onClick={() => selectOrToggle(index)}
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
                <span className="pathway-number">{session.number}</span>
                <span className="pathway-name">
                  {session.title}
                  <strong>{session.subtitle}</strong>
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
          ref={panelRef}
          className={`pathway-visual training-page-visual${expanded ? ' is-expanded' : ''}`}
          role="tabpanel"
          aria-labelledby={`training-tab-${active.number}`}
          tabIndex={0}
        >
          <div className="pathway-frame training-page-frame" aria-hidden={expanded || undefined}>
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
              <span>SESSION</span>
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
                  SESSION {active.number} · CORE KNOWLEDGE · {SESSION_LENGTH}
                </span>
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

          <div className="training-breakdown-wrap">
            <div className="training-breakdown" inert={!expanded}>
              <motion.div
                key={active.number}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease }}
              >
                <p className="tb-label">What this session covers</p>
                <ul className="tb-covers">
                  {active.covers.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="tb-label">Knowledge criteria</p>
                <dl className="tb-criteria">
                  {fullText(active.knowledge).map(({ id, text }) => (
                    <div key={id}>
                      <dt className="tb-code tb-code-K">{id}</dt>
                      <dd>{text}</dd>
                    </div>
                  ))}
                </dl>

                <p className="tb-label">Skills criteria</p>
                <dl className="tb-criteria">
                  {fullText(active.skills).map(({ id, text }) => (
                    <div key={id}>
                      <dt className="tb-code tb-code-S">{id}</dt>
                      <dd>{text}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
