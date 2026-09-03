import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { TrainingBrowser } from '@/components/training-browser';

export const metadata: Metadata = {
  title: 'Training | Visual Effects Level 4',
  description:
    'Explore the eight areas of taught development within the Level 4 Junior Visual Effects apprenticeship.',
};

export default function TrainingPage() {
  return (
    <main>
      <PageHero
        eyebrow="ON-PROGRAMME DEVELOPMENT"
        title="Training"
        copy={<>Structured teaching gives you the principles, technical context and protected practice that live production cannot always provide in the right order. It works alongside your workplace projects to build confident, transferable VFX practice.</>}
        meta="08 TRAINING SECTIONS · CORE AND PATHWAY DEVELOPMENT"
      />
      <TrainingBrowser />
    </main>
  );
}
