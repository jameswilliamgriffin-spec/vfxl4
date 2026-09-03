import { HeroDotField } from '@/components/hero-dot-field';
import { PageHeroShader } from '@/components/page-hero-shader';

type PageHeroProps = {
  title: string;
  copy: React.ReactNode;
  eyebrow?: string;
  meta?: React.ReactNode;
  className?: string;
};

// Intro reveal is CSS-driven (see .ksb-hero-copy rules in globals.css). A mount-time
// JS animation here competes with the WebGL shader sibling for the main thread and
// can stall, leaving the copy invisible.
export function PageHero({ title, copy, eyebrow, meta, className = '' }: PageHeroProps) {
  return (
    <section className={`ksb-hero ${className}`.trim()}>
      <PageHeroShader />
      <HeroDotField />
      <div className="ksb-hero-copy">
        {eyebrow && <span className="ksb-eyebrow">{eyebrow}</span>}
        <div className="page-hero-title-mask">
          <h1>{title}</h1>
        </div>
        <p>{copy}</p>
        {meta && <p className="ksb-hero-meta">{meta}</p>}
      </div>
    </section>
  );
}
