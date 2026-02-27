/* ============================================
   GlitchText — Efek glitch pada teks
   Teks bergetar/berubah warna secara random
   Digunakan di title & elemen tertentu
   ============================================ */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './GlitchText.css';

export default function GlitchText({ text, className = '', tag = 'span' }) {
  const [isGlitching, setIsGlitching] = useState(false);

  /* Glitch setiap 3-6 detik secara random */
  useEffect(() => {
    const trigger = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200 + Math.random() * 300);
    };

    const interval = setInterval(trigger, 3000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  const Tag = tag;

  return (
    <Tag
      className={`glitch-text ${isGlitching ? 'glitching' : ''} ${className}`}
      data-text={text}
    >
      {text}
    </Tag>
  );
}