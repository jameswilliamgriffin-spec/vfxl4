'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';

const navItems = [
  { label: "KSB'S", href: '#pathways' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'TRAINING', href: '#training' },
  { label: 'EPA', href: '#epa' },
];

export function SiteHeader() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.header className="site-header" initial={reduceMotion ? false : { y: -72 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <a className="brand-lockup" href="#top" aria-label="Visual Effects Level 4 home">
        <Image className="creative-alliance-mark" src="/assets/creative-alliance.svg" width={38} height={38} alt="Creative Alliance" priority />
        <Image className="viridian-mark" src="/assets/viridian-academy-logo.png" width={168} height={23} alt="Viridian Academy" priority />
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.label} href={item.href}>{item.label}</a>
        ))}
      </nav>
    </motion.header>
  );
}
