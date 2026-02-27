/* ============================================
   NeonCursor — Custom cursor neon cyberpunk
   Lingkaran besar (outer) + titik kecil (inner)
   Outer mengikuti mouse dengan delay spring
   ============================================ */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from '../hooks/useMousePosition';
import './NeonCursor.css';

export default function NeonCursor() {
  const { x, y } = useMousePosition();
  const [trail, setTrail] = useState([]);
  const [isInteractive, setIsInteractive] = useState(false);

  // maintain short trail of previous positions
  useEffect(() => {
    setTrail(prev => {
      const next = [{ x, y }, ...prev];
      return next.slice(0, 8);
    });
  }, [x, y]);

  // detect if element under cursor is interactive (link/button/input)
  useEffect(() => {
    const el = document.elementFromPoint(x, y);
    if (!el) return setIsInteractive(false);
    const tag = el.tagName && el.tagName.toLowerCase();
    const clickable = el.closest && (el.closest('a,button,[role="button"],input,select,textarea') !== null);
    setIsInteractive(Boolean(clickable || tag === 'a' || tag === 'button'));
  }, [x, y]);

  return (
    <>
      {/* Trail dots (fading) */}
      {trail.map((p, i) => (
        <motion.div
          key={i}
          className="neon-cursor-dot"
          animate={{ x: p.x - 4, y: p.y - 4, opacity: 1 - i * 0.12, scale: 1 - i * 0.06 }}
          transition={{ type: 'tween', duration: 0.12 }}
        />
      ))}

      {/* Inner dot — mengikuti mouse langsung */}
      <motion.div
        className={`neon-cursor-inner ${isInteractive ? 'interactive' : ''}`}
        animate={{ x: x - 4, y: y - 4 }}
        transition={{ type: 'tween', duration: 0 }}
      />

      {/* Outer ring — mengikuti mouse dengan delay */}
      <motion.div
        className={`neon-cursor-outer ${isInteractive ? 'interactive' : ''}`}
        animate={{ x: x - 20, y: y - 20 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
}