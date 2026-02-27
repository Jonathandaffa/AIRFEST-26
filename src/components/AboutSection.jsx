/* ============================================
   AboutSection — "Apa itu AIRFEST?"
   Dengan logo event, HUD frame, dan animasi
   scroll-triggered (reveal saat terlihat)
   Efek: logo glow+zoom+mouse-follow
   Box teks: repel + glitch shadow
   ============================================ */
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CyberHudFrame from './CyberHudFrame';
import './AboutSection.css';

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const logoRef = useRef(null);
  const contentRef = useRef(null);

  const [logoOffset, setLogoOffset] = useState({ x: 0, y: 0 });
  const [logoScale, setLogoScale] = useState(1);
  const [contentOffset, setContentOffset] = useState({ x: 0, y: 0 });
  const [glitchVisible, setGlitchVisible] = useState(false);

  /* Logo: zoom + mouse follow */
  const handleLogoMouseMove = (e) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.15;
    const distY = (e.clientY - centerY) * 0.15;
    setLogoOffset({ x: distX, y: distY });
    setLogoScale(1.1);
  };

  const handleLogoMouseLeave = () => {
    setLogoOffset({ x: 0, y: 0 });
    setLogoScale(1);
  };

  /* Content box: repel from mouse + glitch effect */
  const handleContentMouseMove = (e) => {
    if (!contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * -0.2;
    const distY = (e.clientY - centerY) * -0.2;
    setContentOffset({ x: Math.max(-20, Math.min(20, distX)), y: Math.max(-20, Math.min(20, distY)) });
    setGlitchVisible(true);
  };

  const handleContentMouseLeave = () => {
    setContentOffset({ x: 0, y: 0 });
    setGlitchVisible(false);
  };

  return (
    <section id="tentang" className="section section-about">
      <div className="container" ref={ref}>
        {/* Section title */}
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="pixel-bracket">[</span> Apa itu AIRFEST?{' '}
          <span className="pixel-bracket">]</span>
        </motion.h2>

        {/* Logo Event visual — zoom + mouse follow + glow */}
        <motion.div
          className="about-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          ref={logoRef}
          onMouseMove={handleLogoMouseMove}
          onMouseLeave={handleLogoMouseLeave}
        >
          <motion.div
            className="pixel-frame"
            animate={{
              x: logoOffset.x,
              y: logoOffset.y,
              scale: logoScale,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </motion.div>

        <br />

        {/* Deskripsi dalam CyberHudFrame — repel + glitch */}
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          ref={contentRef}
          onMouseMove={handleContentMouseMove}
          onMouseLeave={handleContentMouseLeave}
        >
          <motion.div
            animate={{
              x: contentOffset.x,
              y: contentOffset.y,
            }}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
            className="about-content-inner"
          >
            <CyberHudFrame glitchActive={glitchVisible}>
              <p className="about-text">
                AIRFEST 26 adalah event yang di selenggarakan oleh{' '}
                <strong>Santri Ibad Ar Rahman (IKSADA)</strong> dalam bentuk
                kompetisi untuk di ikuti siswa-siswa tingkat{' '}
                <strong>MTS/SMP</strong> dan <strong>SMA/MA/SMK</strong>{' '}
                se-Banten
              </p>
            </CyberHudFrame>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}