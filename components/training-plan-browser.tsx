'use client';

import { useState } from 'react';
import { ScrollReveal } from '@/components/motion-primitives';
import { ScrambleText } from '@/components/scramble-text';
import {
  PLAN_TOTAL_HOURS,
  planSections,
  progressReviews,
  sectionHours,
  type PlanSection,
} from '@/lib/training-plan-data';

// Whole numbers render bare; the 2.5-hour sessions keep one decimal.
const fmt = (n: number) => (Number.isInteger(n) ? `${n}` : n.toFixed(1));

function SectionRow({
  section,
  open,
  onToggle,
}: {
  section: PlanSection;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `tp-panel-${section.key}`;
  const headingId = `tp-heading-${section.key}`;
  const subtotal = sectionHours(section);

  return (
    <div className="tp-section">
      <h3 id={headingId} className="tp-section-h">
        <button
          type="button"
          className="tp-row-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="tp-row-key" aria-hidden="true">{section.key}</span>
          <span className="tp-row-title">{section.title}</span>
          <span className="tp-row-meta">
            {section.items.length} {section.items.length === 1 ? 'item' : 'items'}
          </span>
          <span className="tp-row-hours">
            {fmt(subtotal)}<i> hrs</i>
          </span>
          <span className="tp-row-chevron" aria-hidden="true" />
        </button>
      </h3>

      {/* Outer animates its grid track (0fr↔1fr); inner clips. `inert` keeps the
          collapsed rows out of tab order without display:none, which would kill
          the height transition. */}
      <div className="tp-panel-outer" data-open={open || undefined}>
        <div className="tp-panel-clip">
          <div className="tp-panel" id={panelId} aria-labelledby={headingId} inert={!open}>
            <p className="tp-blurb">{section.blurb}</p>
            <ol className="tp-items">
              {section.items.map((item) => (
                <li key={item.label}>
                  <span className="tp-item-label">{item.label}</span>
                  <span className="tp-item-hours">{fmt(item.hours)}</span>
                </li>
              ))}
            </ol>
            <p className="tp-subtotal">
              <span>Section {section.key} subtotal</span>
              <span className="tp-subtotal-hours">{fmt(subtotal)} hrs</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrainingPlanBrowser() {
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());
  const allOpen = planSections.every((section) => openKeys.has(section.key));

  function toggle(key: string) {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleAll() {
    setOpenKeys(allOpen ? new Set() : new Set(planSections.map((section) => section.key)));
  }

  const total = planSections.reduce((sum, section) => sum + sectionHours(section), 0);

  return (
    <section className="tp" aria-labelledby="tp-title">
      <div className="tp-bar">
        <div className="tp-bar-inner">
          <p className="tp-bar-count">
            {fmt(total)} off-the-job hours{total !== PLAN_TOTAL_HOURS ? ' (check)' : ''} · {planSections.length} sections
          </p>
          <button
            type="button"
            className="tp-expand-all"
            aria-expanded={allOpen}
            onClick={toggleAll}
          >
            {allOpen ? 'Collapse all' : 'Expand all'}
            <span className="tp-expand-all-chevron" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="tp-body">
        <ScrollReveal className="tp-intro">
          <ScrambleText className="ksb-eyebrow" text="THE HOURS" />
          <h2 id="tp-title">Where your training hours go</h2>
          <p>
            Every apprentice completes {fmt(total)} hours of off-the-job training across the {' '}
            {planSections.length} areas below. The plan opens on the overview — expand any section, or
            expand them all, to see the individual sessions and how the hours are attributed.
          </p>
        </ScrollReveal>

        <div className="tp-list">
          {planSections.map((section) => (
            <SectionRow
              key={section.key}
              section={section}
              open={openKeys.has(section.key)}
              onToggle={() => toggle(section.key)}
            />
          ))}

          <p className="tp-total">
            <span className="tp-total-label">Total off-the-job training</span>
            <span className="tp-total-hours">{fmt(total)} hrs</span>
          </p>
        </div>

        <ScrollReveal className="tp-reviews" delay={0.05}>
          <div className="tp-reviews-inner">
            <span className="tp-reviews-tag">NOT COUNTED IN THE TOTAL</span>
            <h3>{progressReviews.title}</h3>
            <p>{progressReviews.detail}</p>
            <p className="tp-reviews-figure">
              {progressReviews.count} reviews · ~{progressReviews.hoursEach} hrs each
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
