/**
 * Closing marker for a homepage section — the bookend to <SectionRule /> at the
 * top. A thin metadata strip: sequence number, what just ended, and an END tick.
 * Purely decorative; hidden from assistive tech.
 */
export function SectionEnd({ seq, label }: { seq: string; label: string }) {
  return (
    <div className="section-end" aria-hidden="true">
      <span className="section-end-seq">SEQ {seq}</span>
      <span className="section-end-label">{label}</span>
      <span className="section-end-tick">END</span>
    </div>
  );
}
