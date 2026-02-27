/* ============================================
   CountdownSection — Hitung mundur ke acara
   Background overlay PNG + counter boxes
   Efek: angka flip/pulse + mouse repel
   ============================================ */
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useCountdown from '../hooks/useCountdown';
import './CountdownSection.css';

/* Kotak angka countdown individual dengan repel effect */
function CountdownBox({ value, label }) {
  const padded = String(value).padStart(2, '0');
  const boxRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * -0.25;
    const distY = (e.clientY - centerY) * -0.25;
    setOffset({
      x: Math.max(-25, Math.min(25, distX)),
      y: Math.max(-25, Math.min(25, distY)),
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={boxRef}
      className="countdown-item"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 0 40px rgba(255, 0, 170, 0.5)',
      }}
      animate={{
        x: offset.x,
        y: offset.y,
      }}
      transition={{
        hover: { type: 'spring', stiffness: 300, damping: 15 },
        default: { type: 'spring', stiffness: 250, damping: 25 },
      }}
    >
      {/* Angka — animasi flip ketika berubah */}
      <motion.span
        key={padded}
        className="countdown-num"
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {padded}
      </motion.span>
      <span className="countdown-unit">{label}</span>
    </motion.div>
  );
}

export default function CountdownSection() {
  /* Target: 8 Mei 2026, 13:00 WIB */
  const { days, hours, minutes, seconds, targetDateString } = useCountdown(
    '2026-05-08T13:00:00+07:00'
  );

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section section-countdown">
      {/* Background layer */}
      <div className="countdown-bg" aria-hidden="true" />

      <div className="container" ref={ref}>
        {/* Section title */}
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="pixel-bracket">[</span> Countdown{' '}
          <span className="pixel-bracket">]</span>
        </motion.h2>

        <motion.p
          className="countdown-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Getting ready for AIRFEST 26
        </motion.p>

        {/* Countdown boxes */}
        <motion.div
          className="countdown-boxes"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <CountdownBox value={days} label="Days" />
          <CountdownBox value={hours} label="Hours" />
          <CountdownBox value={minutes} label="Minutes" />
          <CountdownBox value={seconds} label="Seconds" />
        </motion.div>

        {/* Tanggal target */}
        <motion.p
          className="countdown-date"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {targetDateString}
        </motion.p>
        <br />
      </div>
    </section>
  );
}