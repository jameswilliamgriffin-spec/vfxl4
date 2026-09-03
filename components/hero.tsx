'use client';

import { MeshGradient } from '@paper-design/shaders-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

// Ink keeps most of the field dark so the plate and headline stay dominant. Creative
// Alliance orange leads the colour, a deeper amber gives it falloff, and the Viridian
// green puts both brands in the same wash.
const shaderColors = ['#0a0f0c', '#f78f21', '#f9a83f', '#b85a14', '#8bcab8'];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.32], ['0%', reduceMotion ? '0%' : '10%']);

  return (
    <section id="top" className="hero">
      <motion.div
        className="hero-image-wrap"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease }}
      >
        <MeshGradient
          className="hero-shader"
          colors={shaderColors}
          distortion={0.9}
          swirl={0.7}
          grainMixer={0.3}
          grainOverlay={0.15}
          speed={reduceMotion ? 0 : 0.8}
          frame={reduceMotion ? 8000 : 0}
          maxPixelCount={1600 * 900}
        />
        <motion.img
          style={{ y: imageY }}
          src="/assets/academy-greenscreen-stage.png"
          alt="Viridian Academy green-screen production stage"
        />
        <div className="image-grade" aria-hidden="true" />
      </motion.div>

      <div className="hero-content">
        <motion.h1 className="hero-title">
          {['Junior', 'Visual Effects', 'Level 4.'].map((line, index) => (
            <span className="title-line" key={line}>
              <motion.span
                initial={reduceMotion ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.12 + index * 0.1, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.div
          className="hero-intro"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease }}
        >
          <p>
            An 18-month production-led programme for emerging artists and technical talent —
            combining workplace practice, structured training and preparation for end-point assessment.
          </p>
          <p className="collaboration-line">
            A collaboration between Creative Alliance &amp; Viridian FX.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
