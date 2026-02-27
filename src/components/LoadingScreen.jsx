/* ============================================
   LoadingScreen — Animasi pembuka website
   Bar loading dengan persentase, logo AIRFEST
   Tema space/cyberpunk
   ============================================ */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (progress >= 100) {
      // Delay untuk memastikan Hero tidak muncul bersamaan
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }

    const duration = 800 + Math.random() * 1000; // Random speed 2.5-3.5s
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = (100 / (duration / 100));
        const newProgress = Math.min(prev + increment, 100);
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
    >
      {/* Background stars/particles */}
      <div className="loading-bg-stars" aria-hidden="true">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="loading-star"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.05,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="loading-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <motion.img
          src="/assets/Logo.png"
          alt="AIRFEST 26"
          className="loading-logo"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        {/* Progress bar */}
        <div className="loading-bar-wrap">
          <div className="loading-bar-bg">
            <motion.div
              className="loading-bar-fill"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
            {/* Glow effect */}
            <motion.div
              className="loading-bar-glow"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>

        {/* Percentage text */}
        <motion.div
          className="loading-percent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="loading-number">
            {Math.floor(progress)}
          </span>
          <span className="loading-symbol">%</span>
        </motion.div>

        {/* Sub text */}
        <motion.p
          className="loading-text"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          STEP INTO VAST MAGICAL EVENT...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
