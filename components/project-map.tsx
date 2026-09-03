'use client';

import { motion, useReducedMotion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

// The dedicated projects page the main nav points at. Kept in one place so the
// button and the nav item can be repointed together.
export const PROJECTS_PAGE = '/projects';

// Titles come from APPRENTICESHIP_PROJECT_FRAMEWORK.md. The framework treats
// Projects 1-10 as an opportunity bank rather than a sequence, which is what the
// loose scatter and drift are meant to communicate. `href` is unset until the
// project pages exist; supplying one turns a card into a real link.
type Project = { number: string; title: string; href?: string; x: number; y: number };

const introProject = {
  tag: 'START',
  label: 'Introductory Project',
  title: 'Inside the VFX Pipeline: Industry, Studio, Role and Professional Practice',
  note: 'Completed near the beginning of the programme.',
  href: undefined as string | undefined,
};

const finalProject = {
  tag: 'FINAL',
  label: 'Final Major Project',
  title: 'A pathway-specific capstone in 2D, CG/3D or ATD',
  note: 'Completed before gateway. Not the EPA project.',
  href: undefined as string | undefined,
};

// Laid out 3-4-3, so the block is widest through the middle and the silhouette still
// reads as an oval, but the centre is occupied rather than hollow. Three rows is also
// far shorter than a ring, which kept the section taller than it needed to be.
const projects: Project[] = [
  { number: '01', title: 'Script Breakdown and VFX Requirements', x: 25.5, y: 13 },
  { number: '02', title: 'Concept Development, Storyboarding and R&D', x: 50, y: 13 },
  { number: '03', title: 'Previsualisation and Virtual Planning', x: 74.5, y: 13 },
  { number: '04', title: 'Principal Photography and Production Data Capture', x: 13, y: 50 },
  { number: '05', title: 'Responsible AI-Assisted Image Development', x: 38, y: 50 },
  { number: '06', title: 'Compositing Workflows', x: 62, y: 50 },
  { number: '07', title: 'CG and Experimental VFX Production', x: 87, y: 50 },
  { number: '08', title: 'Collaborative Delivery and Response to Feedback', x: 25.5, y: 87 },
  { number: '09', title: 'Deliverables, File Management and Version Control', x: 50, y: 87 },
  { number: '10', title: 'Editorial Workflow and Change Management', x: 74.5, y: 87 },
];

/**
 * An explicit edge list rather than nearest-neighbour matching: the eight outer cards
 * form a closed loop (the oval), and 04-05-06-07 threads the two middle cards onto it.
 * Kept sparse and hand-picked so no card has several links arriving at once, which is
 * what made the earlier mesh read as doubled lines.
 */
const LINKS: [string, string][] = [
  ['01', '02'], ['02', '03'], ['03', '07'], ['07', '10'],
  ['10', '09'], ['09', '08'], ['08', '04'], ['04', '01'],
  ['04', '05'], ['05', '06'], ['06', '07'],
];

const byNumber = new Map(projects.map((p) => [p.number, p]));
const links = LINKS.map(([from, to]) => {
  const a = byNumber.get(from)!;
  const b = byNumber.get(to)!;
  return { key: `${from}-${to}`, x1: a.x, y1: a.y, x2: b.x, y2: b.y };
});

// Each card gets its own period, delay and radius so the field never pulses in sync.
// Amplitudes stay <=5px: the tightest gap between two cards is 15.6px, so even two
// cards orbiting straight at each other (max closure 10px) cannot touch.
const drift = [
  { dur: 17, delay: 0, dx: 5, dy: 4 },
  { dur: 21, delay: -3, dx: 4, dy: 5 },
  { dur: 19, delay: -7, dx: 5, dy: 4.5 },
  { dur: 23, delay: -2, dx: 4.5, dy: 5 },
  { dur: 18, delay: -9, dx: 5, dy: 4 },
  { dur: 25, delay: -5, dx: 4, dy: 4.5 },
  { dur: 20, delay: -11, dx: 4.5, dy: 5 },
  { dur: 22, delay: -1, dx: 5, dy: 4 },
  { dur: 16, delay: -6, dx: 4, dy: 5 },
  { dur: 24, delay: -13, dx: 5, dy: 4.5 },
];

/**
 * Renders a real anchor as soon as `href` is supplied, which makes the card
 * natively keyboard-focusable and applies the :focus-visible style already in the
 * stylesheet. Until then it stays a plain div: a focusable element that leads
 * nowhere would strand keyboard and screen-reader users on a dead stop.
 */
function CardShell({
  href,
  className,
  children,
}: {
  href?: string;
  className: string;
  children: React.ReactNode;
}) {
  if (href) {
    return <a className={className} href={href}>{children}</a>;
  }
  return <div className={className}>{children}</div>;
}

export function ProjectMap() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.8, ease },
      };

  return (
    <section id="projects" className="project-map">
      <div className="pm-grid-overlay" aria-hidden="true" />

      <motion.div className="pm-header" {...reveal}>
        <span className="pm-eyebrow">PROJECTS</span>
        <h2>Explore the projects.</h2>
        <p>
          A fixed start, a fixed finish, and ten workplace projects in between that can be taken in
          any order, as the right production opportunity comes up.
        </p>
        <a className="pm-cta" href={PROJECTS_PAGE}>
          Explore the projects
          <i aria-hidden="true">{'↗︎'}</i>
        </a>
      </motion.div>

      <div className="pm-map">
        <CardShell href={introProject.href} className="pm-card pm-card-anchor pm-anchor-start">
          <span className="pm-tag">{introProject.tag}</span>
          <span className="pm-label">{introProject.label}</span>
          <span className="pm-anchor-title">{introProject.title}</span>
          <span className="pm-note">{introProject.note}</span>
        </CardShell>

        <ul className="pm-field">
          <span className="pm-lead pm-lead-start" aria-hidden="true" />
          <span className="pm-lead pm-lead-final" aria-hidden="true" />
          <svg className="pm-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {links.map((l) => (
              <line key={l.key} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          {projects.map((project, index) => (
            <li
              key={project.number}
              className="pm-node"
              style={
                {
                  left: `${project.x}%`,
                  top: `${project.y}%`,
                  '--dur': `${drift[index].dur}s`,
                  '--delay': `${drift[index].delay}s`,
                  '--dx': `${drift[index].dx}px`,
                  '--dy': `${drift[index].dy}px`,
                } as React.CSSProperties
              }
            >
              <div className="pm-orbit">
                <CardShell href={project.href} className="pm-card pm-card-float">
                  <span className="pm-num">{project.number}</span>
                  <span className="pm-title">{project.title}</span>
                </CardShell>
              </div>
            </li>
          ))}
        </ul>

        <CardShell href={finalProject.href} className="pm-card pm-card-anchor pm-anchor-final">
          <span className="pm-tag">{finalProject.tag}</span>
          <span className="pm-label">{finalProject.label}</span>
          <span className="pm-anchor-title">{finalProject.title}</span>
          <span className="pm-note">{finalProject.note}</span>
        </CardShell>
      </div>
    </section>
  );
}
