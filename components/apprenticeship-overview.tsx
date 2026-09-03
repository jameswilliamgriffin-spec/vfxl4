'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

// Pathway summaries are plain-English overviews grounded in ST1325 v1.2 (occupation
// summary and option specialist responsibilities). NOTE: `number` is our own public
// facing pathway number, in display order. The standard itself calls these "options"
// and numbers them differently: Option 1 = 2D, Option 2 = ATD, Option 3 = CG/3D.
const pathways = [
  {
    number: '01',
    title: 'Junior VFX Artist',
    specialism: '2D',
    tags: ['COMPOSITING', 'ROTO', 'IMAGE CRAFT'],
    image: '/assets/academy-spacesuit.jpg',
    alt: 'A performer suspended on wires in front of a green screen on a Viridian Academy production',
    summary:
      'Prepares the elements that make up a finished shot. You trace and mask objects frame by frame, pull keys from green screen, paint out rigs and wires, and layer live action with computer-generated imagery so the result reads as one image caught by a single camera. A craft built on composition and colour.',
  },
  {
    number: '02',
    title: 'Junior VFX Artist',
    specialism: 'CG / 3D',
    tags: ['MODELLING', 'SURFACE', 'CG CRAFT'],
    image: '/assets/academy-mocap-vr.jpg',
    alt: 'A performer in a motion-capture suit and head-mounted camera being directed at Viridian Academy',
    summary:
      'Builds what was never filmed. You model the props, environments and characters that appear in the final shot, and use on-set data and tracking markers to match the camera so those assets sit convincingly in the plate. A craft built on sculpting, cameras and storytelling.',
  },
  {
    number: '03',
    title: 'Assistant Technical Director',
    specialism: 'VFX',
    tags: ['PIPELINE', 'CODE', 'TECHNICAL CRAFT'],
    image: '/assets/academy-mocap-wide.jpg',
    alt: 'A motion-capture volume at Viridian Academy, with technical operators at workstations',
    summary:
      'Keeps the production running underneath the artwork. You support and troubleshoot the pipeline and workflow tools, give technical help to people in the creative departments, manage data and resources, and write small-scale tools to solve the problems that keep recurring.',
  },
];

export function ApprenticeshipOverview() {
  const reduceMotion = useReducedMotion();
  const [activePathway, setActivePathway] = useState(0);
  const active = pathways[activePathway];
  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 42 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.8, ease } };

  return (
    <section id="overview" className="overview grid-field">
      <div className="discipline-strip" aria-hidden="true">
        <span>VISUAL EFFECTS</span><i />
        <span>COMPOSITING</span><i />
        <span>CG + 3D</span><i />
        <span>PIPELINE</span><i />
        <span>PRODUCTION</span><i />
        <span>EMERGING TECHNOLOGY</span>
      </div>

      <motion.div className="overview-heading" {...reveal}>
        <TechLabel label="PROGRAMME OVERVIEW" />
        <h2>BUILT AROUND<br /><span>THE WORK.</span></h2>
        <p className="overview-definition">
          A Level 4 apprenticeship for people starting a career in visual effects — developing the craft, technical confidence and production behaviours needed to contribute to a professional VFX team.
        </p>
        <aside>
          <span>3 PATHWAYS</span>
          <p>One shared occupational standard. Three specialist routes through the programme.</p>
        </aside>
      </motion.div>

      <div id="pathways" className="pathway-system">
        <motion.div className="pathway-intro" {...reveal}>
          <h2>Three specialist<br /><span>pathways.</span></h2>
          <p>
            You don&apos;t need to choose upfront. Your specialist pathway is settled once you are on
            the apprenticeship and you have found what you are good at, alongside the VFX specialism
            of your employer.
          </p>
        </motion.div>
        <div className="pathway-header">
          <span>PATHWAY SELECTOR</span><span>03 PATHWAYS</span><span>HOVER / FOCUS TO INSPECT</span>
        </div>
        <div className="pathway-list">
          {pathways.map((pathway, index) => (
            <motion.button
              type="button"
              key={pathway.number}
              className={activePathway === index ? 'is-active' : ''}
              aria-pressed={activePathway === index}
              onMouseEnter={() => setActivePathway(index)}
              onFocus={() => setActivePathway(index)}
              onClick={() => setActivePathway(index)}
              {...(reduceMotion ? {} : { initial: { opacity: 0, x: -28 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, amount: 0.55 }, transition: { duration: 0.65, delay: index * 0.08, ease } })}
            >
              <span className="pathway-number">{pathway.number}</span>
              <span className="pathway-name">{pathway.title}<strong>{pathway.specialism}</strong></span>
              <span className="pathway-tags">{pathway.tags.map((tag) => <i key={tag}>{tag}</i>)}</span>
              <span className="pathway-arrow" aria-hidden="true">{'↗︎'}</span>
            </motion.button>
          ))}
        </div>
        <div className="pathway-visual">
          <div className="pathway-frame">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.image}
                src={active.image}
                alt={active.alt}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.05, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)' }}
                exit={reduceMotion ? {} : { opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                transition={{ duration: 0.55, ease }}
              />
            </AnimatePresence>
            <div className="pathway-grade" aria-hidden="true" />
            <div className="visual-index"><span>PATHWAY</span><strong>{active.number}</strong><i /></div>
            <div className="visual-coordinates" aria-hidden="true">
              <span><i>VIRIDIAN FX</i>53.9591° N&nbsp;&nbsp;/&nbsp;&nbsp;1.0815° W</span>
              <span><i>CREATIVE ALLIANCE</i>52.4862° N&nbsp;&nbsp;/&nbsp;&nbsp;1.8904° W</span>
            </div>
            <div className="frame-corners" aria-hidden="true"><i /><i /><i /><i /></div>
          </div>
          <div className="pathway-detail">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.number}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease }}
              >
                <span className="detail-eyebrow">PATHWAY {active.number} / {active.specialism}</span>
                <h3>{active.title}</h3>
                <p>{active.summary}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="overview-end">
        <span>END / FIRST-PASS SCOPE</span>
      </div>
    </section>
  );
}

function TechLabel({ label }: { label: string }) {
  return <div className="tech-label"><i /><span>{label}</span></div>;
}
