/* ============================================
   GlowCard — Kartu dengan efek glow centr
   Glow effect hanya di tengah image
   Digunakan oleh timeline, philosophy, dll
   ============================================ */
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './GlowCard.css';

export default function GlowCard({ children, className = '' }) {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      className={`glow-card ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Center glow overlay */}
      <div className="glow-card-spotlight" />
      {children}
    </motion.div>
  );
}