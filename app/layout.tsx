import type { Metadata } from 'next';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/outfit/300.css';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import { PageTransition } from '@/components/page-transition';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Visual Effects Level 4 | Viridian Academy',
  description:
    'The programme home for the Level 4 Junior Visual Effects apprenticeship — pathways, projects, training and end-point assessment.',
  openGraph: {
    title: 'Visual Effects Level 4',
    description: 'Build production craft. Develop a specialism. Progress towards EPA.',
    images: ['/assets/academy-greenscreen-stage.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
      </body>
    </html>
  );
}
