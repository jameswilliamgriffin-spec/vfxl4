import { Hero } from '@/components/hero';
import { ApprenticeshipOverview } from '@/components/apprenticeship-overview';
import { ProjectMap } from '@/components/project-map';
import { Training } from '@/components/training';

export default function Home() {
  return (
    <main>
      <Hero />
      <ApprenticeshipOverview />
      <ProjectMap />
      <Training />
    </main>
  );
}
