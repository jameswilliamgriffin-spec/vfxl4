import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { TrainingBrowser } from '@/components/training-browser';

export const metadata: Metadata = {
  title: 'Training | Visual Effects Level 4',
  description:
    'The eight core-knowledge training sessions taught within the Level 4 Junior Visual Effects apprenticeship, each mapped to the occupational standard.',
};

export default function TrainingPage() {
  return (
    <main>
      <PageHero
        eyebrow="ON-PROGRAMME DEVELOPMENT"
        title="Training"
        copy={<>Eight taught sessions give you the principles, industry context and protected practice that live production cannot always provide in the right order — the core knowledge under the craft, mapped to the occupational standard you are assessed against. They run alongside your workplace projects.</>}
        meta="08 SESSIONS · 2.5 HOURS EACH · CORE KNOWLEDGE"
      />
      <TrainingBrowser />
    </main>
  );
}
