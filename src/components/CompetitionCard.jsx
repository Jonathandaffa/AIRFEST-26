/* ============================================
   CompetitionCard — Box Lomba Individual
   
   BENTUK BOX:
   - Persegi panjang vertikal (portrait) KOTAK LURUS
   - TANPA clip-path / tanpa potongan miring
   - Border tebal HANYA di atas dan bawah (cyan)
   - Background: slate/dark grey (#2d3748)
   
   ISI BOX:
   - PNG image poster (A4 aspect ratio)
   - Footer: Nama lomba (font display, besar)
   -         Jenjang (font display, kecil)
   -         Status box kecil (ONLINE/OFFLINE)
   
   HOVER EFFECT:
   - Box mengambang naik (translateY)
   - Glow border berkilau shimmer
   - Reveal 2 tombol di bawah: GUIDE BOOK & REGISTER
   - Tombol punya efek float + glow + glitch text
   
   UKURAN: Semua card uniform, dikunci fixed
   ============================================ */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CompetitionCard.css';

export default function CompetitionCard({
  name,
  level,
  status,
  image,
  guideBook,
  registerUrl,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  /* Warna status berdasarkan ONLINE / OFFLINE */
  const isOnline = status === 'ONLINE';
  const statusColor = isOnline ? 'var(--neon-cyan)' : 'var(--neon-magenta)';

  return (
    <div
      className="comp-card-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* === BOX UTAMA === */}
      <motion.div
        className="comp-card"
        animate={{
          y: isHovered ? -14 : 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Scanline overlay cyberpunk */}
        <div className={`comp-card-scanline ${isHovered ? 'active' : ''}`} />

        {/* Border atas tebal */}
        <div className={`comp-card-border-top ${isHovered ? 'glow' : ''}`} />

        {/* Body — KOTAK LURUS, tanpa clip-path */}
        <div className="comp-card-body">
          {/* Poster image — A4 aspect ratio */}
          <div className="comp-card-poster">
            {!imgError ? (
              <img
                src={image}
                alt={`Poster ${name}`}
                className="comp-card-poster-img"
                draggable="false"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="comp-card-poster-placeholder">
                A4 png image
                <br />
                aspect ratio
              </div>
            )}
          </div>

          {/* Footer: nama + jenjang | status box */}
          <div className="comp-card-footer">
            {/* Kiri: nama lomba + jenjang */}
            <div className="comp-card-info">
              <h3 className="comp-card-name">{name}</h3>
              <p className="comp-card-level">{level}</p>
            </div>

            {/* Kanan: status box kecil */}
            <div
              className="comp-card-status-box"
              style={{
                borderColor: statusColor,
                color: statusColor,
              }}
            >
              <span className="comp-card-status-label">STATUS</span>
              <span className="comp-card-status-value">{status}</span>
            </div>
          </div>
        </div>

        {/* Border bawah tebal */}
        <div className={`comp-card-border-bottom ${isHovered ? 'glow' : ''}`} />
      </motion.div>

      {/* === TOMBOL REVEAL === */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="comp-card-buttons"
            initial={{ opacity: 0, y: -20, scaleY: 0.5 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -15, scaleY: 0.5 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 22,
              delay: 0.05,
            }}
          >
            {/* GUIDE BOOK */}
            <motion.a
              href={guideBook}
              target="_blank"
              rel="noopener noreferrer"
              className="comp-card-btn comp-card-btn-guide"
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
            >
              <span className="comp-card-btn-text" data-text="GUIDE BOOK">
                GUIDE BOOK
              </span>
            </motion.a>

            {/* REGISTER */}
            <motion.a
              href={registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="comp-card-btn comp-card-btn-register"
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
            >
              <span className="comp-card-btn-text" data-text="REGISTER">
                REGISTER
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}