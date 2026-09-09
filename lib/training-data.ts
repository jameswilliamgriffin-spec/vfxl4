export type TrainingSession = {
  number: string;
  /** customer-facing headline */
  title: string;
  /** plain descriptor shown beneath the headline */
  subtitle: string;
  summary: string;
  /** core Knowledge criteria (ST1325 v1.2) this session covers */
  knowledge: string[];
  /** core Skills the session sets up */
  skills: string[];
  image: string;
  alt: string;
};

// Eight 2.5-hour taught sessions covering the core Knowledge of ST1325 v1.2
// (K1–K19) and the core Skills they set up (S1–S17). Each core criterion is
// mapped to exactly one session; pathway-specific taught input is delivered
// separately and is not represented here.
export const SESSION_LENGTH = '2.5 hr';

export const trainingSessions: TrainingSession[] = [
  {
    number: '01',
    title: 'Behind the Studio Doors',
    subtitle: 'Industry, standards and confidentiality',
    summary:
      'How the VFX industry actually works — its terminology, standards and workflows — and the trust that comes with the job: why studios guard their material, and the confidentiality, copyright and IP rules that apply to everything you touch.',
    knowledge: ['K1', 'K4'],
    skills: ['S6'],
    image: '/assets/academy-clapper.jpg',
    alt: 'A crew member holding a clapperboard on a Viridian Academy production stage',
  },
  {
    number: '02',
    title: 'The Life of a Shot',
    subtitle: 'The production pipeline, end to end',
    summary:
      'Follow a single shot from script and shoot, through editorial, VFX and grading, and the VFX pipeline running alongside it — bidding, turn-over, briefing, dailies, client reviews and delivery. The whole picture, not just your part of it.',
    knowledge: ['K2', 'K5'],
    skills: ['S5', 'S13'],
    image: '/assets/academy-greenscreen-stage.png',
    alt: 'A wide view of a green-screen production stage with crew and camera equipment',
  },
  {
    number: '03',
    title: 'Where the Work Lives',
    subtitle: 'Systems, storage and data',
    summary:
      'The machinery under the artwork: the computers and networks in a VFX facility, and how assets move through production, shared, nearline and archive storage — on site or in the cloud — with their data intact.',
    knowledge: ['K12', 'K13'],
    skills: ['S15'],
    image: '/assets/academy-mocap-wide.jpg',
    alt: 'Technical operators working beside a motion-capture volume at Viridian Academy',
  },
  {
    number: '04',
    title: 'Don’t Break the Pipeline',
    subtitle: 'File discipline and source quality',
    summary:
      'The unglamorous habits that keep a whole production moving: naming conventions, file formats and version control, what goes wrong when they slip, and how to protect the quality of the original plate as it passes through your hands.',
    knowledge: ['K3', 'K6'],
    skills: ['S3', 'S12'],
    image: '/assets/epa-portfolio-evidence.jpg',
    alt: 'A VFX artist reviewing image work and a node graph on a production monitor',
  },
  {
    number: '05',
    title: 'Reading Between the Lines',
    subtitle: 'Reading a brief and planning the work',
    summary:
      'Turning a supervisor or client brief into a plan: working out what the shot really needs, choosing an approach and a schedule, knowing what the departments downstream expect from you, and building in the checkpoints to catch problems while there is still time.',
    knowledge: ['K7', 'K8', 'K14'],
    skills: ['S7', 'S10', 'S11', 'S16'],
    image: '/assets/epa-project-work.jpg',
    alt: 'A VFX artist working across two production monitors',
  },
  {
    number: '06',
    title: 'Fooling the Eye',
    subtitle: 'Image fundamentals — optics, perspective and colour',
    summary:
      'Why a composite reads as one image. How lenses behave and the marks they leave — distortion, parallax, overscan — and the principles of perspective, depth of field, scale, composition, light and colour that make it believable.',
    knowledge: ['K9', 'K10', 'K11'],
    skills: ['S9', 'S14'],
    image: '/assets/academy-spacesuit.jpg',
    alt: 'A performer in a spacesuit suspended in front of a green screen',
  },
  {
    number: '07',
    title: 'Reference Is Everything',
    subtitle: 'Reference, intent and research',
    summary:
      'Before you make anything: what is this asset for, and what should it look like? Creating work that serves the story and the shot, and researching it properly — credible sources, solid reference, and the assets that already exist.',
    knowledge: ['K15', 'K17'],
    skills: ['S1', 'S8'],
    image: '/assets/academy-mocap-vr.jpg',
    alt: 'A performer in a motion-capture suit and head-mounted camera being directed at Viridian Academy',
  },
  {
    number: '08',
    title: 'When It Doesn’t Render',
    subtitle: 'Rendering, optimisation and troubleshooting',
    summary:
      'Getting work out of the machine efficiently, and knowing what to do when it comes back wrong. Render passes and why the composite needs them, reading a production’s rendering requirements and optimising to hit them, and choosing — and bending — software to solve the problem in front of you.',
    knowledge: ['K16', 'K18', 'K19'],
    skills: ['S2', 'S4', 'S17'],
    image: '/assets/academy-mocap-wide.jpg',
    alt: 'A wide motion-capture studio with technical operators at workstations',
  },
];
