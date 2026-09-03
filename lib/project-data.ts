export type ProjectSpecialismId = '2d' | 'cg3d' | 'atd';

export type ProjectDetail = {
  id: string;
  number: string;
  tabLabel: string;
  title: string;
  overview: string;
  download: string;
  image: string;
  alt: string;
  specialism?: string;
};

export type ProjectStage = ProjectDetail & {
  variants?: ProjectDetail[];
};

const downloadRoot = '/downloads/projects';
const imageRoot = '/assets/projects';

export const projectStages: ProjectStage[] = [
  {
    id: 'introduction',
    number: '00',
    tabLabel: 'Introduction',
    title: 'Inside the VFX Pipeline',
    overview:
      'Investigate the VFX industry, your organisation, the specialist pathways into the profession and the production pipeline in which you work. Research, workplace observation and conversations with colleagues come together in a structured presentation that establishes the professional and technical context for the rest of the apprenticeship.',
    download: `${downloadRoot}/00-inside-the-vfx-pipeline-introductory-project.docx`,
    image: `${imageRoot}/project-00-inside-vfx-pipeline.webp`,
    alt: 'A junior VFX apprentice discussing a production pipeline with an experienced compositor at a studio workstation',
  },
  {
    id: 'script-breakdown',
    number: '01',
    tabLabel: 'Script breakdown',
    title: 'Script Breakdown & VFX Requirements',
    overview:
      'Undertake a VFX breakdown of a genuine or representative production brief. You will translate creative requirements into practical VFX needs, identify dependencies and missing information, communicate potential challenges and keep the breakdown current when requirements change.',
    download: `${downloadRoot}/01-script-breakdown-and-vfx-requirements.docx`,
    image: `${imageRoot}/project-01-script-breakdown.webp`,
    alt: 'A junior artist and producer reviewing a script, storyboards and a shot breakdown around a studio table',
  },
  {
    id: 'concept-development',
    number: '02',
    tabLabel: 'Concept & R&D',
    title: 'Concept Development, Storyboarding & R&D',
    overview:
      'Respond to a production requirement through research, idea development and appropriate R&D. You will test more than one approach where suitable, evaluate their strengths and limitations, and use evidence to select a viable creative or technical direction.',
    download: `${downloadRoot}/02-concept-development-storyboarding-and-rd.docx`,
    image: `${imageRoot}/project-02-concept-development-rd.webp`,
    alt: 'Two VFX artists comparing environment studies, storyboards and visual-development references at a workstation',
  },
  {
    id: 'previsualisation',
    number: '03',
    tabLabel: 'Previsualisation',
    title: 'Previsualisation & Virtual Planning',
    overview:
      'Contribute to an animatic, blockout, virtual camera, rough layout or other suitable form of previsualisation. The work should test framing, scale, perspective, timing, asset placement and technical dependencies before resources are committed to final production.',
    download: `${downloadRoot}/03-previsualisation-and-virtual-planning.docx`,
    image: `${imageRoot}/project-03-previsualisation.webp`,
    alt: 'A VFX team testing a virtual camera while reviewing a grey-box previsualisation on a production monitor',
  },
  {
    id: 'production-data',
    number: '04',
    tabLabel: 'Production data',
    title: 'Principal Photography & Production Data Capture',
    overview:
      'Support an on-set or controlled production activity within the limits of your role. You will identify the reference needed downstream, capture or organise appropriate production data, check that it is usable and prepare it for secure handover into the VFX pipeline.',
    download: `${downloadRoot}/04-principal-photography-and-production-data-capture.docx`,
    image: `${imageRoot}/project-04-production-data-capture.webp`,
    alt: 'A VFX data assistant recording information while reference balls are positioned on a green-screen stage',
  },
  {
    id: 'responsible-ai',
    number: '05',
    tabLabel: 'Responsible AI',
    title: 'Responsible AI-Assisted Image Development',
    overview:
      'Investigate an approved AI-assisted production or R&D use case. You will consider permissions, licensing, data handling, copyright and confidentiality; compare the assisted approach with a suitable non-AI method; and show where human creative and technical judgement remains essential.',
    download: `${downloadRoot}/05-responsible-ai-assisted-image-development.docx`,
    image: `${imageRoot}/project-05-responsible-ai-image-development.webp`,
    alt: 'A junior artist and supervisor evaluating several image-development tests beside a conventional compositing workflow',
  },
  {
    id: 'compositing',
    number: '06',
    tabLabel: 'Compositing',
    title: 'Compositing Workflows',
    overview:
      'Contribute to the preparation, tracking, manipulation and integration of visual material within an appropriate compositing workflow. Your evidence will follow the work across versions, showing technical and creative decisions, problem solving, review and approved delivery.',
    download: `${downloadRoot}/06-compositing-workflows.docx`,
    image: `${imageRoot}/project-06-compositing-workflows.webp`,
    alt: 'A compositor and colleague reviewing tracking, roto and node-based integration work on two monitors',
  },
  {
    id: 'cg-production',
    number: '07',
    tabLabel: 'CG production',
    title: 'CG & Experimental VFX Production',
    overview:
      'Apply research and development to the creation, adaptation and integration of CG assets or experimental VFX techniques. The project follows work from brief and technical planning through practical production, problem solving, review, integration and approved delivery.',
    download: `${downloadRoot}/07-cg-and-experimental-vfx-production.docx`,
    image: `${imageRoot}/project-07-cg-experimental-production.webp`,
    alt: 'A CG artist developing an original industrial asset from wireframe through to a rendered production environment',
  },
  {
    id: 'collaborative-delivery',
    number: '08',
    tabLabel: 'Collaboration',
    title: 'Collaborative Delivery & Response to Feedback',
    overview:
      'Evidence a defined episode of genuine team delivery using a pathway-relevant task. You will manage priorities and dependencies, take part in reviews and handovers, communicate risks, apply feedback across iterations and respond professionally to production issues.',
    download: `${downloadRoot}/08-collaborative-delivery-and-response-to-feedback.docx`,
    image: `${imageRoot}/project-08-collaborative-delivery.webp`,
    alt: 'A small VFX team taking notes and discussing feedback during a dailies review',
  },
  {
    id: 'file-management',
    number: '09',
    tabLabel: 'Deliverables',
    title: 'Deliverables, File Management & Version Control',
    overview:
      'Take responsibility for a defined episode of production file and deliverables management. Apply the organisation’s naming, versioning, file-format, colour and delivery requirements, validate outputs, resolve genuine errors and complete a controlled handover.',
    download: `${downloadRoot}/09-deliverables-file-management-and-version-control.docx`,
    image: `${imageRoot}/project-09-deliverables-version-control.webp`,
    alt: 'A VFX practitioner checking project versions, colour scopes and delivery notes at a studio workstation',
  },
  {
    id: 'editorial-workflow',
    number: '10',
    tabLabel: 'Editorial change',
    title: 'Editorial Workflow & Change Management',
    overview:
      'Interpret editorial information, identify its impact on VFX work and manage a genuine or representative change through the pipeline. You will maintain version records, communicate the impact, update pathway work and validate the revised output.',
    download: `${downloadRoot}/10-editorial-workflow-and-change-management.docx`,
    image: `${imageRoot}/project-10-editorial-change-management.webp`,
    alt: 'A VFX artist and editor comparing a revised cut and shot versions in an edit suite',
  },
  {
    id: 'final-major-project',
    number: 'FMP',
    tabLabel: 'Final major project',
    title: 'Final Major Project',
    overview:
      'Select your VFX specialism to view the relevant capstone project and assessment plan.',
    download: `${downloadRoot}/final-major-project-2d-final-shot-integration.docx`,
    image: `${imageRoot}/project-fmp-2d-compositing.webp`,
    alt: 'A 2D VFX apprentice completing a final shot integration at a compositing workstation',
    variants: [
      {
        id: '2d',
        number: '2D',
        tabLabel: 'Junior VFX Artist',
        specialism: '2D pathway',
        title: 'Final Shot Integration & Compositing Sequence',
        overview:
          'Complete a substantial, production-relevant 2D VFX shot or short sequence. Take the work from an agreed brief and source material through planning, plate preparation, tracking, roto or key, paint or clean-up, compositing, colour management, review, quality control and final delivery as appropriate.',
        download: `${downloadRoot}/final-major-project-2d-final-shot-integration.docx`,
        image: `${imageRoot}/project-fmp-2d-compositing.webp`,
        alt: 'A 2D VFX apprentice completing a final shot integration at a compositing workstation',
      },
      {
        id: 'cg3d',
        number: 'CG',
        tabLabel: 'Junior VFX Artist',
        specialism: 'CG/3D pathway',
        title: 'CG Asset-to-Shot Production',
        overview:
          'Create and integrate a substantial CG asset or shot contribution. Take it from production requirements and reference data through the relevant modelling, scene reconstruction, texturing, rigging, blocked animation, layout, lighting, rendering, optimisation, review and delivery stages.',
        download: `${downloadRoot}/final-major-project-cg3d-asset-to-shot-production.docx`,
        image: `${imageRoot}/project-fmp-cg3d-asset-to-shot.webp`,
        alt: 'A CG apprentice and reviewing artist comparing an original asset in wireframe and rendered form',
      },
      {
        id: 'atd',
        number: 'ATD',
        tabLabel: 'Assistant Technical Director',
        specialism: 'VFX pathway',
        title: 'Pipeline Tool & Production Workflow Improvement',
        overview:
          'Identify a real production need and design, develop, test, document and support a small-scale tool or workflow improvement. The project covers requirements, existing solutions, workflow and data analysis, prototyping, testing, rollout, user support, evaluation and handover.',
        download: `${downloadRoot}/final-major-project-atd-pipeline-tool.docx`,
        image: `${imageRoot}/project-fmp-atd-pipeline-tool.webp`,
        alt: 'An Assistant Technical Director apprentice testing a pipeline validation tool with a VFX artist',
      },
    ],
  },
];
