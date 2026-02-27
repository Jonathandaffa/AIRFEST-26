/* ============================================
   TextScatter — Teks yang "menghindar"
   dari mouse saat pointer mendekat
   Setiap huruf bergerak menjauhi cursor
   ============================================ */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import './TextScatter.css';

export default function TextScatter({ text, className = '' }) {
  const containerRef = useRef(null);
  const [letters, setLetters] = useState([]);
  const mousePos = useRef({ x: -1000, y: -1000 });

  /* Inisialisasi posisi setiap huruf */
  useEffect(() => {
    setLetters(
      text.split('').map((char, i) => ({
        char,
        id: i,
        offsetX: 0,
        offsetY: 0,
      }))
    );
  }, [text]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      /* Hitung offset per huruf */
      const spans = containerRef.current.querySelectorAll('.scatter-letter');
      const newLetters = [];

      spans.forEach((span, i) => {
        const sRect = span.getBoundingClientRect();
        const sx = sRect.left + sRect.width / 2 - rect.left;
        const sy = sRect.top + sRect.height / 2 - rect.top;
        const dx = sx - mousePos.current.x;
        const dy = sy - mousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 80; /* Jarak pengaruh mouse */

        let offsetX = 0;
        let offsetY = 0;

        if (dist < maxDist && dist > 0) {
          const force = ((maxDist - dist) / maxDist) * 25;
          offsetX = (dx / dist) * force;
          offsetY = (dy / dist) * force;
        }

        newLetters.push({
          char: text[i],
          id: i,
          offsetX,
          offsetY,
        });
      });

      setLetters(newLetters);
    },
    [text]
  );

  const handleMouseLeave = () => {
    setLetters((prev) =>
      prev.map((l) => ({ ...l, offsetX: 0, offsetY: 0 }))
    );
  };

  return (
    <span
      ref={containerRef}
      className={`text-scatter ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {letters.map((l) => (
        <motion.span
          key={l.id}
          className="scatter-letter"
          animate={{ x: l.offsetX, y: l.offsetY }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ display: 'inline-block' }}
        >
          {l.char === ' ' ? '\u00A0' : l.char}
        </motion.span>
      ))}
    </span>
  );
}