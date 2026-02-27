/* ============================================
   CyberHudFrame — Frame HUD cyberpunk
   Dengan corner brackets dan scan-line effect
   Optional: glitch effect saat mouse hover
   Reusable wrapper component
   ============================================ */
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './CyberHudFrame.css';

export default function CyberHudFrame({ children, className = '', glitchActive = false }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={`cyber-hud-frame ${className} ${glitchActive ? 'cyber-hud-glitch' : ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Scan-line animated overlay */}
      <div className="cyber-hud-scanline" />

      {/* Corner brackets */}
      <div className="cyber-hud-corner cyber-hud-corner-tl" />
      <div className="cyber-hud-corner cyber-hud-corner-tr" />
      <div className="cyber-hud-corner cyber-hud-corner-bl" />
      <div className="cyber-hud-corner cyber-hud-corner-br" />

      {/* Glitch shadow effect */}
      {glitchActive && (
        <>
          <div className="cyber-hud-glitch-shadow cyber-hud-glitch-1" />
          <div className="cyber-hud-glitch-shadow cyber-hud-glitch-2" />
        </>
      )}

      <div className="cyber-hud-content">{children}</div>
    </motion.div>
  );
}