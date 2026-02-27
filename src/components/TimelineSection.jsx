/* ============================================
   TimelineSection — "Timeline Event"
   Garis tengah + event selang-seling kiri/kanan
   Setiap item muncul dengan animasi scroll
   Marker berkedip + spotlight glow saat mouse
   ============================================ */
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TimelineGlowCard from './TimelineGlowCard';
import './TimelineSection.css';

/* Data timeline — sesuai konten asli */
const timelineData = [
  { date: '29 Februari 2026', desc: 'Peluncuran website AIRFEST 26.', side: 'left' },
  { date: '1 Maret 2026', desc: 'Pendaftaran peserta batch pertama', side: 'right' },
  { date: '2 April 2026', desc: 'Penutupan pendaftaran peserta batch pertama', side: 'left' },
  { date: '4 April 2026', desc: 'Pendaftaran peserta batch kedua', side: 'right' },
  { date: '27 April 2026', desc: 'Penutupan pendaftaran peserta batch kedua', side: 'left' },
  { date: '2 Mei 2026', desc: 'Technical Meeting', side: 'right' },
  { date: '8 Mei 2026', desc: 'Opening Ceremo', side: 'left' },
  { date: '9 Mei 2026', desc: 'Opening Ceremony AIRFEST 26', side: 'right' },
  { date: '10 Mei 2026', desc: 'Closing Ceremony AIRFEST 26', side: 'left' },
];

/* Individual timeline item with scroll animation */
function TimelineItem({ date, desc, side, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const isLeft = side === 'left';

  return (
    <motion.div
      ref={ref}
      className={`timeline-item timeline-item--${side}`}
      initial={{
        opacity: 0,
        x: isLeft ? -60 : 60,
      }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: 'easeOut' }}
    >
      {isLeft ? (
        <>
          <TimelineGlowCard className="timeline-content">
            <h3>{date}</h3>
            <p>{desc}</p>
          </TimelineGlowCard>
          <div className="timeline-marker">
            <div className="timeline-marker-ping" />
          </div>
          <div className="timeline-spacer" />
        </>
      ) : (
        <>
          <div className="timeline-spacer" />
          <div className="timeline-marker">
            <div className="timeline-marker-ping" />
          </div>
          <TimelineGlowCard className="timeline-content">
            <h3>{date}</h3>
            <p>{desc}</p>
          </TimelineGlowCard>
        </>
      )}
    </motion.div>
  );
}

export default function TimelineSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="galeri" className="section section-timeline">
      <div className="container" ref={ref}>
        {/* Section title */}
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="pixel-bracket">[</span> Timeline Event{' '}
          <span className="pixel-bracket">]</span>
        </motion.h2>

        {/* Timeline body */}
        <div className="timeline-body">
          {/* Garis tengah vertikal — animated growing */}
          <motion.div
            className="timeline-line"
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />

          {/* Timeline items */}
          {timelineData.map((item, i) => (
            <TimelineItem key={i} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}