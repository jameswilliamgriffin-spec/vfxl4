// End-point assessment content for ST1325 v1.2, taken from the EPA plan.
// Timings, question counts, grading rules and notice periods are compliance-sensitive
// and are reproduced from that plan rather than summarised loosely.

export const EPA_REF = 'ST1325 v1.2';

export type EpaMethod = {
  number: string;
  id: string;
  title: string;
  image: string;
  alt: string;
  summary: string;
  facts: { label: string; value: string }[];
  detail: string[];
  grades: string;
};

export const epaMethods: EpaMethod[] = [
  {
    number: '01',
    id: 'project',
    title: 'Project with presentation and questioning',
    image: '/assets/epa-project-work.jpg',
    alt: 'An apprentice at a two-screen workstation, building a ruined street environment alongside a 3D scene view',
    summary:
      'A significant, defined piece of work with a real business application, presented to an independent assessor and then questioned on it.',
    facts: [
      { label: 'Two components', value: 'Project output, then presentation with questions' },
      { label: 'Presentation and questions', value: '50 minutes — typically 20 presenting, 30 questioning' },
      { label: 'Questions', value: 'At least 5, with follow-ups allowed' },
      { label: 'Starts', value: 'After gateway; title and scope signed off by the EPAO at gateway' },
      { label: 'Notice', value: 'At least 2 days before the presentation' },
    ],
    detail: [
      'For 2D and CG/3D, the product is a VFX shot and breakdown: a completed shot or sequence typically lasting 15-20 seconds, plus a breakdown explaining the technical and creative approach taken.',
      'For ATD, the product is a small-scale tool developed from a brief, together with a development roadmap and a report on the tool’s roll-out and usage.',
      'You may work as part of a team, but the product and presentation must be completed unaided and must reflect your own role and contribution. You and your employer confirm this on submission.',
      'The project maps, in an appendix, how it evidences the KSBs assigned to this method.',
    ],
    grades: 'Fail · Pass · Distinction',
  },
  {
    number: '02',
    id: 'discussion',
    title: 'Professional discussion underpinned by a portfolio',
    image: '/assets/epa-portfolio-evidence.jpg',
    alt: 'A rotoscope shape being drawn around a walking figure in compositing software, with the node graph below',
    summary:
      'A formal two-way conversation with an independent assessor, drawing on the portfolio of evidence you build up across the programme.',
    facts: [
      { label: 'Format', value: 'Formal two-way conversation with an independent assessor' },
      { label: 'Length', value: '60 minutes' },
      { label: 'Questions', value: 'At least 10, with follow-ups allowed' },
      { label: 'Portfolio', value: 'Typically 15 discrete pieces of evidence' },
      { label: 'Notice', value: '10 days before the discussion' },
    ],
    detail: [
      'The portfolio is not graded on its own. It underpins the discussion: the independent assessor reviews it beforehand to choose the questions they will ask.',
      'It must not contain reflective accounts or self-assessment. Evidence should be the work itself, produced during the on-programme period and attributable to you.',
      'This method covers the parts of the occupation that are hard to observe directly, or that happen in restricted and confidential settings.',
      'It can be held at the EPAO’s or employer’s premises, or by video conference, in a quiet room free from distraction.',
    ],
    grades: 'Fail · Pass · Distinction',
  },
];

export const epaStages = [
  {
    number: '01',
    title: 'On-programme',
    duration: 'Typically 18 months',
    text: 'You train towards the KSBs, work towards English and maths in line with the funding rules, and build your portfolio of evidence as you go.',
  },
  {
    number: '02',
    title: 'Gateway',
    duration: 'The handover point',
    text: 'Your employer confirms you have attained sufficient KSBs. You confirm you are ready, have achieved English and maths, and submit your gateway evidence to the EPAO.',
  },
  {
    number: '03',
    title: 'End-point assessment',
    duration: 'Typically 3 months',
    text: 'Both assessment methods are completed and graded independently, then combined into a single overall grade for the apprenticeship.',
  },
];

/** How the two method grades combine, reproduced from the EPA plan's grading table. */
export const gradeCombinations: { project: string; discussion: string; overall: string }[] = [
  { project: 'Fail', discussion: 'Fail', overall: 'Fail' },
  { project: 'Pass', discussion: 'Pass', overall: 'Pass' },
  { project: 'Pass', discussion: 'Distinction', overall: 'Merit' },
  { project: 'Distinction', discussion: 'Pass', overall: 'Merit' },
  { project: 'Distinction', discussion: 'Distinction', overall: 'Distinction' },
];

export const resitRules = [
  { label: 'Re-sit timeframe', value: 'Typically 3 months' },
  { label: 'Re-take timeframe', value: 'Typically 4 months' },
  { label: 'Grade cap', value: 'Re-sits and re-takes are capped at pass' },
];
