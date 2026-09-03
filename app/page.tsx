import { Hero } from '@/components/hero';
import { ApprenticeshipOverview } from '@/components/apprenticeship-overview';
import { SiteHeader } from '@/components/site-header';

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <ApprenticeshipOverview />
    </main>
  );
}
