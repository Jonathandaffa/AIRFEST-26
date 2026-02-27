/* ============================================
   Hero Section — 3 kolom maskot PNG
   + Flyover text (hilang saat scroll)
   + Rolling strip "AIRFEST 26"
   ============================================ */
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import RollingStrip from './RollingStrip';
import GlitchText from './GlitchText';
import TextScatter from './TextScatter';
import './Hero.css';

export default function Hero() {
  /* Parallax: flyover text & center mascot menghilang saat scroll */
  const { scrollY } = useScroll();
  const flyoverOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const flyoverY = useTransform(scrollY, [0, 300], [0, -60]);
  const centerScale = useTransform(scrollY, [0, 400], [1, 0.85]);
  const centerOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section id="beranda" className="hero">
      {/* Tiga kolom maskot: kiri | tengah (lebih lebar) | kanan */}
      <div className="hero-mascots">
        {/* Maskot kiri */}
        <motion.div
          className="hero-mascot-col hero-mascot-left"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <img
            src="/assets/leftmascot.png"
            alt="Maskot kiri AIRFEST"
            className="hero-mascot-img hero-float"
            loading="eager"
            draggable="false"
          />
        </motion.div>

        {/* Maskot tengah — menghilang saat scroll */}
        <motion.div
          className="hero-mascot-col hero-mascot-center"
          style={{ scale: centerScale, opacity: centerOpacity }}
        >
          <motion.div
            className="hero-center-wrap"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <img
              src="/assets/mascothero.png"
              alt="Maskot utama AIRFEST"
              className="hero-mascot-img hero-mascot-hero hero-float"
              loading="eager"
              draggable="false"
            />
          </motion.div>
        </motion.div>

        {/* Maskot kanan */}
        <motion.div
          className="hero-mascot-col hero-mascot-right"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <img
            src="/assets/rightmascot.png"
            alt="Maskot kanan AIRFEST"
            className="hero-mascot-img hero-float"
            loading="eager"
            draggable="false"
          />
        </motion.div>
      </div>

      {/* Flyover text — menindih bawah kolom maskot, hilang saat scroll */}
      <motion.div
        className="hero-flyover"
        style={{ opacity: flyoverOpacity, y: flyoverY }}
      >
        <h1 className="hero-title pixel-text">
          <TextScatter text="BUILDING YOUNG MINDS" className="hero-title-scatter" />
          <br />
          <TextScatter text="FOR FUTURE EXCELLENCE" className="hero-title-scatter" />
        </h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <GlitchText text="Get Ready!" />
        </motion.p>
      </motion.div>

      {/* Rolling strip */}
      <RollingStrip />
    </section>
  );
}