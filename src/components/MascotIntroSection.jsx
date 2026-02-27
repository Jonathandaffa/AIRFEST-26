/* ============================================
   MascotIntroSection — "Introduce our Mascot"
   Banner teks atas + Panel mascot utama
   Efek: banner sedikit diperkecil, mascot
   diperbesar, mouse-follow zoom + 3D tilt
   Dekorasi: draggable emoji di kanan kiri
   ============================================ */
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useMouseTilt from '../hooks/useMouseTilt';
import DraggableEmoji from './DraggableEmoji';
import './MascotIntroSection.css';

export default function MascotIntroSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { elementRef: panelRef, tilt, handleMouseMove, handleMouseLeave } = useMouseTilt(18, 1.15);

  return (
    <section className="section section-mascot-intro" ref={ref}>
      <div className="container">
        <div className="mascot-layout">
          {/* Banner teks atas — sedikit diperkecil */}
          <motion.div
            className="mascot-top-banner"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.img
              src="/assets/texttop.png"
              alt="Meet the mission crew"
              className="mascot-img-top"
              draggable="false"
              animate={{ scale: 0.92 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Panel mascot utama — diperbesar dengan 3D tilt */}
          <motion.div
            ref={panelRef}
            className="mascot-hero-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="mascot-hero-inner"
              animate={{
                rotateY: tilt.y,
                rotateX: tilt.x,
                scale: tilt.scale,
              }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
            >
              <motion.img
                src="/assets/mascotintro.png"
                alt="Maskot utama AIRFEST 26"
                className="mascot-hero-img"
                draggable="false"
                animate={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Draggable emoji decorations */}
        <DraggableEmoji emoji="🌙" side="left" delay={0.2} style={{ top: '15%' }} />
        <DraggableEmoji emoji="⭐" side="left" delay={0.8} style={{ top: '65%' }} />
        <DraggableEmoji emoji="🪐" side="right" delay={0.4} style={{ top: '20%' }} />
        <DraggableEmoji emoji="🌠" side="right" delay={0.6} style={{ top: '70%' }} />
      </div>
    </section>
  );
}