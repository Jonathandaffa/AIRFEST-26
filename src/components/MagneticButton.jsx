/* ============================================
   MagneticButton — Tombol yang "tertarik"
   ke arah mouse saat hover (efek magnet)
   ============================================ */
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './MagneticButton.css';

export default function MagneticButton({ children, href, className = '', onClick }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    /* Geser 30% dari jarak mouse ke center */
    setPos({
      x: (e.clientX - centerX) * 0.3,
      y: (e.clientY - centerY) * 0.3,
    });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      href={href}
      className={`magnetic-btn ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Tag>
  );
}