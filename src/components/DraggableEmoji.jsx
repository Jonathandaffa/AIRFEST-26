/* ============================================
   DraggableEmoji — Floating draggable emoji
   Digunakan di MascotIntroSection untuk
   dekorasi kanan kiri dengan bulan/tema space
   ============================================ */
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './DraggableEmoji.css';

export default function DraggableEmoji({ emoji, position, side, delay = 0 }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging]);

  return (
    <motion.div
      className={`draggable-emoji draggable-emoji-${side}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: isDragging ? 0 : [0, -15, 0] }}
      transition={isDragging ? { delay, duration: 0.5 } : {
        y: {
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      style={{
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleDragStart}
    >
      <span className="emoji-char">{emoji}</span>
    </motion.div>
  );
}
