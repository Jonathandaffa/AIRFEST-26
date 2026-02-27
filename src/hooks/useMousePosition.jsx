/* ============================================
   Hook: useMousePosition
   Melacak posisi mouse secara global
   Digunakan oleh NeonCursor & ParticleTrail
   ============================================ */
import { useState, useEffect } from 'react';

export default function useMousePosition() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return position;
}