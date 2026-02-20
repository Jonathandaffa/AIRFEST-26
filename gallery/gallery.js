/**
 * AIRFEST 26 — Halaman Galeri: Navbar scroll, Footer scroll 2-langkah, interaksi feed & modal
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

  // ----- Interaksi Galeri: buka modal, like, komentar (dengan gambar) -----
  const grid = document.getElementById('gallery-grid');
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');
  const modalCaptionEl = document.getElementById('gallery-modal-caption');
  const modalDateEl = document.getElementById('gallery-modal-date');
  const likeBtn = document.getElementById('gallery-like-btn');
  const likeCountEl = document.getElementById('gallery-like-count');
  const commentsContainer = document.getElementById('gallery-comments');
  const commentForm = document.getElementById('gallery-comment-form');
  const commentText = document.getElementById('gallery-comment-text');
  const commentFile = document.getElementById('gallery-comment-file');

  const state = {
    currentId: null,
    posts: {}
  };

  function initPostsFromDOM() {
    if (!grid) return;
    const items = grid.querySelectorAll('.gallery-item');
    items.forEach(function (item) {
      const id = item.getAttribute('data-id');
      const src = item.querySelector('.gallery-img')?.getAttribute('src') || '';
      const caption = item.getAttribute('data-caption') || '';
      const likes = Number(item.getAttribute('data-likes')) || 0;
      const date = item.getAttribute('data-date') || '';
      state.posts[id] = state.posts[id] || {
        id,
        src,
        caption,
        date,
        likes,
        liked: false,
        comments: []
      };
    });
  }

  function openModalForId(id) {
    const post = state.posts[id];
    if (!post) return;
    state.currentId = id;

    modalImg.src = post.src;
    modalImg.alt = post.caption || 'Foto galeri';
    modalCaptionEl.textContent = post.caption || '';
    modalDateEl.textContent = post.date || '';
    likeCountEl.textContent = String(post.likes);
    likeBtn.setAttribute('aria-pressed', post.liked ? 'true' : 'false');

    renderComments();

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    state.currentId = null;
  }

  function renderComments() {
    if (!commentsContainer) return;
    commentsContainer.innerHTML = '';
    const post = state.posts[state.currentId];
    if (!post) return;

    post.comments.forEach(function (c) {
      const el = document.createElement('div');
      el.className = 'gallery-comment';
      el.innerHTML = `
        <div class=\"gallery-comment-header\">
          <span class=\"gallery-comment-name\">${c.name}</span>
          <span class=\"gallery-comment-time\">${c.time}</span>
        </div>
        <div class=\"gallery-comment-text\"></div>
      `;
      el.querySelector('.gallery-comment-text').textContent = c.text;
      if (c.imageSrc) {
        const img = document.createElement('img');
        img.className = 'gallery-comment-image';
        img.src = c.imageSrc;
        img.alt = 'Gambar komentar';
        el.appendChild(img);
      }
      commentsContainer.appendChild(el);
    });
  }

  if (grid && modal) {
    initPostsFromDOM();

    grid.addEventListener('click', function (e) {
      const item = e.target.closest('.gallery-item');
      if (!item) return;
      const id = item.getAttribute('data-id');
      if (!id) return;
      openModalForId(id);
    });
  }

  modal?.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-modal-close')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  likeBtn?.addEventListener('click', function () {
    const id = state.currentId;
    if (!id) return;
    const post = state.posts[id];
    if (!post) return;
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    if (post.likes < 0) post.likes = 0;
    likeBtn.setAttribute('aria-pressed', post.liked ? 'true' : 'false');
    likeCountEl.textContent = String(post.likes);
  });

  commentForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const id = state.currentId;
    if (!id) return;
    const post = state.posts[id];
    if (!post) return;

    const text = (commentText.value || '').trim();
    const file = commentFile.files && commentFile.files[0];

    if (!text && !file) return;

    function addComment(imageSrc) {
      const now = new Date();
      post.comments.push({
        name: 'Guest',
        time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        text: text || '',
        imageSrc: imageSrc || null
      });
      renderComments();
      commentText.value = '';
      commentFile.value = '';
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = function (ev) {
        addComment(ev.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      addComment(null);
    }
  });
})(); 