/* ============================================
   RegistrationPage — Halaman Pendaftaran Lomba
   
   LAYOUT:
   - Title: "[ Pendaftaran Lomba ]"
   - Subtitle
   - Grid 3×3: 9 CompetitionCard
   - Scroll-triggered stagger animation
   
   Navbar & Footer sudah di App.jsx,
   tidak perlu dipanggil lagi di sini.
   ============================================ */
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CompetitionCard from '../components/CompetitionCard';
import competitions from '../data/competitions';

/* background and layout */
import Navbar from '../components/Navbar';
import StarField from '../components/StarField';
import GridOverlay from '../components/GridOverlay';
import Footer from '../components/Footer';

import './RegistrationPage.css';

/* Stagger variants untuk grid */
const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const gridItemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function RegistrationPage() {
  /* Scroll ke atas saat halaman dimuat */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <div className="registration-page">
      <Navbar />
      <StarField />
      <GridOverlay />

      <main className="section registration-section">
        <div className="registration-container">
          {/* === Title === */}
          <motion.h2
            className="section-title registration-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="pixel-bracket">[</span> Pendaftaran Lomba{' '}
            <span className="pixel-bracket">]</span>
          </motion.h2>

          {/* === Subtitle === */}
          <motion.p
            className="registration-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Pilih lomba dan daftarkan timmu sekarang!
          </motion.p>

          {/* === Grid 3×3 === */}
          <motion.div
            ref={ref}
            className="registration-grid"
            variants={gridContainerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {competitions.map((comp) => (
              <motion.div
                key={comp.id}
                className="registration-grid-item"
                variants={gridItemVariants}
              >
                <CompetitionCard
                  name={comp.name}
                  level={comp.level}
                  status={comp.status}
                  image={comp.image}
                  guideBook={comp.guideBook}
                  registerUrl={comp.registerUrl}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}