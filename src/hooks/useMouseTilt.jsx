/* ============================================
   Hook: useMouseTilt
   Melacak posisi mouse untuk 3D tilt effect
   Mengembalikan rotasi X/Y dan skala zoom
   ============================================ */
import { useState, useRef } from 'react';

export default function useMouseTilt(intensity = 15, scale = 1.1) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, scale: 1 });
  const elementRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const relX = (e.clientX - centerX) / (rect.width / 2);
    const relY = (e.clientY - centerY) / (rect.height / 2);
    
    setTilt({
      x: relY * intensity,
      y: relX * intensity,
      scale: scale,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, scale: 1 });
  };

  return { elementRef, tilt, handleMouseMove, handleMouseLeave };
}
