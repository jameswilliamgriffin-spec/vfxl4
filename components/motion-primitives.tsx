'use client';

import { motion, useReducedMotion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

type MotionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

function animation(reduceMotion: boolean | null, delay: number) {
  return reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.16 },
        transition: { duration: 0.68, delay, ease },
      };
}

export function ScrollReveal({ children, className, delay = 0 }: MotionProps) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} {...animation(reduceMotion, delay)}>{children}</motion.div>;
}

export function RevealArticle({ children, className, delay = 0, id }: MotionProps & { id?: string }) {
  const reduceMotion = useReducedMotion();
  return <motion.article id={id} className={className} {...animation(reduceMotion, delay)}>{children}</motion.article>;
}

export function RevealListItem({ children, className, delay = 0 }: MotionProps) {
  const reduceMotion = useReducedMotion();
  return <motion.li className={className} {...animation(reduceMotion, delay)}>{children}</motion.li>;
}
