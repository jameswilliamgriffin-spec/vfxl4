'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: "KSB'S", href: '/ksbs' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'TRAINING', href: '/training' },
  { label: 'EPA', href: '/epa' },
  { label: 'TRAINING PLAN', href: '/training-plan' },
];

export function SiteHeader() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  return (
    <motion.header className="site-header" initial={reduceMotion ? false : { y: -72 }} animate={{ y: 0 }} transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}>
      <Link className="brand-lockup" href="/" aria-label="Visual Effects Level 4 home">
        <Image className="creative-alliance-mark" src="/assets/creative-alliance.svg" width={38} height={38} alt="Creative Alliance" priority />
        <Image className="viridian-mark" src="/assets/viridian-academy-logo.png" width={2048} height={274} alt="Viridian Academy" priority />
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={active ? 'is-active' : undefined}
              aria-current={active ? 'page' : undefined}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
}
