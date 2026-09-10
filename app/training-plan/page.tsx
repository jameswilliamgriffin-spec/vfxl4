import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { TrainingPlanBrowser } from '@/components/training-plan-browser';
import { PLAN_TOTAL_HOURS, PROGRAMME_LENGTH } from '@/lib/training-plan-data';

export const metadata: Metadata = {
  title: 'Training Plan | Visual Effects Level 4',
  description:
    'The Level 4 Junior Visual Effects training plan — 326 hours of off-the-job training across induction, core knowledge sessions, coaching, portfolio and project work, and communication skills.',
};

export default function TrainingPlanPage() {
  return (
    <main>
      <PageHero
        eyebrow="THE LEARNING JOURNEY"
        title="Training Plan"
        copy={
          <>
            The plan sets out how your off-the-job training is made up across the apprenticeship — the
            induction days, the taught knowledge sessions, coaching, portfolio and project work, and the
            time spent developing how you present your work. It opens on the overview; expand a section
            for the detail.
          </>
        }
        meta={`${PLAN_TOTAL_HOURS} OFF-THE-JOB HOURS · ${PROGRAMME_LENGTH} · REVIEWS EVERY 8 WEEKS`}
      />
      <TrainingPlanBrowser />
    </main>
  );
}
