/* ============================================
   Information Page — Konversi dari HTML + CSS + JS
   Menampilkan artikel info dalam grid/list view
   Fitur: Toggle Grid/List, Sort, Search, 
   Navbar scroll behavior, Footer 2-step scroll
   ============================================ */
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StarField from '../components/StarField';
import GridOverlay from '../components/GridOverlay';
import './InformationPage.css';

const infoCardsData = [
  {
    id: 1,
    date: '20 Februari 2026',
    dateSort: '2026-02-20',
    priority: 2,
    banner: '/assets/info-banner-1.png',
    logo: '/assets/info-logo-develop.png',
    logoLabel: 'DEVELOPER',
    title: 'Peluncuran perdana website AIRFEST 26!',
    subtitle: 'Akses dalam satu pintu untuk informasi terbaru AIRFEST 26'
  },
  {
    id: 2,
    date: '1 Apr 2025',
    dateSort: '2025-04-01',
    priority: 1,
    banner: '/assets/info-banner-2.png',
    logo: '/assets/info-logo-develop.png',
    logoLabel: 'CREW AIRFEST',
    title: 'Judul Artikel',
    subtitle: 'subjudul artikel'
  },
  {
    id: 3,
    date: '15 Apr 2025',
    dateSort: '2025-04-15',
    priority: 0,
    banner: '/assets/info-banner-3.png',
    logo: '/assets/info-logo-develop.png',
    logoLabel: 'DEVELOP',
    title: 'Judul Artikel Lain',
    subtitle: 'subjudul'
  },
];

export default function InformationPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortMode, setSortMode] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCard, setActiveCard] = useState(null);
  const footerRef = useRef(null);
  const footerFirstStepRef = useRef(false);

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

  // Parse date value untuk sorting
  const parseDateValue = (card) => {
    const t = Date.parse(card.dateSort);
    return Number.isFinite(t) ? t : 0;
  };

  // Get card text untuk search
  const getCardText = (card) => {
    return (card.dateSort + ' ' + card.title + ' ' + card.subtitle).toLowerCase();
  };

  // Filter dan sort cards
  const filteredCards = infoCardsData
    .filter(card => !searchTerm || getCardText(card).includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortMode === 'oldest') return parseDateValue(a) - parseDateValue(b);
      if (sortMode === 'important') return b.priority - a.priority;
      if (sortMode === 'normal') return a.priority - b.priority;
      // newest (default)
      return parseDateValue(b) - parseDateValue(a);
    });

  // Footer 2-step scroll behavior
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const APPROACH_MARGIN = 120;
    const IN_FOOTER_MARGIN = 80;

    const isInApproachZone = () => {
      const top = footer.getBoundingClientRect().top;
      return top <= window.innerHeight + APPROACH_MARGIN && top > 0;
    };

    const isFullyInFooter = () => {
      const rect = footer.getBoundingClientRect();
      return rect.top < window.innerHeight - IN_FOOTER_MARGIN;
    };

    const scrollToBottom = () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const scrollToHideFooter = () => {
      window.scrollTo({
        top: footer.offsetTop - window.innerHeight + 20,
        behavior: 'smooth'
      });
    };

    const handleScroll = () => {
      if (window.scrollY < footer.offsetTop - window.innerHeight - 100) {
        footerFirstStepRef.current = false;
      }
    };

    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        if (isInApproachZone()) {
          if (!footerFirstStepRef.current) {
            e.preventDefault();
            footerFirstStepRef.current = true;
          } else {
            e.preventDefault();
            scrollToBottom();
            footerFirstStepRef.current = false;
          }
        }
      } else {
        if (isFullyInFooter()) {
          e.preventDefault();
          scrollToHideFooter();
          footerFirstStepRef.current = false;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="information-page">
      <Navbar />
      <StarField />
      <GridOverlay />

      <main className="info-page-main">
        <section className="section info-section">
          <div className="container">
            <h1 className="section-title info-page-title">
              <span className="pixel-bracket">[</span> Informasi <span className="pixel-bracket">]</span>
            </h1>

            {/* Controls: Grid/List + Sort + Search */}
            <div className="info-controls" role="group" aria-label="Kontrol Informasi">
              <div className="info-controls-left" aria-label="Tata letak">
                <button
                  type="button"
                  className={`info-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </button>
                <button
                  type="button"
                  className={`info-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  List
                </button>
              </div>
              <div className="info-controls-right">
                <label className="info-sort" htmlFor="info-sort">
                  <span className="info-controls-label">Sort by:</span>
                  <select
                    id="info-sort"
                    className="info-controls-select"
                    value={sortMode}
                    onChange={(e) => setSortMode(e.target.value)}
                  >
                    <option value="newest">Terbaru → Terlama</option>
                    <option value="oldest">Terlama → Terbaru</option>
                    <option value="important">Terpenting → Biasa</option>
                    <option value="normal">Biasa → Terpenting</option>
                  </select>
                </label>
                <label className="info-search" htmlFor="info-search">
                  <span className="sr-only">Search</span>
                  <input
                    id="info-search"
                    className="info-controls-input"
                    type="search"
                    placeholder="Search..."
                    autoComplete="off"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </label>
              </div>
            </div>

            {/* Info Cards Container */}
            <div
              className={`info-cards ${viewMode === 'list' ? 'view-list' : ''}`}
              aria-live="polite"
            >
              {filteredCards.map((card) => (
                <motion.a
                  key={card.id}
                  href="#"
                  className={`info-hud-card ${activeCard === card.id ? 'is-active' : ''}`}
                  onClick={(e) => e.preventDefault()}
                  onMouseEnter={() => setActiveCard(card.id)}
                  onFocus={() => setActiveCard(card.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* HUD Border */}
                  <div className="info-hud-border-wrap">
                    <div className="info-hud-border-flow" aria-hidden="true"></div>
                  </div>

                  {/* HUD Inner Content */}
                  <div className="info-hud-inner">
                    {/* Banner Image */}
                    <div className="info-card-banner">
                      <img
                        src={card.banner}
                        alt=""
                        className="info-card-banner-img"
                        draggable="false"
                      />
                    </div>

                    {/* Card Footer (Logo + Text + Indicator) */}
                    <div className="info-card-footer">
                      <div className="info-card-logo-box">
                        <img
                          src={card.logo}
                          alt=""
                          className="info-card-logo"
                          draggable="false"
                        />
                        <span className="info-card-logo-label">{card.logoLabel}</span>
                      </div>
                      <div className="info-card-text">
                        <p className="info-card-date">{card.date}</p>
                        <h2 className="info-card-title">{card.title}</h2>
                        <p className="info-card-subtitle">{card.subtitle}</p>
                      </div>
                      <div className="info-card-indicator" aria-hidden="true"></div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer with ref for 2-step scroll */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
