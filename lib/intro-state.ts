// Tiny cross-component signal for the one-time site intro. The overlay
// (components/site-intro.tsx) calls finishIntro() when it has played or been
// skipped; the hero waits on it so its entrance doesn't run behind the overlay.
// Module-level so a component mounting after the intro has already finished still
// reads the settled state synchronously.

let done = false;
const listeners = new Set<() => void>();

export const isIntroDone = () => done;

export function finishIntro() {
  if (done) return;
  done = true;
  for (const listener of listeners) listener();
}

export function subscribeIntro(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}
