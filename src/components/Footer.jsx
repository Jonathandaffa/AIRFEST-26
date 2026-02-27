/* ============================================
   Footer — Logo kiri, teks kanan (2 baris),
   Social media bawah dengan hover effects
   ============================================ */
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Footer.css';

/* Data social media — sesuai konten asli */
const socials = [
  { name: 'INSTAGRAM', href: '#', className: 'footer-link-ig' },
  { name: 'TIKTOK', href: '#', className: 'footer-link-tt' },
  { name: 'YOUTUBE', href: '#', className: 'footer-link-yt' },
  { name: 'THREADS', href: '#', className: 'footer-link-th' },
  { name: 'TELEGRAM', href: '#', className: 'footer-link-tg' },
];

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <footer id="pendaftaran" className="footer" ref={ref}>
      <div className="footer-frame">
        {/* Bagian atas: logo kiri + teks kanan */}
        <motion.div
          className="footer-top"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-logo-wrap">
            <img
              src="/assets/logofoot.png"
              alt="AIRFEST 26"
              className="footer-logo-img"
              draggable="false"
            />
          </div>
          <div className="footer-text-wrap">
            <p className="footer-line1">Ardhu Ibad Ar Rahman Festival</p>
            <p className="footer-line2">
              EXTERNAL SCHOOL FESTIVAL BY IKATAN SANTRI IBAD AR RAHMAN
            </p>
          </div>
        </motion.div>

        {/* Bagian bawah: social media */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="footer-social">
            {socials.map((s) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className={`footer-link ${s.className}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                {s.name} <span className="footer-link-arrow">↗</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}