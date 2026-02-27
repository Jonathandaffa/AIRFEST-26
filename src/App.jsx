/* ============================================
   App.js — Root Component
   Menyusun semua section sesuai urutan asli
   ============================================ */
import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InformationPage from './pages/InformationPage';
import GalleryPage from './pages/GalleryPage';
import RegistrationPage from './pages/RegistrationPage';

/* --- Loading Screen --- */
import LoadingScreen from './components/LoadingScreen';

/* --- Background Layers --- */
import StarField from './components/StarField';
import GridOverlay from './components/GridOverlay';
import NeonCursor from './components/NeonCursor';
import ParticleTrail from './components/ParticleTrail';

/* --- Sections --- */
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import PhilosophySection from './components/PhilosophySection';
import MascotIntroSection from './components/MascotIntroSection';
import TimelineSection from './components/TimelineSection';
import CountdownSection from './components/CountdownSection';
import Footer from './components/Footer';

/* buat ini anu apaan sih oh iya ini komponen buat ke link tujuan setiap text button di navbar, jadi kalau diklik bakal kr halaman tujuan. */

function App() {
  // Prevent right-click
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  // Prevent Ctrl/Cmd + Mouse Wheel Zoom
  // Prevent Ctrl/Cmd + +/- Zoom
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
        e.preventDefault();
      }
    };
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function Home() {
    return (
      <>
        <LoadingScreen />
        <div className="App">
          <StarField />
          <GridOverlay />
          <Navbar />
          <Hero />
          <AboutSection />
          <PhilosophySection />
          <MascotIntroSection />
          <TimelineSection />
          <CountdownSection />
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <BrowserRouter>
        <NeonCursor />
        <ParticleTrail />
        <Routes>
          <Route path="/information" element={<InformationPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;