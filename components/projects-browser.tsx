'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { RefObject } from 'react';
import { useRef, useState } from 'react';
import { projectStages, type ProjectDetail } from '@/lib/project-data';

const ease = [0.22, 1, 0.36, 1] as const;

function moveFocus(
  event: React.KeyboardEvent,
  index: number,
  length: number,
  select: (index: number) => void,
  refs: RefObject<(HTMLButtonElement | null)[]>,
) {
  const targets: Record<string, number> = {
    ArrowRight: index + 1,
    ArrowLeft: index - 1,
    Home: 0,
    End: length - 1,
  };
  const requested = targets[event.key];
  if (requested === undefined) return;

  event.preventDefault();
  const next = (requested + length) % length;
  select(next);
  refs.current[next]?.focus();
  refs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function ProjectPanel({ project }: { project: ProjectDetail }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      key={project.id}
      className="project-panel"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: reduceMotion ? 0 : 0.42, ease }}
    >
      <div className="project-panel-copy">
        <div className="project-panel-index" aria-hidden="true">
          <span>PROJECT</span>
          <strong>{project.number}</strong>
        </div>

        <div className="project-panel-heading">
          <span className="project-panel-eyebrow">
            {project.specialism ?? (project.number === '00' ? 'PROGRAMME INTRODUCTION' : 'WORKPLACE PROJECT')}
          </span>
          <h2>{project.title}</h2>
        </div>

        <p className="project-panel-overview">{project.overview}</p>

        <a className="project-download" href={project.download} download>
          <span>
            <small>DOCX</small>
            Download Assessment Plan
          </span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14" />
          </svg>
        </a>
      </div>

      <div className="project-panel-media">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width: 900px) 100vw, 56vw"
          priority={project.id === 'introduction'}
        />
        <div className="project-media-grade" />
        <div className="project-media-reticle" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <span className="project-media-label">PROJECT IMAGE / PRODUCTION STUDY</span>
        <span className="project-media-code" aria-hidden="true">
          VFX_L4_{project.number.replace('/', '_')}
        </span>
      </div>
    </motion.article>
  );
}

export function ProjectsBrowser() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const stageRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const variantRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeStage = projectStages[activeStageIndex];
  const variants = activeStage.variants ?? [];
  const activeProject = variants[activeVariantIndex] ?? activeStage;
  const panelId = `project-panel-${activeStage.id}`;

  function selectStage(index: number) {
    setActiveStageIndex(index);
    if (!projectStages[index].variants) setActiveVariantIndex(0);
  }

  return (
    <section className="projects-browser" aria-labelledby="projects-browser-heading">
      <h2 id="projects-browser-heading" className="sr-only">
        Apprenticeship projects
      </h2>

      <div className="project-tabs-meta" aria-hidden="true">
        <span>PROJECT INDEX</span>
        <span>INTRODUCTION · 10 WORKPLACE PROJECTS · FINAL MAJOR PROJECT</span>
      </div>

      <div className="project-tabs-wrap">
        <div className="project-tab-list" role="tablist" aria-label="Choose a project">
          {projectStages.map((project, index) => {
            const active = index === activeStageIndex;
            return (
              <button
                key={project.id}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                id={`project-tab-${project.id}`}
                type="button"
                role="tab"
                aria-label={`${project.number} — ${project.title}`}
                aria-selected={active}
                aria-controls={`project-panel-${project.id}`}
                tabIndex={active ? 0 : -1}
                className={active ? 'is-active' : undefined}
                onClick={() => selectStage(index)}
                onKeyDown={(event) =>
                  moveFocus(event, index, projectStages.length, selectStage, stageRefs)
                }
              >
                <span className="project-tab-number">{project.number}</span>
                {active && <span className="project-tab-label">{project.title}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={panelId}
        className="project-stage-panel"
        role="tabpanel"
        aria-labelledby={`project-tab-${activeStage.id}`}
        tabIndex={0}
      >
        {variants.length > 0 && (
          <div className="project-specialisms">
            <div className="project-specialisms-heading">
              <span>SELECT YOUR SPECIALISM</span>
              <p>The Final Major Project is specific to your apprenticeship pathway.</p>
            </div>
            <div className="project-specialism-tabs" role="tablist" aria-label="Final Major Project specialism">
              {variants.map((variant, index) => {
                const active = index === activeVariantIndex;
                return (
                  <button
                    key={variant.id}
                    ref={(node) => {
                      variantRefs.current[index] = node;
                    }}
                    id={`project-specialism-tab-${variant.id}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls={`project-specialism-panel-${variant.id}`}
                    tabIndex={active ? 0 : -1}
                    className={active ? 'is-active' : undefined}
                    onClick={() => setActiveVariantIndex(index)}
                    onKeyDown={(event) =>
                      moveFocus(event, index, variants.length, setActiveVariantIndex, variantRefs)
                    }
                  >
                    <span>{variant.number}</span>
                    <span>
                      {variant.tabLabel}
                      <strong>{variant.specialism}</strong>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div
          id={variants.length > 0 ? `project-specialism-panel-${activeProject.id}` : undefined}
          role={variants.length > 0 ? 'tabpanel' : undefined}
          aria-labelledby={
            variants.length > 0 ? `project-specialism-tab-${activeProject.id}` : undefined
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            <ProjectPanel key={`${activeStage.id}-${activeProject.id}`} project={activeProject} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
