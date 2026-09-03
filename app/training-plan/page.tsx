import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Training Plan | Visual Effects Level 4',
  description:
    'An in-depth look at the learning journey, scheduled training and off-the-job hours for the Level 4 Junior Visual Effects apprenticeship.',
};

export default function TrainingPlanPage() {
  return (
    <main>
      <PageHero
        title="Training Plan"
        copy={<>An in-depth look at your apprenticeship training plan, including your learning journey, scheduled training and off-the-job hours.</>}
      />
    </main>
  );
}
