/* ============================================
   Hook: useScrollDirection
   Mendeteksi arah scroll (up/down)
   Digunakan oleh Navbar untuk hide/show
   ============================================ */
import { useState, useEffect, useRef } from 'react';

export default function useScrollDirection() {
  const [direction, setDirection] = useState('up');
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateDirection = () => {
      const current = window.scrollY;
      setScrollY(current);

      if (current <= 60) {
        setDirection('up');
      } else if (current > lastScrollY.current) {
        setDirection('down');
      } else {
        setDirection('up');
      }

      lastScrollY.current = current;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateDirection);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { direction, scrollY };
}