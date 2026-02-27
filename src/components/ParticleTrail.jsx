/* ============================================
   ParticleTrail — Partikel kecil mengikuti
   gerakan mouse, menghilang perlahan
   Efek cyberpunk space trail
   ============================================ */
import React, { useEffect, useRef } from 'react';
import './ParticleTrail.css';

export default function ParticleTrail() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -100, y: -100 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      /* Setiap gerakan mouse menambah 2 partikel baru */
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          decay: 0.015 + Math.random() * 0.02,
          size: Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? '#00f5ff' : '#ff00aa',
        });
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    /* Animation loop */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => p.life > 0);

      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-trail-canvas" />;
}