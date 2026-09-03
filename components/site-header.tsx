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
        <Image className="viridian-mark" src="/assets/viridian-academy-logo.png" width={148} height={20} alt="Viridian Academy" priority />
        <span className="brand-divider" aria-hidden="true" />
        <span className="programme-mark">VFX L4 <small>PROGRAMME</small></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item, index) => (
          <a key={item.label} href={item.href}><span className="nav-index">0{index + 1}</span><span>{item.label}</span></a>
        ))}
      </nav>
      <div className="provider-mark" aria-label="Training provider: Creative Alliance">
        <span>TRAINING<br />PROVIDER</span>
        <Image src="/assets/creative-alliance.svg" width={30} height={30} alt="Creative Alliance" />
      </div>
    </motion.header>
  );
}
