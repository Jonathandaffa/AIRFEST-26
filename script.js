// Prevent Ctrl/Cmd + Mouse Wheel Zoom
document.addEventListener('wheel', function(e) {
  if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
  }
}, { passive: false });

// Prevent Ctrl/Cmd + +/- Zoom
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
      e.preventDefault();
  }
});


/**
 * AIRFEST 26 — Navbar scroll, Mascot drag, Countdown
 */

(function () {
  'use strict';

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

  // ----- Filosofi Logo: efek logo zoom-in mengikuti arah mouse (hanya area logo) -----
  const philosophyLogo = document.getElementById('philosophy-logo');
  const philosophyLogoInner = philosophyLogo
    ? philosophyLogo.querySelector('.philosophy-logo-inner')
    : null;

  if (philosophyLogo && philosophyLogoInner) {
    const baseScale = 1.02;
    const hoverScale = 1.08;
    const maxTranslate = 10; // px

    function resetLogoTransform() {
      philosophyLogoInner.style.transform =
        `scale(${baseScale}) translate3d(0, 0, 0)`;
    }

    function handleLogoMove(event) {
      const rect = philosophyLogo.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

      const translateX = relativeX * maxTranslate;
      const translateY = -relativeY * maxTranslate; // sedikit berlawanan arah untuk efek depth

      philosophyLogoInner.style.transform =
        `scale(${hoverScale}) translate3d(${translateX}px, ${translateY}px, 0)`;
    }

    resetLogoTransform();
    philosophyLogo.addEventListener('mousemove', handleLogoMove);
    philosophyLogo.addEventListener('mouseleave', resetLogoTransform);
  }

  // ----- Mascot section: efek zoom-in ringan + follow mouse (hanya area mascothero.png) -----
  const mascotHeroPanel = document.getElementById('mascot-hero-panel');
  const mascotHeroInner = mascotHeroPanel
    ? mascotHeroPanel.querySelector('.mascot-hero-inner')
    : null;

  if (mascotHeroPanel && mascotHeroInner) {
    const baseScaleM = 1.02;
    const hoverScaleM = 1.08;
    const maxTranslateM = 10;

    function resetMascotTransform() {
      mascotHeroInner.style.transform =
        `scale(${baseScaleM}) translate3d(0, 0, 0)`;
    }

    function handleMascotMove(event) {
      const rect = mascotHeroPanel.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

      const translateX = relativeX * maxTranslateM;
      const translateY = -relativeY * maxTranslateM;

      mascotHeroInner.style.transform =
        `scale(${hoverScaleM}) translate3d(${translateX}px, ${translateY}px, 0)`;
    }

    resetMascotTransform();
    mascotHeroPanel.addEventListener('mousemove', handleMascotMove);
    mascotHeroPanel.addEventListener('mouseleave', resetMascotTransform);
  }

  // ----- Countdown ke tanggal acara (atur di sini) -----
  // Contoh: 1 Juni 2026 09:00 WIB
  const countdownTarget = new Date('2026-05-08T13:00:00+07:00');
  const countdownDateEl = document.getElementById('countdown-date');
  if (countdownDateEl) {
    countdownDateEl.textContent = countdownTarget.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date();
    const diff = countdownTarget - now;

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (daysEl) daysEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

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
