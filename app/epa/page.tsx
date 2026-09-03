import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/page-hero';
import { RevealArticle, RevealListItem, ScrollReveal } from '@/components/motion-primitives';
import {
  EPA_REF,
  epaMethods,
  epaStages,
  gradeCombinations,
  resitRules,
} from '@/lib/epa-data';

export const metadata: Metadata = {
  title: 'End-point assessment | Visual Effects Level 4',
  description:
    'How end-point assessment works on the Level 4 Junior Visual Effects apprenticeship — the gateway, the two assessment methods, and how the grades combine.',
};

export default function EpaPage() {
  return (
    <main>
      <PageHero
        eyebrow="THE FINAL STAGE"
        title="End-point assessment"
        copy={<>End-point assessment — EPA — is how your competence is confirmed at the end of the apprenticeship. It is done by an independent assessor from an approved assessment organisation, not by your employer or your training provider, so the result stands on its own.</>}
        meta={<>Assessment plan {EPA_REF} · Timings and grading reproduced from the plan</>}
      />

      <div className="ksb-bar">
        <div className="ksb-bar-inner epa-bar-inner">
          <nav className="ksb-jump" aria-label="Sections on this page">
            <a href="#how-it-works">How it works</a>
            <a href="#methods">The two methods</a>
            <a href="#grading">Grading</a>
          </nav>
          <p className="ksb-count">2 assessment methods · typically 3 months</p>
        </div>
      </div>

      <section
        id="how-it-works"
        className="ksb-section"
        aria-labelledby="how-it-works-heading"
      >
        <ScrollReveal className="ksb-section-head">
          <span className="ksb-eyebrow">THE SHAPE OF IT</span>
          <h2 id="how-it-works-heading">How it works</h2>
          <p>
            You spend the bulk of the apprenticeship on-programme, building the
            knowledge, skills and behaviours and gathering evidence. Gateway is
            the point where everyone agrees you are ready. Only then does
            assessment itself begin.
          </p>
        </ScrollReveal>
        <ol className="epa-stages">
          {epaStages.map((stage, index) => (
            <RevealListItem key={stage.number} className="epa-stage" delay={index * 0.07}>
              <span className="epa-stage-number">{stage.number}</span>
              <div>
                <span className="epa-stage-duration">{stage.duration}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </div>
            </RevealListItem>
          ))}
        </ol>
      </section>

      <section
        id="methods"
        className="ksb-section"
        aria-labelledby="methods-heading"
      >
        <ScrollReveal className="ksb-section-head">
          <span className="ksb-eyebrow">WHAT YOU ARE ASSESSED ON</span>
          <h2 id="methods-heading">The two assessment methods</h2>
          <p>
            Every apprentice completes both. They are graded separately by an
            independent assessor, and between them they cover the KSBs — one
            through the work you produce, the other through the way you talk
            about the work you have already done.
          </p>
        </ScrollReveal>

        {epaMethods.map((method, index) => (
          <RevealArticle key={method.id} id={method.id} className="epa-method" delay={index * 0.08}>
            <div className="epa-method-media">
              <Image src={method.image} alt={method.alt} fill sizes="(max-width: 900px) 100vw, 42vw" />
              <div className="epa-method-grade" aria-hidden="true" />
              <span className="epa-method-number">{method.number}</span>
            </div>
            <div className="epa-method-body">
              <h3>{method.title}</h3>
              <p className="epa-method-summary">{method.summary}</p>

              <dl className="epa-facts">
                {method.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>

              {method.detail.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="epa-method-detail">
                  {paragraph}
                </p>
              ))}

              <p className="epa-method-grades">
                <span>GRADES AVAILABLE</span>
                <strong>{method.grades}</strong>
              </p>
            </div>
          </RevealArticle>
        ))}
      </section>

      <section
        id="grading"
        className="ksb-section"
        aria-labelledby="grading-heading"
      >
        <ScrollReveal className="ksb-section-head">
          <span className="ksb-eyebrow">HOW THE RESULT IS DECIDED</span>
          <h2 id="grading-heading">Grading</h2>
          <p>
            Each method is graded fail, pass or distinction. Those two results
            combine into one overall grade. A fail in either method is an
            overall fail — there is no averaging.
          </p>
        </ScrollReveal>

        <ScrollReveal className="epa-table-wrap">
          <table className="epa-table">
            <caption className="sr-only">
              How the two assessment method grades combine into an overall
              apprenticeship grade
            </caption>
            <thead>
              <tr>
                <th scope="col">Project with presentation and questioning</th>
                <th scope="col">
                  Professional discussion underpinned by a portfolio
                </th>
                <th scope="col">Overall grade</th>
              </tr>
            </thead>
            <tbody>
              {gradeCombinations.map((row) => (
                <tr
                  key={`${row.project}-${row.discussion}`}
                  className={`epa-row-${row.overall.toLowerCase()}`}
                >
                  <td>{row.project}</td>
                  <td>{row.discussion}</td>
                  <td>
                    <strong>{row.overall}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollReveal>

        <ScrollReveal>
          <h3 className="epa-subheading">If it does not go to plan</h3>
          <dl className="epa-facts epa-facts-wide">
            {resitRules.map((rule) => (
              <div key={rule.label}>
                <dt>{rule.label}</dt>
                <dd>{rule.value}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
        </section>
    </main>
  );
}
