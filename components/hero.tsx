'use client';

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import type { PointerEvent } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.32], ['0%', reduceMotion ? '0%' : '12%']);
  const titleY = useTransform(scrollYProgress, [0, 0.25], ['0%', reduceMotion ? '0%' : '-9%']);
  const pointerX = useMotionValue(78);
  const pointerY = useMotionValue(48);
  const smoothX = useSpring(pointerX, { stiffness: 140, damping: 22, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 140, damping: 22, mass: 0.35 });

  function trackPointer(event: PointerEvent<HTMLElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  }

  return (
    <section id="top" className="hero grid-field" onPointerMove={trackPointer}>
      <div className="hero-topline" aria-hidden="true"><span>ST1325</span><span>OCCUPATIONAL STANDARD / V1.2</span><span>ACTIVE PROGRAMME</span></div>
      <motion.div className="hero-image-wrap" initial={reduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 1.25, delay: 0.18, ease }}>
        <motion.img style={{ y: imageY }} src="/assets/academy-greenscreen-stage.png" alt="Viridian Academy green-screen production stage" />
        <div className="image-grade" aria-hidden="true" />
        <div className="focus-brackets" aria-hidden="true"><i /><i /><i /><i /></div>
        <motion.div className="cursor-reticle" style={{ left: smoothX, top: smoothY }} aria-hidden="true"><span /></motion.div>
        <div className="image-data" aria-hidden="true"><span>PLATE / 001</span><span>2048 × 836</span><span>CAM A</span></div>
      </motion.div>
      <motion.h1 className="hero-title" style={{ y: titleY }}>
        {['VISUAL', 'EFFECTS', 'LEVEL 4'].map((line, index) => (
          <span className={`title-line line-${index + 1}`} key={line}>
            <motion.span initial={reduceMotion ? false : { y: '115%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.18 + index * 0.12, ease }}>{line}</motion.span>
          </span>
        ))}
      </motion.h1>
      <motion.div className="hero-intro" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85, ease }}>
        <span className="signal-label"><i /> JUNIOR VFX APPRENTICESHIP</span>
        <p>An 18-month production-led programme for emerging artists and technical talent — combining workplace practice, structured training and preparation for end-point assessment.</p>
      </motion.div>
      <div className="hero-spec" aria-label="Programme facts">
        <Spec value="03" label="SPECIALIST PATHWAYS" /><Spec value="18" label="MONTHS ON PROGRAMME" /><Spec value="02" label="EPA METHODS" />
      </div>
      <a className="scroll-cue" href="#overview"><span>ENTER PROGRAMME</span><i aria-hidden="true" /></a>
    </section>
  );
}

function Spec({ value, label }: { value: string; label: string }) {
  return <div><strong>{value}</strong><span>{label}</span></div>;
}
