export type TrainingSection = {
  number: string;
  scope: 'CORE' | 'PATHWAY';
  title: string;
  summary: string;
  covers: string[];
  image: string;
  alt: string;
};

// Drawn from the project's planned taught input: these sessions address concepts
// that workplace production cannot be relied upon to provide in the right order.
export const trainingSections: TrainingSection[] = [
  {
    number: '01',
    scope: 'CORE',
    title: 'Industry, law and confidentiality',
    summary:
      'The ground rules of working on other people’s material: what you may keep, share, show and reuse, and why studios guard it so closely.',
    covers: [
      'Legal and regulatory principles',
      'Copyright and intellectual property',
      'Confidentiality and data security',
    ],
    image: '/assets/academy-clapper.jpg',
    alt: 'A crew member holding a clapperboard on a Viridian Academy production stage',
  },
  {
    number: '02',
    scope: 'CORE',
    title: 'The production lifecycle',
    summary:
      'How a shot travels from script and shoot through editorial, VFX and grading — the whole pipeline, not just the part you happen to sit in.',
    covers: [
      'Departments, handovers and dependencies',
      'Bidding, turnover and delivery',
      'The wider VFX industry beyond one employer',
    ],
    image: '/assets/academy-greenscreen-stage.png',
    alt: 'A wide view of a green-screen production stage with crew and camera equipment',
  },
  {
    number: '03',
    scope: 'CORE',
    title: 'Systems, storage and data security',
    summary:
      'The machinery underneath the artwork: where files live, how they move, and what keeps a production’s data intact and secure.',
    covers: [
      'Computer systems and IP networks',
      'Shared, nearline, cloud and archive storage',
      'Data integrity and secure handling',
    ],
    image: '/assets/academy-mocap-wide.jpg',
    alt: 'Technical operators working beside a motion-capture volume at Viridian Academy',
  },
  {
    number: '04',
    scope: 'CORE',
    title: 'Image fundamentals',
    summary:
      'Why an image reads as believable. The optics and craft principles that sit behind every integration decision you will make.',
    covers: [
      'Perspective, depth of field and scale',
      'Composition, light and colour',
      'Lens behaviour and plate artefacts',
    ],
    image: '/assets/academy-spacesuit.jpg',
    alt: 'A performer in a spacesuit suspended in front of a green screen',
  },
  {
    number: '05',
    scope: 'CORE',
    title: 'Rendering, optimisation and troubleshooting',
    summary:
      'Getting work out of the machine efficiently, and knowing what to do when it does not come out the way it should.',
    covers: [
      'Render passes and settings',
      'Asset and scene optimisation',
      'Diagnosing and escalating technical faults',
    ],
    image: '/assets/epa-project-work.jpg',
    alt: 'A VFX artist working across two production monitors',
  },
  {
    number: '06',
    scope: 'CORE',
    title: 'Research and responsible AI',
    summary:
      'How to evaluate a new tool properly, and how to use AI-assisted techniques without putting client material, copyright or quality at risk.',
    covers: [
      'Credible sources and research quality',
      'Evaluating emerging technology',
      'Approved, provenance-aware AI use',
    ],
    image: '/assets/epa-portfolio-evidence.jpg',
    alt: 'A VFX artist reviewing image work and a node graph on a production monitor',
  },
  {
    number: '07',
    scope: 'PATHWAY',
    title: 'Colour management and the VFX colour pipeline',
    summary:
      'Colour handled properly from acquisition through to delivery — the area where small misunderstandings cause the most expensive mistakes.',
    covers: [
      'Linear, gamma and logarithmic values',
      'High and low dynamic range',
      'Working spaces, balance and look grades',
    ],
    image: '/assets/academy-mocap-vr.jpg',
    alt: 'A motion-capture performer being directed under production lighting',
  },
  {
    number: '08',
    scope: 'PATHWAY',
    title: 'Specialist craft workshops',
    summary:
      'Focused practical sessions on your own pathway, covering the techniques workplace projects cannot always be relied on to provide.',
    covers: [
      '2D: roto, keying, paint and integration',
      'CG/3D: tracking, modelling, layout and lighting',
      'ATD: data, scripting and pipeline support',
    ],
    image: '/assets/academy-mocap-wide.jpg',
    alt: 'A wide motion-capture studio with performers and technical operators',
  },
];
