// KSB reference data for ST1325 v1.2 (Junior visual effects - VFX artist or ATD).
//
// `text` is the official wording from the occupational standard, reproduced verbatim.
// Source quirks are intentional and must not be "corrected": "principals" in K27,
// the spacing in "re- timing" in S25, and the spacing/capitalisation in K44.
// K29/K45 and S27/S47 carry identical wording in the standard but remain separate
// official identifiers, so both are kept.
//
// `scope` records who a KSB applies to, taken from the EPA plan's KSB mapping table
// via PATHWAY_SPECIFIC_KSBS.md:
//   core   - every apprentice, whichever pathway
//   2d     - Junior VFX Artist (2D) only
//   cg3d   - Junior VFX Artist (CG/3D) only
//   atd    - Assistant Technical Director (VFX) only
//   artist - both artist pathways (2D and CG/3D), but not ATD
//
// Counts are checked against the totals table in PATHWAY_SPECIFIC_KSBS.md:
// 2D 30/28/7, CG/3D 28/27/7, ATD 27/28/7 (knowledge/skills/behaviours).

export const STANDARD_REF = 'ST1325 v1.2';

export type KsbType = 'K' | 'S' | 'B';
export type KsbScope = 'core' | '2d' | 'cg3d' | 'atd' | 'artist';

export type Ksb = {
  id: string;
  type: KsbType;
  scope: KsbScope;
  text: string;
};

export type PathwayId = '2d' | 'cg3d' | 'atd';

export const pathways: { id: PathwayId; number: string; name: string; specialism: string; scopes: KsbScope[] }[] = [
  { id: '2d', number: '01', name: 'Junior VFX Artist', specialism: '2D', scopes: ['2d', 'artist'] },
  { id: 'cg3d', number: '02', name: 'Junior VFX Artist', specialism: 'CG / 3D', scopes: ['cg3d', 'artist'] },
  { id: 'atd', number: '03', name: 'Assistant Technical Director', specialism: 'VFX', scopes: ['atd'] },
];

export const typeLabels: Record<KsbType, { label: string; plural: string }> = {
  K: { label: 'Knowledge', plural: 'Knowledge' },
  S: { label: 'Skill', plural: 'Skills' },
  B: { label: 'Behaviour', plural: 'Behaviours' },
};

export const ksbs: Ksb[] = [
  { id: 'K1', type: 'K', scope: 'core', text: 'The value of VFX content and confidentiality to the business and its customers. Why it is important to maintain data security, and the legal and regulatory requirements which apply to VFX assets including copyright and intellectual property rights' },
  { id: 'K2', type: 'K', scope: 'core', text: 'The in-camera creation pipeline, from pre-production, through shoot, editorial, VFX to grading' },
  { id: 'K3', type: 'K', scope: 'core', text: 'The importance and methods of retaining the quality of the source material' },
  { id: 'K4', type: 'K', scope: 'core', text: 'The VFX industry and the terminology, policies, standards and procedures, current tools and workflows used' },
  { id: 'K5', type: 'K', scope: 'core', text: 'The VFX production pipeline, including shot bidding, turn-over, briefing, reviews, client reviews, deliveries and final delivery' },
  { id: 'K6', type: 'K', scope: 'core', text: 'The importance of naming conventions, file formats and version control and the impact of not doing this correctly' },
  { id: 'K7', type: 'K', scope: 'core', text: 'How to identify production requirements from a brief; plan your approach to the work, techniques, optimisation and schedule' },
  { id: 'K8', type: 'K', scope: 'core', text: 'The requirements and expectations of the workflow, and of other team members who will use the assets you create' },
  { id: 'K9', type: 'K', scope: 'core', text: 'Common artefacts in plate photography such as lens distortion, parallax and overscan' },
  { id: 'K10', type: 'K', scope: 'core', text: 'The principles of perspective, depth of field and scale, and how this relates to a believable final image' },
  { id: 'K11', type: 'K', scope: 'core', text: 'The principles of photographic composition, light and colour' },
  { id: 'K12', type: 'K', scope: 'core', text: 'The principles of computer systems, IP networks and shared storage systems as applied in VFX' },
  { id: 'K13', type: 'K', scope: 'core', text: 'How assets are managed throughout the workflow including: production storage, shared storage, nearline storage and archive, whether on premises or in the cloud' },
  { id: 'K14', type: 'K', scope: 'core', text: 'Why it is important to evaluate progress and seek feedback on your work in VFX' },
  { id: 'K15', type: 'K', scope: 'core', text: 'How to create assets that support the vision of the story and the purpose of the image' },
  { id: 'K16', type: 'K', scope: 'core', text: 'How computer generated imagery (CGI) can be rendered in multiple passes in order to be adjusted more efficiently in the composite. These passes can include: colour, diffuse, specular, shadow and beauty lighting.' },
  { id: 'K17', type: 'K', scope: 'core', text: 'Research methods, techniques and tools that can be used and where to find credible and valid sources of information, reference materials and previously created assets' },
  { id: 'K18', type: 'K', scope: 'core', text: 'The different software and techniques that could be used; the implications of their use, how to customise these and how they can be used to solve problems.' },
  { id: 'K19', type: 'K', scope: 'core', text: 'The rendering requirements for the production and how to optimise assets' },
  { id: 'K20', type: 'K', scope: '2d', text: 'How digital images are encoded and stored, especially colour spaces and their appropriate use' },
  { id: 'K21', type: 'K', scope: '2d', text: 'The differences in linear light, gamma encoded and logarithmic encoded pixel values' },
  { id: 'K22', type: 'K', scope: '2d', text: 'The implications of working with high and low dynamic range images' },
  { id: 'K23', type: 'K', scope: '2d', text: 'The VFX colour pipeline, from acquisition to working space, balance grades, look grades and delivery' },
  { id: 'K24', type: 'K', scope: '2d', text: 'How to determine the most appropriate method for removing unwanted artefacts in live action footage' },
  { id: 'K25', type: 'K', scope: '2d', text: 'Camera moves and how they impact patching or frame-by-frame painting' },
  { id: 'K26', type: 'K', scope: '2d', text: 'How to determine which technique is the correct method to generate the matte and how the matte will be used in the composite' },
  { id: 'K27', type: 'K', scope: '2d', text: 'Motion blur, how it affects the matte and the principals of animation to effectively replicate in the generated matte' },
  { id: 'K28', type: 'K', scope: '2d', text: 'How to analyse the shot to determine the most efficient breakdown of shapes and keyframes' },
  { id: 'K29', type: 'K', scope: 'artist', text: 'The concept and purpose of a template or hero script as appropriate' },
  { id: 'K30', type: 'K', scope: 'cg3d', text: 'How to identify and select the different rendering techniques and tools to use, and how to save and duplicate render settings across multiple files' },
  { id: 'K31', type: 'K', scope: 'cg3d', text: 'The types of data and information you might receive from an on-set environment' },
  { id: 'K32', type: 'K', scope: 'atd', text: 'The fundamentals of data structures, structured and unstructured data, database system design, implementation and maintenance' },
  { id: 'K33', type: 'K', scope: 'atd', text: 'The quality issues that can arise with data and how to avoid and/or resolve these' },
  { id: 'K34', type: 'K', scope: 'cg3d', text: 'How to identify where your asset or shot fits within a sequence' },
  { id: 'K35', type: 'K', scope: 'cg3d', text: 'The process of following image features across a series of frames to record the position of an object in the source footage' },
  { id: 'K36', type: 'K', scope: 'cg3d', text: 'How the camera moves, the impact on the tracking process and how to select the most appropriate method to produce an accurate track' },
  { id: 'K37', type: 'K', scope: 'cg3d', text: 'The technical process of tracking and how you can improve the accuracy and efficiency of tracking the shot' },
  { id: 'K38', type: 'K', scope: 'cg3d', text: 'How to interrogate software to solve issues with and/or create: simple shot lighting, basic simulations, a model, a rig or blocked animation' },
  { id: 'K39', type: 'K', scope: 'atd', text: 'The organisation\'s data architecture' },
  { id: 'K40', type: 'K', scope: 'atd', text: 'Grid computing and its use within VFX render queues - at a basic level' },
  { id: 'K41', type: 'K', scope: 'atd', text: 'How to balance resource needs within the company’s physical capacity' },
  { id: 'K42', type: 'K', scope: 'atd', text: 'Principles of software development, the software design process and the importance of design before development' },
  { id: 'K43', type: 'K', scope: 'atd', text: 'How workflow diagrams, prototyping and presenting to intended users can aid in designing better solutions' },
  { id: 'K44', type: 'K', scope: 'atd', text: 'Application specific scripting languages e.g. general scripting languages such as python alongside application specific scripting Mel, vex , Hscript etc. as appropriate' },
  { id: 'K45', type: 'K', scope: 'artist', text: 'The concept and purpose of a template or hero script as appropriate' },
  { id: 'S1', type: 'S', scope: 'core', text: 'Identify the information required, and gather the appropriate research or reference materials to carry out your work to expected creative, narrative and technical standards on each production' },
  { id: 'S2', type: 'S', scope: 'core', text: 'Select the appropriate software and technique to meet the required standards and tasks, taking into account the needs of other departments in the production pipeline' },
  { id: 'S3', type: 'S', scope: 'core', text: 'Use appropriate techniques to reduce degradation of the source material' },
  { id: 'S4', type: 'S', scope: 'core', text: 'Identify render errors and fix/escalate them as appropriate' },
  { id: 'S5', type: 'S', scope: 'core', text: 'Work in line with agreed workflows, adapting to operational and creative changes as they occur' },
  { id: 'S6', type: 'S', scope: 'core', text: 'Operate within and adhere to agreed organisational policies, standards and procedures such as health & safety, confidentiality, security, asset storage and legal and regulatory requirements' },
  { id: 'S7', type: 'S', scope: 'core', text: 'Manage own workload and operate both individually and as part of a wider VFX team, keeping colleagues, clients and/or other departments updated on progress and report any issues arising' },
  { id: 'S8', type: 'S', scope: 'core', text: 'Use reliable information to keep-up-to date with the new tools, software, data and other related technology, and how they affect your work' },
  { id: 'S9', type: 'S', scope: 'core', text: 'Interpret and correct lens distortion, parallax and overscan' },
  { id: 'S10', type: 'S', scope: 'core', text: 'Multitask on simultaneous projects, often for different clients, deciding how to prioritise the work to ensure that all tasks are completed on schedule' },
  { id: 'S11', type: 'S', scope: 'core', text: 'Respond positively to feedback on work, making refinements as needed' },
  { id: 'S12', type: 'S', scope: 'core', text: 'Apply the naming conventions, file formats and version control for the work' },
  { id: 'S13', type: 'S', scope: 'core', text: 'Deliver content in the correct format as required by the employer and clients' },
  { id: 'S14', type: 'S', scope: 'core', text: 'Use maths to describe problems, recreate physical systems or manipulate computer generated geometry' },
  { id: 'S15', type: 'S', scope: 'core', text: 'Move, store and organise assets created, ensuring data integrity, in order to enable their use throughout the rest of the pipeline' },
  { id: 'S16', type: 'S', scope: 'core', text: 'Analyse and determine the most appropriate approach to carry out the work' },
  { id: 'S17', type: 'S', scope: 'core', text: 'Trouble shoot VFX problems, taking responsibility for the course of action followed, including identifying opportunities to deliver viable solutions and sharing these outcomes.' },
  { id: 'S18', type: 'S', scope: '2d', text: 'Convert between common colour spaces, selecting the appropriate colour space for the given task and combining images from multiple colour spaces' },
  { id: 'S19', type: 'S', scope: '2d', text: 'Apply colour adjustments at the correct stage of the composite, using non-destructive adjustments where possible' },
  { id: 'S20', type: 'S', scope: '2d', text: 'Use patching techniques to remove unwanted objects within the live action footage' },
  { id: 'S21', type: 'S', scope: '2d', text: 'Use frame-by-frame painting to remove unwanted objects within the live action footage' },
  { id: 'S22', type: 'S', scope: '2d', text: 'Generate mattes by roto-scoping and luminance, difference and colour keying' },
  { id: 'S23', type: 'S', scope: '2d', text: 'Produce accurate roto-scope by correctly placing shapes, control points and keyframes' },
  { id: 'S24', type: 'S', scope: '2d', text: 'Accurately replicate motion blur within the roto-scope generated matte' },
  { id: 'S25', type: 'S', scope: '2d', text: 'Complete basic composites demonstrating keying, colour grading, re- timing and screen insertion' },
  { id: 'S26', type: 'S', scope: '2d', text: 'Complete basic live action and CGI composites demonstrating set extensions and simple CGI objects integrated into live action elements' },
  { id: 'S27', type: 'S', scope: 'artist', text: 'Create accurate point tracks and planar tracks in line with production requirements' },
  { id: 'S28', type: 'S', scope: 'cg3d', text: 'VFX3D: Apply render settings across multiple assets' },
  { id: 'S29', type: 'S', scope: 'cg3d', text: 'Analyse, interpret and use on-set data and information' },
  { id: 'S30', type: 'S', scope: 'cg3d', text: 'Model and manipulate geometry for scene reconstruction' },
  { id: 'S31', type: 'S', scope: 'cg3d', text: 'Select and use software to create: a model, a texture map, puppet rig or blocked animation to meet the requirements of the brief' },
  { id: 'S32', type: 'S', scope: 'cg3d', text: 'Review assets created with the relevant people, offering suggestions to assist others with the production' },
  { id: 'S33', type: 'S', scope: 'cg3d', text: 'Capture and work with photogrammetry and convert it to useable 3D geometry and cameras' },
  { id: 'S34', type: 'S', scope: 'cg3d', text: 'Optimise and rebuild assets/scenes for real time rendering' },
  { id: 'S35', type: 'S', scope: 'cg3d', text: 'Assemble, layout and maintain assets into project, sequence, or shot based environments' },
  { id: 'S36', type: 'S', scope: 'atd', text: 'Identify, collect and migrate data to/from a range of systems' },
  { id: 'S37', type: 'S', scope: 'atd', text: 'Manipulate and link different data sets as required' },
  { id: 'S38', type: 'S', scope: 'atd', text: 'Perform database queries across multiple tables to extract data for analysis' },
  { id: 'S39', type: 'S', scope: 'atd', text: 'Monitor, manipulate and report on render queues' },
  { id: 'S40', type: 'S', scope: 'atd', text: 'Monitor, track and report render resource usage' },
  { id: 'S41', type: 'S', scope: 'atd', text: 'Investigate existing solutions or frameworks' },
  { id: 'S42', type: 'S', scope: 'atd', text: 'Design and present proposed solutions and respond to feedback' },
  { id: 'S43', type: 'S', scope: 'atd', text: 'Plan and document development roadmap' },
  { id: 'S44', type: 'S', scope: 'atd', text: 'Troubleshoot individual artist input, output or archival problems' },
  { id: 'S45', type: 'S', scope: 'atd', text: 'Develop small-scale tools, using existing pipeline frameworks and libraries' },
  { id: 'S46', type: 'S', scope: 'atd', text: 'Support or troubleshoot pipeline and workflow tools' },
  { id: 'S47', type: 'S', scope: 'artist', text: 'Create accurate point tracks and planar tracks in line with production requirements' },
  { id: 'B1', type: 'B', scope: 'core', text: 'Work with sustained concentration and with attention to detail; able to self-check work for quality control' },
  { id: 'B2', type: 'B', scope: 'core', text: 'Work on own initiative, be proactive and inquisitive; but recognise your own level of authority and when it is necessary to escalate issues. Act in a professional and ethical manner, embracing equality, diversity and inclusion in the workplace.' },
  { id: 'B3', type: 'B', scope: 'core', text: 'Think creatively and logically to solve technical problems - contribute to a process continual improvement of workflow and technique. Use initiative and innovation to problem solve, to provide creative solutions and opportunities for the production.' },
  { id: 'B4', type: 'B', scope: 'core', text: 'Be flexible and able to work under pressure - managing and re-organising priorities and bringing multiple tasks to completion within deadlines, communicating progress as required' },
  { id: 'B5', type: 'B', scope: 'core', text: 'Demonstrate judgement in assessing the use of emerging practice within the constraints of a production environment. Do not willingly accept second best, and be pragmatic about balancing client expectations against the available time and budget.' },
  { id: 'B6', type: 'B', scope: 'core', text: 'Use different communication methods and tools to suit different audiences or situations and changes in circumstances to create and maintain positive, professional, trusting and ethical working relationships with your team and the wider range of internal, external and connected stakeholders.' },
  { id: 'B7', type: 'B', scope: 'core', text: 'Maintain commercial confidentiality and professional practice at all times, and in all settings' },
];

export const coreKsbs = ksbs.filter((k) => k.scope === 'core');

export function ksbsForPathway(id: PathwayId): Ksb[] {
  const pathway = pathways.find((p) => p.id === id);
  if (!pathway) return [];
  return ksbs.filter((k) => pathway.scopes.includes(k.scope));
}

export function byType(list: Ksb[], type: KsbType): Ksb[] {
  return list.filter((k) => k.type === type);
}


// Occupational duties from the same standard. Duties 1-8 apply to everyone; 9-12,
// 13-16 and 17-20 belong to 2D, CG/3D and ATD respectively. `ksbs` is the standard's
// own mapping of which KSBs each duty draws on, verified against the ids above.
export type Duty = {
  id: string;
  scope: 'core' | PathwayId;
  text: string;
  ksbs: string[];
};

export const duties: Duty[] = [
  { id: 'Duty 1', scope: 'core', text: 'Assess the requirements set by the client or supervisor brief. Establish which tools and techniques best meet the required creative, narrative and technical demands of the production.', ksbs: ['K1', 'K7', 'K19', 'S1', 'S2', 'S16', 'B2'] },
  { id: 'Duty 2', scope: 'core', text: 'Create VFX assets/tools in line with production requirements, ensuring the output meets the requirements for the workflow process', ksbs: ['K2', 'K5', 'K9', 'K10', 'K11', 'K13', 'K15', 'K16', 'K17', 'K19', 'S2', 'S5', 'S15', 'B1'] },
  { id: 'Duty 3', scope: 'core', text: 'Manage VFX assets through the workflow (pipeline) in line with production requirements for organising, storing and retrieving assets', ksbs: ['K2', 'K3', 'K5', 'K10', 'K12', 'K13', 'K19', 'S3', 'S5', 'S6', 'S12', 'S15', 'B1'] },
  { id: 'Duty 4', scope: 'core', text: 'Work autonomously and with clients or customers in the visual effects (VFX) industry, collaborating with other departments as required to ensure that the CG elements are delivered to meet agreed production requirements', ksbs: ['K1', 'K5', 'K7', 'K8', 'K14', 'S6', 'S7', 'S10', 'S11', 'S13', 'B4', 'B6', 'B7'] },
  { id: 'Duty 5', scope: 'core', text: 'Seek out, interpret and apply information about emerging practice in the visual VFX industry to improve knowledge and performance in line with organisational protocols', ksbs: ['K4', 'S8', 'B5'] },
  { id: 'Duty 6', scope: 'core', text: 'Work with existing VFX project organisation tools. Consider and recommend improvements to existing tools. Develop and implement new tools as required.', ksbs: ['K4', 'K6', 'K12', 'K13', 'S2', 'S4', 'S17', 'B2', 'B3'] },
  { id: 'Duty 7', scope: 'core', text: 'Recreate physical systems or manipulate computer generated geometry to create or develop a VFX asset.', ksbs: ['K8', 'K9', 'K10', 'K11', 'K14', 'K15', 'K17', 'S9', 'S14'] },
  { id: 'Duty 8', scope: 'core', text: 'Use innovative approaches to solve problems and ensure VFX assets are delivered in line with production requirements.', ksbs: ['K8', 'K18', 'S7', 'S13', 'S17', 'B2', 'B3'] },
  { id: 'Duty 9', scope: '2d', text: 'Create mattes using roto-scoping and keying to allow all elements of the scene to be layered convincingly by a compositor', ksbs: ['K3', 'K15', 'K26', 'K27', 'K28', 'K29', 'K45', 'S3', 'S22', 'S23', 'S24', 'S27', 'S47', 'B1'] },
  { id: 'Duty 10', scope: '2d', text: 'Remove erroneous objects within live action footage, such as camera/lighting equipment and safety stunt wires and rigs', ksbs: ['K24', 'K25', 'S17', 'S20', 'S21'] },
  { id: 'Duty 11', scope: '2d', text: 'Produce basic composites that could be for editorial purposes for test screenings of the film, or for use in the final production', ksbs: ['K9', 'K10', 'K11', 'K15', 'K17', 'K25', 'S25', 'S26'] },
  { id: 'Duty 12', scope: '2d', text: 'Apply the principles of colour space within the VFX colour pipeline', ksbs: ['K11', 'K20', 'K21', 'K22', 'K23', 'S18', 'S19'] },
  { id: 'Duty 13', scope: 'cg3d', text: 'Select and use appropriate technology to render VFX assets for pre-rendered or real-time productions', ksbs: ['K4', 'K15', 'K30', 'S4', 'S28'] },
  { id: 'Duty 14', scope: 'cg3d', text: 'Track cameras, markers and objects to meet production requirements', ksbs: ['K11', 'K31', 'K34', 'K35', 'K36', 'K37', 'S11', 'S27', 'S29', 'S30', 'S47', 'B1'] },
  { id: 'Duty 15', scope: 'cg3d', text: 'Create and manipulate 3D assets in line with production requirements/ the brief. These may include models, textures, cameras, environmental elements, rigs.', ksbs: ['K3', 'K10', 'K11', 'K15', 'K17', 'K18', 'K29', 'K38', 'K45', 'S3', 'S9', 'S10', 'S31', 'S33', 'S34', 'S35'] },
  { id: 'Duty 16', scope: 'cg3d', text: 'Evaluate VFX assets in line with feedback from multiple sources including dailies, to ensure production requirements are met and own practice continuously improves', ksbs: ['K10', 'K11', 'K14', 'K15', 'K17', 'S17', 'S32'] },
  { id: 'Duty 17', scope: 'atd', text: 'Set up and/or follow file management protocols, convert files, file and store data securely, undertake file archiving and restoration', ksbs: ['K3', 'K6', 'K32', 'K33', 'S3', 'S37'] },
  { id: 'Duty 18', scope: 'atd', text: 'Monitor, manage, manipulate, problem solve, escalate and report on render queues and track resource usage', ksbs: ['K6', 'K12', 'K13', 'K40', 'K41', 'S10', 'S39', 'S40', 'S41', 'S44', 'S46'] },
  { id: 'Duty 19', scope: 'atd', text: 'Perform bespoke database/ library queries or searches. Identify, collect and migrate information from data sources to meet production requirements.', ksbs: ['K12', 'K32', 'K39', 'S36', 'S37', 'S38'] },
  { id: 'Duty 20', scope: 'atd', text: 'Contribute to software design, development and scripting', ksbs: ['K8', 'K18', 'K42', 'K43', 'K44', 'S41', 'S42', 'S43', 'S45', 'B1'] },
];

export const coreDuties = duties.filter((d) => d.scope === 'core');

export function dutiesForPathway(id: PathwayId): Duty[] {
  return duties.filter((d) => d.scope === id);
}
