/* ============================================
   TimelineGlowCard — Spotlight glow mengikuti mouse
   Digunakan khusus di TimelineSection
   ============================================ */
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './TimelineGlowCard.css';

export default function TimelineGlowCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  /* Track mouse position relative to card */
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`timeline-glow-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        '--glow-x': `${glowPos.x}%`,
        '--glow-y': `${glowPos.y}%`,
        '--glow-opacity': isHovered ? 0.8 : 0,
      }}
    >
      {/* Glow spotlight overlay */}
      <div className="timeline-glow-spotlight" />
      {children}
    </motion.div>
  );
}
