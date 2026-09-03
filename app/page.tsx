import { Hero } from '@/components/hero';
import { ApprenticeshipOverview } from '@/components/apprenticeship-overview';
import { CursorField } from '@/components/cursor-field';
import { FrameCounter } from '@/components/frame-counter';
import { ProjectMap } from '@/components/project-map';
import { Training } from '@/components/training';

export default function Home() {
  return (
    <main>
      <Hero />
      <ApprenticeshipOverview />
      <ProjectMap />
      <Training />
      <CursorField />
      <FrameCounter />
    </main>
  );
}
