/**
 * AIRFEST 26 — Halaman Informasi: Navbar scroll + Footer scroll 2 langkah
 */

// Prevent Ctrl/Cmd + Mouse Wheel Zoom
document.addEventListener('wheel', function (e) {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
  }
}, { passive: false });

// Prevent Ctrl/Cmd + +/- Zoom
document.addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
    e.preventDefault();
  }
});

(function () {
  'use strict';

  // ----- Toggle Grid / List -----
  const infoCards = document.getElementById('info-cards');
  const viewBtns = document.querySelectorAll('.info-view-btn');
  if (infoCards && viewBtns.length) {
    viewBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var view = this.getAttribute('data-view');
        viewBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        if (view === 'list') {
          infoCards.classList.add('view-list');
        } else {
          infoCards.classList.remove('view-list');
        }
      });
    });
  }

  // ----- Sort + Search + indikator aktif (khusus list) -----
  const sortSelect = document.getElementById('info-sort');
  const searchInput = document.getElementById('info-search');

  function parseDateValue(el) {
    const raw = el.getAttribute('data-date') || '';
    const t = Date.parse(raw);
    return Number.isFinite(t) ? t : 0;
  }

  function parsePriorityValue(el) {
    const raw = el.getAttribute('data-priority');
    const n = raw == null ? 0 : Number(raw);
    return Number.isFinite(n) ? n : 0;
  }

  function getCardText(el) {
    const title = el.querySelector('.info-card-title')?.textContent || '';
    const sub = el.querySelector('.info-card-subtitle')?.textContent || '';
    const date = el.querySelector('.info-card-date')?.textContent || '';
    return (date + ' ' + title + ' ' + sub).toLowerCase();
  }

  function applySearchAndSort() {
    if (!infoCards) return;
    const cards = Array.from(infoCards.querySelectorAll('[data-info-card]'));
    const term = (searchInput?.value || '').trim().toLowerCase();
    const sortMode = sortSelect?.value || 'newest';

    // Filter
    cards.forEach(function (card) {
      const ok = !term || getCardText(card).includes(term);
      card.style.display = ok ? '' : 'none';
    });

    // Sort (re-append)
    const sorted = cards.slice().sort(function (a, b) {
      if (sortMode === 'oldest') return parseDateValue(a) - parseDateValue(b);
      if (sortMode === 'important') return parsePriorityValue(b) - parsePriorityValue(a);
      if (sortMode === 'normal') return parsePriorityValue(a) - parsePriorityValue(b);
      // newest default
      return parseDateValue(b) - parseDateValue(a);
    });

    sorted.forEach(function (card) {
      infoCards.appendChild(card);
    });
  }

  sortSelect?.addEventListener('change', applySearchAndSort);
  searchInput?.addEventListener('input', applySearchAndSort);
  applySearchAndSort();

  // Indikator: tandai card aktif saat hover/focus
  if (infoCards) {
    infoCards.addEventListener('mouseover', function (e) {
      const card = e.target && e.target.closest ? e.target.closest('[data-info-card]') : null;
      if (!card || !infoCards.contains(card)) return;
      infoCards.querySelectorAll('.is-active').forEach(function (el) { el.classList.remove('is-active'); });
      card.classList.add('is-active');
    });
    infoCards.addEventListener('focusin', function (e) {
      const card = e.target && e.target.closest ? e.target.closest('[data-info-card]') : null;
      if (!card || !infoCards.contains(card)) return;
      infoCards.querySelectorAll('.is-active').forEach(function (el) { el.classList.remove('is-active'); });
      card.classList.add('is-active');
    });
  }

  // ----- Navbar: hilang saat scroll down, muncul saat scroll up -----
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNavbar() {
    const scrollY = window.scrollY;
    if (scrollY <= 60) {
      navbar.classList.remove('hidden');
      navbar.classList.add('visible');
    } else if (scrollY > lastScrollY) {
      navbar.classList.add('hidden');
      navbar.classList.remove('visible');
    } else {
      navbar.classList.remove('hidden');
      navbar.classList.add('visible');
    }
    lastScrollY = scrollY;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateNavbar();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateNavbar();

  // ----- Footer: scroll 2 langkah — langkah 1 stack, langkah 2 tampil penuh; scroll up = tutup footer -----
  const footer = document.querySelector('.footer');
  let footerFirstStepConsumed = false;
  const APPROACH_MARGIN = 120;
  const IN_FOOTER_MARGIN = 80;

  if (footer) {
    function isInApproachZone() {
      const top = footer.getBoundingClientRect().top;
      return top <= window.innerHeight + APPROACH_MARGIN && top > 0;
    }

    function isFullyInFooter() {
      const rect = footer.getBoundingClientRect();
      return rect.top < window.innerHeight - IN_FOOTER_MARGIN;
    }

    function scrollToBottom() {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }

    function scrollToHideFooter() {
      window.scrollTo({
        top: footer.offsetTop - window.innerHeight + 20,
        behavior: 'smooth'
      });
    }

    window.addEventListener('scroll', function () {
      if (window.scrollY < footer.offsetTop - window.innerHeight - 100) {
        footerFirstStepConsumed = false;
      }
    }, { passive: true });

    window.addEventListener('wheel', function (e) {
      if (!footer) return;

      if (e.deltaY > 0) {
        if (isInApproachZone()) {
          if (!footerFirstStepConsumed) {
            e.preventDefault();
            footerFirstStepConsumed = true;
          } else {
            e.preventDefault();
            scrollToBottom();
            footerFirstStepConsumed = false;
          }
        }
      } else {
        if (isFullyInFooter()) {
          e.preventDefault();
          scrollToHideFooter();
          footerFirstStepConsumed = false;
        }
      }
    }, { passive: false });
  }
})();
