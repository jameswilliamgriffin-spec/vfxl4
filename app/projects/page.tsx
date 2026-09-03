import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { ProjectsBrowser } from '@/components/projects-browser';

export const metadata: Metadata = {
  title: 'Projects | Visual Effects Level 4',
  description:
    'Explore the introduction, workplace projects and pathway-specific Final Major Project for the Level 4 Junior Visual Effects apprenticeship.',
};

export default function ProjectsPage() {
  return (
    <main>
      <PageHero
        className="projects-hero"
        eyebrow="THE PRODUCTION JOURNEY"
        title="Projects"
        copy={<>Build your evidence through authentic production practice. Begin inside the VFX pipeline, move through ten flexible workplace projects, then bring your specialist skills together in a pathway-specific Final Major Project.</>}
        meta="12 PROJECT STAGES · 3 PATHWAY-SPECIFIC FINALS"
      />
      <ProjectsBrowser />
    </main>
  );
}
