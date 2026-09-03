'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

const pathways = [
  {
    number: '01',
    title: 'Junior VFX Artist',
    option: '2D',
    tags: ['COMPOSITING', 'ROTO', 'IMAGE CRAFT'],
    image: '/assets/academy-clapper.jpg',
    alt: 'A clapper board on a Viridian Academy production set',
  },
  {
    number: '02',
    title: 'Junior VFX Artist',
    option: 'CG / 3D',
    tags: ['MODELLING', 'SURFACE', 'CG CRAFT'],
    image: '/assets/academy-spacesuit.jpg',
    alt: 'A performer in a spacesuit on a Viridian Academy production',
  },
  {
    number: '03',
    title: 'Assistant Technical Director',
    option: 'VFX',
    tags: ['PIPELINE', 'CODE', 'TECHNICAL CRAFT'],
    image: '/assets/academy-mocap-vr.jpg',
    alt: 'Virtual reality and motion-capture production at Viridian Academy',
  },
];

const programmeStages = [
  {
    id: 'projects',
    number: '01',
    eyebrow: 'LEARN THROUGH DELIVERY',
    title: 'Workplace projects',
    text: 'Apply new knowledge and skills to live production challenges, building credible evidence through the work itself.',
  },
  {
    id: 'training',
    number: '02',
    eyebrow: 'BUILD THE PRACTICE',
    title: 'Training',
    text: 'Structured learning connects creative craft, technical fluency and professional behaviours to your chosen pathway.',
  },
  {
    id: 'epa',
    number: '03',
    eyebrow: 'DEMONSTRATE OCCUPATIONAL COMPETENCE',
    title: 'End-point assessment',
    text: 'Two complementary methods bring together a final project and the evidence developed across the programme.',
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
        <TechLabel index="01" label="PROGRAMME OVERVIEW" revision="REV 1.2" />
        <h2>BUILT AROUND<br /><span>THE WORK.</span></h2>
        <p className="overview-definition">
          A Level 4 apprenticeship for people starting a career in visual effects — developing the craft, technical confidence and production behaviours needed to contribute to a professional VFX team.
        </p>
        <aside>
          <span>SYSTEM NOTE / 01</span>
          <p>One shared occupational standard. Three specialist routes through the programme.</p>
        </aside>
      </motion.div>

      <div id="pathways" className="pathway-system">
        <div className="pathway-header">
          <span>PATHWAY SELECTOR</span><span>03 OPTIONS</span><span>HOVER / FOCUS TO INSPECT</span>
        </div>
        <div className="pathway-list">
          {pathways.map((pathway, index) => (
            <motion.button
              type="button"
              key={pathway.number}
              className={activePathway === index ? 'is-active' : ''}
              onMouseEnter={() => setActivePathway(index)}
              onFocus={() => setActivePathway(index)}
              {...(reduceMotion ? {} : { initial: { opacity: 0, x: -28 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, amount: 0.55 }, transition: { duration: 0.65, delay: index * 0.08, ease } })}
            >
              <span className="pathway-number">{pathway.number}</span>
              <span className="pathway-name">{pathway.title}<strong>{pathway.option}</strong></span>
              <span className="pathway-tags">{pathway.tags.map((tag) => <i key={tag}>{tag}</i>)}</span>
              <span className="pathway-arrow" aria-hidden="true">↗</span>
            </motion.button>
          ))}
        </div>
        <div className="pathway-visual">
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
          <div className="visual-index"><span>OPTION</span><strong>{active.number}</strong><i /></div>
          <div className="visual-coordinates" aria-hidden="true">53.9591° N&nbsp;&nbsp; / &nbsp;&nbsp;1.0815° W</div>
          <div className="frame-corners" aria-hidden="true"><i /><i /><i /><i /></div>
        </div>
      </div>

      <div className="programme-map" aria-label="Apprenticeship structure">
        <div className="map-header"><span>PROGRAMME SEQUENCE</span><span>ON-PROGRAMME → GATEWAY → EPA</span></div>
        <div className="map-rail" aria-hidden="true"><i /><i /><i /></div>
        <div className="stage-grid">
          {programmeStages.map((stage, index) => (
            <motion.article id={stage.id} key={stage.id} {...(reduceMotion ? {} : { initial: { opacity: 0, y: 34 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.45 }, transition: { duration: 0.7, delay: index * 0.1, ease } })}>
              <span className="stage-number">{stage.number}</span>
              <div><span className="stage-eyebrow">{stage.eyebrow}</span><h3>{stage.title}</h3><p>{stage.text}</p></div>
            </motion.article>
          ))}
        </div>
        <div className="epa-methods" aria-label="The two end-point assessment methods">
          <div className="epa-label"><span>EPA / TWO METHODS</span><strong>02</strong></div>
          <div><span>METHOD 01</span><strong>Project with presentation and questioning</strong></div>
          <div><span>METHOD 02</span><strong>Professional discussion underpinned by a portfolio</strong></div>
        </div>
      </div>

      <div className="overview-end">
        <span>END / FIRST-PASS SCOPE</span><span>NEXT MODULE</span><strong>PROJECTS_02</strong>
      </div>
    </section>
  );
}

function TechLabel({ index, label, revision }: { index: string; label: string; revision: string }) {
  return <div className="tech-label"><span>{index}</span><i /> <span>{label}</span><span>/</span><span>{revision}</span></div>;
}
