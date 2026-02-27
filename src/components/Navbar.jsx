/* ============================================
   Navbar — Floating navigation bar
   Hide on scroll down, show on scroll up
   Logo AIRFEST + nav links + button pendaftaran
   Hamburger menu untuk mobile
   ============================================ */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import useScrollDirection from '../hooks/useScrollDirection';
import GlitchText from './GlitchText';
import MagneticButton from './MagneticButton';
import './Navbar.css';

export default function Navbar() {
  const { direction, scrollY } = useScrollDirection();
  const isVisible = direction === 'up' || scrollY <= 60;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="navbar floating"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="nav-inner">
            {/* Logo: AIRFEST 26 */}
            <a href="#beranda" className="logo">
              <GlitchText text="AIRFEST" className="logo-pixel" />
              <span className="logo-year">26</span>
            </a>

            {/* Hamburger button — hanya untuk mobile */}
            <button
              className="nav-hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            {/* Navigation links — desktop */}
            <nav className="nav-links">
              <NavLink to="/" className={({isActive}) => isActive ? 'nav-active' : ''}>Beranda</NavLink>
              <NavLink to="/information" className={({isActive}) => isActive ? 'nav-active' : ''}>Informasi</NavLink>
              <NavLink to="/gallery" className={({isActive}) => isActive ? 'nav-active' : ''}>Galeri</NavLink>

              {/* Tombol Pendaftaran dengan efek magnet */}
              <NavLink to="/registration" className={({isActive}) => isActive ? 'nav-active nav-link-button' : 'nav-link-button'}>
                <MagneticButton className="btn-pendaftaran">
                  Pendaftaran
                </MagneticButton>
              </NavLink>
            </nav>

            {/* Mobile menu dropdown */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="nav-mobile-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink 
                    to="/" 
                    className={({isActive}) => isActive ? 'nav-mobile-link nav-active' : 'nav-mobile-link'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Beranda
                  </NavLink>
                  <NavLink 
                    to="/information" 
                    className={({isActive}) => isActive ? 'nav-mobile-link nav-active' : 'nav-mobile-link'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Informasi
                  </NavLink>
                  <NavLink 
                    to="/gallery" 
                    className={({isActive}) => isActive ? 'nav-mobile-link nav-active' : 'nav-mobile-link'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Galeri
                  </NavLink>
                  <NavLink 
                    to="/registration" 
                    className={({isActive}) => isActive ? 'nav-mobile-link nav-active nav-mobile-registration' : 'nav-mobile-link nav-mobile-registration'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pendaftaran
                  </NavLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}