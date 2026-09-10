import { trainingSessions } from '@/lib/training-data';

export type PlanItem = {
  label: string;
  /** off-the-job hours attributed to this line */
  hours: number;
};

export type PlanSection = {
  /** single-letter key used in the overview and as the accordion id */
  key: string;
  title: string;
  /** one line shown when the section is expanded */
  blurb: string;
  items: PlanItem[];
};

// Total off-the-job training hours for the programme. The five section subtotals
// below are tuned to sum to exactly this figure; progress reviews sit outside it.
export const PLAN_TOTAL_HOURS = 326;
export const PROGRAMME_LENGTH = '18 months';

export const planSections: PlanSection[] = [
  {
    key: 'A',
    title: 'Core induction training',
    blurb:
      'The three induction days every Creative Alliance apprentice completes, whatever their programme.',
    items: [
      { label: 'Day 1 — Introduction to your apprenticeship', hours: 5 },
      { label: 'Day 2 — Prevent and safeguarding', hours: 5 },
      { label: 'Day 3 — Information, advice and guidance, and off-the-job learning', hours: 5 },
    ],
  },
  {
    key: 'B',
    title: 'Core knowledge sessions',
    blurb:
      'Eight taught sessions of 2.5 hours, covering the core knowledge of the occupational standard.',
    items: trainingSessions.map((session) => ({
      label: `Session ${session.number} — ${session.title}`,
      hours: 2.5,
    })),
  },
  {
    key: 'C',
    title: 'Coaching and independent development',
    blurb:
      'Structured time with your development coach, plus self-directed research and skills practice.',
    items: [
      { label: '1:2:1 sessions with your development coach', hours: 20 },
      { label: 'Independent research and skills development', hours: 56 },
    ],
  },
  {
    key: 'D',
    title: 'Portfolio and project work',
    blurb:
      'The introductory project, ten workplace projects weighted by scale, and the Final Major Project.',
    items: [
      { label: 'Introductory Project — Inside the VFX Pipeline', hours: 5 },
      { label: 'Project 01 — Script breakdown and VFX requirements', hours: 8 },
      { label: 'Project 02 — Concept development, storyboarding and R&D', hours: 10 },
      { label: 'Project 03 — Previsualisation and virtual planning', hours: 10 },
      { label: 'Project 04 — Principal photography and production data capture', hours: 10 },
      { label: 'Project 05 — Responsible AI-assisted image development', hours: 10 },
      { label: 'Project 06 — Compositing workflows', hours: 14 },
      { label: 'Project 07 — CG and experimental VFX production', hours: 14 },
      { label: 'Project 08 — Collaborative delivery and response to feedback', hours: 8 },
      { label: 'Project 09 — Deliverables, file management and version control', hours: 7 },
      { label: 'Project 10 — Editorial workflow and change management', hours: 8 },
      { label: 'Final Major Project — pathway-specific capstone (2D / CG-3D / ATD)', hours: 31 },
      { label: 'Independent portfolio learning and research', hours: 15 },
    ],
  },
  {
    key: 'E',
    title: 'Pitching, presentation and communication skills',
    blurb:
      'Developing how you present your work and yourself — pitching, presenting, communicating and interviewing.',
    items: [
      { label: 'Pitching skills', hours: 13 },
      { label: 'Presentation skills', hours: 16 },
      { label: 'Communication skills', hours: 13 },
      { label: 'Interview techniques', hours: 13 },
      { label: '1:2:1 feedback and development', hours: 10 },
    ],
  },
];

export const sectionHours = (section: PlanSection) =>
  section.items.reduce((sum, item) => sum + item.hours, 0);

export const planTotalHours = () =>
  planSections.reduce((sum, section) => sum + sectionHours(section), 0);

// Progress reviews are tracked and delivered, but are not off-the-job training,
// so they are shown alongside the plan rather than inside the total.
export const progressReviews = {
  title: 'Progress reviews',
  count: 9,
  hoursEach: 2,
  detail:
    'Nine progress reviews across the programme — one every eight weeks over 18 months, at roughly two hours each. Reviews are delivered in addition to the hours above and are not counted in the off-the-job total.',
};
