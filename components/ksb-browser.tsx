'use client';

import { useId, useMemo, useRef, useState } from 'react';
import { ScrollReveal } from '@/components/motion-primitives';
import {
  byType,
  coreDuties,
  coreKsbs,
  duties,
  dutiesForPathway,
  ksbsForPathway,
  pathways,
  typeLabels,
  type Duty,
  type Ksb,
  type KsbType,
  type PathwayId,
} from '@/lib/ksb-data';

const TYPES: KsbType[] = ['K', 'S', 'B'];

/** Long entries clamp to three lines; shorter ones never need a control. */
const EXPAND_THRESHOLD = 140;

function matches(ksb: Ksb, query: string) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return ksb.id.toLowerCase().includes(q) || ksb.text.toLowerCase().includes(q);
}

function dutyMatches(duty: Duty, query: string) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    duty.id.toLowerCase().includes(q) ||
    duty.text.toLowerCase().includes(q) ||
    duty.ksbs.some((code) => code.toLowerCase().includes(q))
  );
}

function DutyItems({ list }: { list: Duty[] }) {
  return (
    <ol className="duty-list">
      {list.map((duty) => (
        <li key={duty.id} className="duty-card">
          <span className="duty-id">{duty.id}</span>
          <p className="duty-text">{duty.text}</p>
          <ul className="duty-ksbs" aria-label={`KSBs covered by ${duty.id}`}>
            {duty.ksbs.map((code) => (
              <li key={code} className={`duty-chip duty-chip-${code[0]}`}>{code}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

/**
 * Shared collapse/expand primitive for both the K/S/B groups and the duty groups.
 * `forceOpen` is set while a search is active: a group with matches must be visible
 * without the reader having to expand it themselves, so the trigger is disabled
 * (not hidden — the header, and the fact that it is a match, stays visible) rather
 * than fighting the open state.
 */
function Accordion({
  id,
  groupClassName,
  forceOpen,
  left,
  count,
  children,
}: {
  id: string;
  groupClassName: string;
  forceOpen: boolean;
  left: React.ReactNode;
  count: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const isOpen = forceOpen || open;
  const panelId = `${id}-panel`;

  return (
    <div className={groupClassName}>
      <h3 id={id}>
        <button
          type="button"
          className="ksb-accordion-trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          disabled={forceOpen}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="ksb-accordion-left">{left}</span>
          <span className="ksb-group-count">{count}</span>
          <span className="ksb-accordion-chevron" aria-hidden="true" />
        </button>
      </h3>
      {/* Outer animates its grid track (0fr↔1fr); inner clips. `inert` keeps the
          collapsed content out of tab order and the a11y tree without display:none,
          which would kill the height transition. */}
      <section
        id={panelId}
        aria-labelledby={id}
        className="ksb-accordion-panel-outer"
        data-open={isOpen || undefined}
      >
        <div className="ksb-accordion-panel-clip">
          <div className="ksb-accordion-panel" inert={!isOpen}>
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}

function KsbCard({ ksb }: { ksb: Ksb }) {
  const [open, setOpen] = useState(false);
  const textId = `ksb-text-${ksb.id}`;
  const expandable = ksb.text.length > EXPAND_THRESHOLD;

  return (
    <li className="ksb-card">
      <span className="ksb-code">{ksb.id}</span>
      <p id={textId} className={expandable && !open ? 'ksb-text is-clamped' : 'ksb-text'}>
        {ksb.text}
      </p>
      {expandable && (
        <button
          type="button"
          className="ksb-more"
          aria-expanded={open}
          aria-controls={textId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Show less' : 'Show more'}
          <span className="sr-only"> of {ksb.id}</span>
        </button>
      )}
    </li>
  );
}

function KsbGroups({ list, query, idPrefix }: { list: Ksb[]; query: string; idPrefix: string }) {
  const groups = TYPES.map((type) => ({
    type,
    items: byType(list, type).filter((k) => matches(k, query)),
    total: byType(list, type).length,
  }));
  const anyResults = groups.some((g) => g.items.length > 0);
  const forceOpen = query.trim().length > 0;

  if (!anyResults) {
    return <p className="ksb-empty">No KSBs here match “{query}”. Try a code such as K12, or a word like “colour”.</p>;
  }

  return (
    <div className="ksb-groups">
      {groups.map((group) =>
        group.items.length === 0 ? null : (
          <Accordion
            key={group.type}
            id={`${idPrefix}-${group.type}`}
            groupClassName={`ksb-group ksb-group-${group.type}`}
            forceOpen={forceOpen}
            left={
              <>
                <span className="ksb-group-letter" aria-hidden="true">{group.type}</span>
                {typeLabels[group.type].plural}
              </>
            }
            count={query ? `${group.items.length} of ${group.total}` : group.total}
          >
            <ul className="ksb-list">
              {group.items.map((ksb) => (
                <KsbCard key={ksb.id} ksb={ksb} />
              ))}
            </ul>
          </Accordion>
        ),
      )}
    </div>
  );
}

export function KsbBrowser() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<PathwayId>('2d');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const searchId = useId();

  const activePathway = pathways.find((p) => p.id === active)!;
  const pathwayList = useMemo(() => ksbsForPathway(active), [active]);

  const coreMatches = coreKsbs.filter((k) => matches(k, query)).length;
  const pathwayMatches = pathwayList.filter((k) => matches(k, query)).length;

  // One entry per accordion in the duties section: core, then each pathway in turn.
  const dutyGroups = [
    { id: 'duties-core', label: 'Core duties', list: coreDuties },
    ...pathways.map((pathway) => ({
      id: `duties-${pathway.id}`,
      label: `${pathway.name} (${pathway.specialism}) duties`,
      list: dutiesForPathway(pathway.id),
    })),
  ];
  const anyDutyResults = dutyGroups.some((group) => group.list.some((duty) => dutyMatches(duty, query)));
  const dutyForceOpen = query.trim().length > 0;

  // Roving tabindex: arrows move between pathways, Home/End jump to the ends.
  function onTabKeyDown(event: React.KeyboardEvent, index: number) {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: pathways.length - 1,
    };
    const next = keys[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const wrapped = (next + pathways.length) % pathways.length;
    setActive(pathways[wrapped].id);
    tabRefs.current[wrapped]?.focus();
  }

  return (
    <>
      <div className="ksb-bar">
        <div className="ksb-bar-inner">
          <nav className="ksb-jump" aria-label="Sections on this page">
            <a href="#core-ksbs">Core</a>
            <a href="#pathway-ksbs">By pathway</a>
            <a href="#duties">Duties</a>
          </nav>
          <div className="ksb-search">
            <label htmlFor={searchId}>Search KSBs</label>
            <input
              id={searchId}
              type="search"
              value={query}
              placeholder="Search by code or keyword, e.g. K12"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <p className="ksb-count" aria-live="polite">
            {query
              ? `${coreMatches + pathwayMatches} KSBs match`
              : `${coreKsbs.length} core + ${pathwayList.length} pathway`}
          </p>
        </div>
      </div>

      <section id="core-ksbs" className="ksb-section" aria-labelledby="core-ksbs-heading">
        <ScrollReveal className="ksb-section-head">
          <span className="ksb-eyebrow">EVERY APPRENTICE</span>
          <h2 id="core-ksbs-heading">Core KSBs</h2>
          <p>
            These {coreKsbs.length} apply to you whichever pathway you take. They cover how VFX work moves
            through a production, how you look after the material you are given, and how you work with the
            people around you.
          </p>
        </ScrollReveal>
        <KsbGroups list={coreKsbs} query={query} idPrefix="core" />
      </section>

      <section id="pathway-ksbs" className="ksb-section" aria-labelledby="pathway-ksbs-heading">
        <ScrollReveal className="ksb-section-head">
          <span className="ksb-eyebrow">YOUR SPECIALISM</span>
          <h2 id="pathway-ksbs-heading">Pathway KSBs</h2>
          <p>
            These sit <strong>on top of</strong> the core above, and they are the ones that change with your
            pathway. Pick a pathway to see only what applies to it.
          </p>
        </ScrollReveal>

        <div className="ksb-tabs" role="tablist" aria-label="Choose a pathway">
          {pathways.map((pathway, index) => (
            <button
              key={pathway.id}
              type="button"
              role="tab"
              id={`tab-${pathway.id}`}
              aria-selected={active === pathway.id}
              aria-controls={`panel-${pathway.id}`}
              tabIndex={active === pathway.id ? 0 : -1}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className={active === pathway.id ? 'is-active' : ''}
              onClick={() => setActive(pathway.id)}
              onKeyDown={(e) => onTabKeyDown(e, index)}
            >
              <span className="ksb-tab-number">{pathway.number}</span>
              <span className="ksb-tab-name">
                {pathway.name}
                <strong>{pathway.specialism}</strong>
              </span>
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
          tabIndex={0}
          className="ksb-panel"
        >
          <p className="ksb-panel-note">
            <strong>
              {activePathway.name} ({activePathway.specialism})
            </strong>{' '}
            adds {pathwayList.length} KSBs to the {coreKsbs.length} core, giving{' '}
            {coreKsbs.length + pathwayList.length} in total.
          </p>
          <KsbGroups list={pathwayList} query={query} idPrefix={`pathway-${active}`} />
        </div>
      </section>

      <section
        id="duties"
        className="ksb-section ksb-duties-section"
        aria-labelledby="duties-heading"
      >
        <ScrollReveal className="ksb-section-head">
          <span className="ksb-eyebrow">WHAT THE ROLE DOES</span>
          <h2 id="duties-heading">Occupational duties</h2>
          <p>
            The standard also sets out {duties.length} duties — the actual jobs of work the role is expected
            to do. Each one draws on a set of KSBs, listed against it, so you can see how the criteria above
            show up in real production tasks.
          </p>
        </ScrollReveal>

        {anyDutyResults ? (
          <div className="ksb-groups">
            {dutyGroups.map((group) => {
              const filtered = group.list.filter((duty) => dutyMatches(duty, query));
              if (filtered.length === 0) return null;
              return (
                <Accordion
                  key={group.id}
                  id={group.id}
                  groupClassName="ksb-group duty-group"
                  forceOpen={dutyForceOpen}
                  left={group.label}
                  count={query ? `${filtered.length} of ${group.list.length}` : group.list.length}
                >
                  <DutyItems list={filtered} />
                </Accordion>
              );
            })}
          </div>
        ) : (
          <p className="ksb-empty">No duties match “{query}”.</p>
        )}
      </section>
    </>
  );
}
