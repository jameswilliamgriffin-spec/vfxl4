import type { Metadata } from 'next';
import { KsbBrowser } from '@/components/ksb-browser';
import { PageHero } from '@/components/page-hero';
import { STANDARD_REF } from '@/lib/ksb-data';

export const metadata: Metadata = {
  title: 'Knowledge, Skills and Behaviours | Visual Effects Level 4',
  description:
    'The Knowledge, Skills and Behaviours for the Level 4 Junior Visual Effects apprenticeship — core criteria for every apprentice, plus the requirements specific to each pathway.',
};

export default function KsbsPage() {
  return (
    <main>
      <PageHero
        eyebrow="THE CRITERIA"
        title="Knowledge, Skills and Behaviours"
        copy={<>Your Knowledge, Skills and Behaviours — KSBs — are the criteria you evidence across the apprenticeship. They are not a test at the end: you build towards them through the work you do every day, and the evidence comes from that work.</>}
        meta={<>Occupational standard {STANDARD_REF}</>}
      />
      <KsbBrowser />
    </main>
  );
}
