/* ============================================
   PhilosophySection — "Filosofi Logo"
   Baris atas: 2 panel | Baris bawah: 3 panel
   Side images: drop-shadow glow effect
   Center logo: zoom + 3D tilt effect saat mouse
   ============================================ */
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useMouseTilt from '../hooks/useMouseTilt';
import './PhilosophySection.css';

/* Variant animasi stagger untuk cards */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function PhilosophySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const { elementRef: logoRef, tilt, handleMouseMove: onLogoMouseMove, handleMouseLeave: onLogoMouseLeave } = useMouseTilt(20, 1.12);

  return (
    <section className="section section-philosophy">
      <div className="container philosophy-container" ref={ref}>
        {/* Section title */}
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="pixel-bracket">[</span> Filosofi Logo{' '}
          <span className="pixel-bracket">]</span>
        </motion.h2>

        <motion.div
          className="philosophy-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Baris atas: 2 panel */}
          <div className="philosophy-row philosophy-row-top">
            <motion.div variants={cardVariants}>
              <motion.div className="philosophy-card philosophy-left-top">
                <img
                  src="/assets/filosofilefttop.png"
                  alt="Filosofi huruf / simbol kiri atas"
                  className="philosophy-img"
                  draggable="false"
                />
              </motion.div>
            </motion.div>

            <motion.div variants={cardVariants}>
              <motion.div className="philosophy-card philosophy-right-top">
                <img
                  src="/assets/filosofirighttop.png"
                  alt="Filosofi huruf / simbol kanan atas"
                  className="philosophy-img"
                  draggable="false"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Baris bawah: 3 panel — kiri, logo tengah, kanan */}
          <div className="philosophy-row philosophy-row-bottom">
            <motion.div variants={cardVariants}>
              <motion.div className="philosophy-card philosophy-left-bottom">
                <img
                  src="/assets/filosofileftbottom.png"
                  alt="Filosofi elemen kiri bawah"
                  className="philosophy-img"
                  draggable="false"
                />
              </motion.div>
            </motion.div>

            {/* Logo tengah — zoom + 3D tilt seperti logo about  */}
            <motion.div
              variants={cardVariants}
              className="philosophy-logo-wrapper"
              ref={logoRef}
              onMouseMove={onLogoMouseMove}
              onMouseLeave={onLogoMouseLeave}
            >
              <motion.div className="philosophy-card philosophy-center-logo">
                <motion.img
                  src="/assets/Logo.png"
                  alt="Logo AIRFEST 26"
                  className="philosophy-img philosophy-logo-img"
                  draggable="false"
                  animate={{
                    x: tilt.y * 5,
                    y: tilt.x * 5,
                    scale: tilt.scale,
                  }}
                  transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                  style={{ transformStyle: 'preserve-3d' }}
                />
              </motion.div>
            </motion.div>

            <motion.div variants={cardVariants}>
              <motion.div className="philosophy-card philosophy-right-bottom">
                <img
                  src="/assets/filosofirightbottom.png"
                  alt="Filosofi elemen kanan bawah"
                  className="philosophy-img"
                  draggable="false"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}