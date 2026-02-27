/* ============================================
   GalleryPage — Konversi dari HTML + CSS + JS
   Menampilkan feed grid + modal detail (like, komentar)
   ============================================ */
import React, { useEffect, useRef, useState } from 'react';
import './GalleryPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StarField from '../components/StarField';
import GridOverlay from '../components/GridOverlay';

const initialPosts = [
  { id: '1', src: '/assets/gallery-1.png', caption: 'Website AIRFEST 26 resmi diluncurkan!', date: '2025-03-07', likes: 42 },
  { id: '2', src: '/assets/gallery-2.png', caption: 'Suasana technical meeting AIRFEST 26.', date: '2025-03-15', likes: 30 },
  { id: '3', src: '/assets/gallery-3.png', caption: 'Highlight lomba dan performance.', date: '2025-03-20', likes: 55 },
  { id: '4', src: '/assets/gallery-4.png', caption: 'Behind the scene panitia AIRFEST 26.', date: '2025-03-10', likes: 18 },
  { id: '5', src: '/assets/gallery-5.png', caption: 'Maskot AIRFEST 26 bersama peserta.', date: '2025-03-22', likes: 64 },
  { id: '6', src: '/assets/gallery-6.png', caption: 'Sesi penutupan dan awarding.', date: '2025-03-25', likes: 27 }
];

export default function GalleryPage() {
  const [posts, setPosts] = useState(() => {
    const map = {};
    initialPosts.forEach(p => map[p.id] = { ...p, liked: false, comments: [] });
    return map;
  });

  const [currentId, setCurrentId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const commentTextRef = useRef(null);
  const commentFileRef = useRef(null);
  const footerRef = useRef(null);
  const footerFirstStepRef = useRef(false);

  // Prevent right-click
  useEffect(() => {
    const onContext = (e) => e.preventDefault();
    document.addEventListener('contextmenu', onContext);
    return () => document.removeEventListener('contextmenu', onContext);
  }, []);

  // Prevent zoom (Ctrl/Cmd + wheel / +/-)
  useEffect(() => {
    const onWheel = (e) => { if (e.ctrlKey || e.metaKey) e.preventDefault(); };
    const onKey = (e) => { if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) e.preventDefault(); };
    document.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('wheel', onWheel);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // Footer 2-step scroll
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
    const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    const scrollToHideFooter = () => window.scrollTo({ top: footer.offsetTop - window.innerHeight + 20, behavior: 'smooth' });

    const onScroll = () => { if (window.scrollY < footer.offsetTop - window.innerHeight - 100) footerFirstStepRef.current = false; };
    const onWheel = (e) => {
      if (e.deltaY > 0) {
        if (isInApproachZone()) {
          if (!footerFirstStepRef.current) { e.preventDefault(); footerFirstStepRef.current = true; }
          else { e.preventDefault(); scrollToBottom(); footerFirstStepRef.current = false; }
        }
      } else {
        if (isFullyInFooter()) { e.preventDefault(); scrollToHideFooter(); footerFirstStepRef.current = false; }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('wheel', onWheel); };
  }, []);

  function openModal(id) {
    setCurrentId(id);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setCurrentId(null);
  }

  function toggleLike() {
    if (!currentId) return;
    setPosts(prev => {
      const copy = { ...prev };
      const p = { ...copy[currentId] };
      p.liked = !p.liked;
      p.likes = Math.max(0, p.likes + (p.liked ? 1 : -1));
      copy[currentId] = p;
      return copy;
    });
  }

  function submitComment(e) {
    e.preventDefault();
    if (!currentId) return;
    const text = commentTextRef.current?.value?.trim() || '';
    const file = commentFileRef.current?.files?.[0];
    if (!text && !file) return;

    function addComment(imageSrc) {
      setPosts(prev => {
        const copy = { ...prev };
        const p = { ...copy[currentId] };
        p.comments = p.comments.concat([{ name: 'Guest', time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), text, imageSrc }]);
        copy[currentId] = p;
        return copy;
      });
      if (commentTextRef.current) commentTextRef.current.value = '';
      if (commentFileRef.current) commentFileRef.current.value = '';
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => addComment(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      addComment(null);
    }
  }

  const currentPost = currentId ? posts[currentId] : null;

  return (
    <div className="gallery-page">
      <Navbar />
      <StarField />
      <GridOverlay />

      <main className="section gallery-section">
        <div className="container">
          <h1 className="section-title gallery-title"><span className="pixel-bracket">[</span> Galeri AIRFEST 26 <span className="pixel-bracket">]</span></h1>

          <div className="gallery-grid" aria-live="polite">
            {Object.values(posts).map((p) => (
              <button key={p.id} type="button" className="gallery-item" onClick={() => openModal(p.id)}>
                <img src={p.src} alt={p.caption} className="gallery-img" draggable="false" />
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      <div className={`gallery-modal ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <div className="gallery-modal-backdrop" onClick={closeModal} data-modal-close></div>
        <div className="gallery-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title">
          <button type="button" className="gallery-modal-close" onClick={closeModal} aria-label="Tutup">&times;</button>
          <div className="gallery-modal-media">
            <img src={currentPost?.src || ''} alt={currentPost?.caption || ''} className="gallery-modal-img" draggable="false" />
          </div>
          <div className="gallery-modal-side">
            <header className="gallery-modal-header">
              <div>
                <h2 className="gallery-modal-title" id="gallery-modal-title">AIRFEST 26</h2>
                <p className="gallery-modal-date">{currentPost?.date || ''}</p>
              </div>
            </header>

            <div className="gallery-modal-caption">{currentPost?.caption || ''}</div>

            <div className="gallery-modal-reactions">
              <button type="button" className="gallery-like-btn" onClick={toggleLike} aria-pressed={currentPost?.liked ? 'true' : 'false'}>
                <span className="like-icon">❤</span>
                <span className="like-label">Like</span>
              </button>
              <div className="gallery-like-count"><span id="gallery-like-count">{currentPost?.likes ?? 0}</span> likes</div>
            </div>

            <div className="gallery-comments">
              {(currentPost?.comments || []).map((c, i) => (
                <div className="gallery-comment" key={i}>
                  <div className="gallery-comment-header">
                    <span className="gallery-comment-name">{c.name}</span>
                    <span className="gallery-comment-time">{c.time}</span>
                  </div>
                  <div className="gallery-comment-text">{c.text}</div>
                  {c.imageSrc && <img className="gallery-comment-image" src={c.imageSrc} alt="Gambar komentar" />}
                </div>
              ))}
            </div>

            <form className="gallery-comment-form" onSubmit={submitComment}>
              <div className="gallery-comment-inputs">
                <textarea ref={commentTextRef} id="gallery-comment-text" rows="2" placeholder="Tulis komentar..." maxLength={300}></textarea>
                <label className="gallery-comment-file-label">
                  <input ref={commentFileRef} type="file" id="gallery-comment-file" accept="image/png,image/jpeg,image/gif" hidden />
                  <span className="gallery-comment-file-btn">+ Img</span>
                </label>
              </div>
              <button type="submit" className="gallery-comment-submit">Kirim</button>
            </form>
          </div>
        </div>
      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
