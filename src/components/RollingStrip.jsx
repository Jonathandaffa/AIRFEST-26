/* ============================================
   RollingStrip — Kotak teks "AIRFEST 26"
   bergulir unlimited ke kanan
   Efek: kecepatan standar + mouse repel
   ============================================ */
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './RollingStrip.css';

export default function RollingStrip() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  /* Generate 20 item */
  const items = Array.from({ length: 20 }, (_, i) => i);

  /* Track mouse position untuk repel effect */
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleItemMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleItemMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div
      className="hero-rolling-wrap"
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="hero-rolling" aria-hidden="true">
        <div className="hero-rolling-track">
          {[...items, ...items].map((i) => (
            <motion.span
              key={i}
              className="hero-rolling-item"
              onMouseEnter={() => handleItemMouseEnter(i)}
              onMouseLeave={handleItemMouseLeave}
              animate={{
                y: hoveredIndex === i ? -30 : 0,
                x: hoveredIndex === i ? 20 : 0,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              AIRFEST 26
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}